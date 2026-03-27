/**
 * submit-contact — Netlify Function
 *
 * Recibe una suscripción de email desde el formulario "Avísame" (coming soon).
 * Flujo:
 *   1. Validación de honeypot (anti-bot)
 *   2. Validación de campos requeridos
 *   3. Añadir/actualizar contacto en Resend Audience (idempotente — sin duplicados)
 *   4. Envío de email de notificación a Mónica vía Resend
 *   5. Envío de email de confirmación al suscriptor
 *
 * Variables de entorno requeridas (Netlify → Site configuration → Environment variables):
 *   RESEND_API_KEY       — API Key de Resend (ej. re_xxxxxxxxxxxx)
 *   RESEND_AUDIENCE_ID   — ID de la Audience en Resend (ej. 78261eea-...)
 *   CONTACT_EMAIL        — Email de destino donde recibes las notificaciones (ej. hola@monicamontufar.com)
 *   FROM_EMAIL           — Email remitente verificado en Resend (ej. noreply@monicamontufar.com)
 *                          ⚠️ El dominio debe estar verificado en el panel de Resend.
 */
import type { Config } from '@netlify/functions';
import { Resend } from 'resend';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();

    // ── Honeypot: campos ocultos que solo rellenan bots ───────────────────────
    if (body.bot_field || body.website) {
      return new Response(
        JSON.stringify({ success: true, message: 'Submission received' }),
        { status: 200 }
      );
    }

    // ── Validación de campos ──────────────────────────────────────────────────
    const email = (body.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email inválido' }),
        { status: 400 }
      );
    }

    // ── Variables de entorno ──────────────────────────────────────────────────
    const RESEND_API_KEY     = process.env.RESEND_API_KEY;
    const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
    const CONTACT_EMAIL      = process.env.CONTACT_EMAIL  || 'hola@monicamontufar.com';
    const FROM_EMAIL         = process.env.FROM_EMAIL     || 'noreply@monicamontufar.com';

    if (!RESEND_API_KEY) {
      console.error('[submit-contact] RESEND_API_KEY no configurada');
      return new Response(
        JSON.stringify({ success: false, error: 'Servicio de email no configurado' }),
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // ── Resend Audience: añadir/actualizar contacto (idempotente por email) ──
    if (RESEND_AUDIENCE_ID) {
      const { error: contactError } = await resend.contacts.create({
        audienceId: RESEND_AUDIENCE_ID,
        email,
        unsubscribed: false,
      });
      if (contactError) {
        console.error('[submit-contact] Error al guardar contacto en Audience:', contactError);
      }
    } else {
      console.warn('[submit-contact] RESEND_AUDIENCE_ID no configurada — contacto no guardado en Audience');
    }

    // ── Email de notificación a Mónica ────────────────────────────────────────
    await resend.emails.send({
      from: `Mónica Montúfar Web <${FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      subject: '🎉 Nueva suscripción en monicamontufar.com',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #12110e; color: #f1f5f9; padding: 40px; border-radius: 12px;">
          <h1 style="color: #e6b319; font-size: 24px; margin-bottom: 8px;">¡Nueva suscripción!</h1>
          <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px;">alguien quiere saber cuándo abres las puertas 🚀</p>
          <div style="background: #1c1a14; border: 1px solid #2d2b22; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 16px;"><strong style="color: #e6b319;">Email:</strong> ${email}</p>
          </div>
          <p style="color: #64748b; font-size: 12px;">Enviado desde monicamontufar.com · ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
        </div>
      `,
    });

    // ── Email de confirmación al suscriptor ───────────────────────────────────
    await resend.emails.send({
      from: `Mónica Montúfar <${FROM_EMAIL}>`,
      to: [email],
      subject: '¡Ya estás en la lista! Te aviso en cuanto abra 🌟',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #12110e; color: #f1f5f9; padding: 40px; border-radius: 12px;">
          <h1 style="color: #e6b319; font-size: 28px; margin-bottom: 8px;">¡Apuntado! 🎉</h1>
          <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px;">monicamontufar.com · Próximamente</p>
          <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">
            Hola,<br/><br/>
            ¡Muchas gracias por tu interés! He guardado tu correo y serás de los primeros en saber
            cuando <strong style="color: #e6b319;">monicamontufar.com</strong> abra sus puertas.
          </p>
          <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1; margin-top: 16px;">
            Mientras tanto, puedes seguirme en mis redes:
          </p>
          <div style="margin-top: 8px;">
            <a href="https://www.instagram.com/los_pensamientos_de_mon" style="color: #e6b319; font-size: 14px; margin-right: 16px;">Instagram</a>
            <a href="https://www.linkedin.com/in/m%C3%B3nica-mont%C3%BAfar-qui%C3%B1%C3%B3nez-751123146/" style="color: #e6b319; font-size: 14px;">LinkedIn</a>
          </div>
          <hr style="border: none; border-top: 1px solid #2d2b22; margin: 32px 0;"/>
          <p style="color: #475569; font-size: 12px;">
            Recibiste este email porque te suscribiste en monicamontufar.com.<br/>
            Si no fuiste tú, puedes ignorar este mensaje.
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: '¡Perfecto! Te avisamos en cuanto abramos.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('[submit-contact] Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error interno. Inténtalo de nuevo.' }),
      { status: 500 }
    );
  }
};

export const config: Config = {
  path: '/api/submit-contact',
};
