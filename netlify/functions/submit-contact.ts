import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    
    // Honeypot strict validation
    if (body.bot_field || body.website) {
      // Bot detected - reject silently mimicking success
      return new Response(JSON.stringify({ success: true, message: "Message sent" }), { status: 200 });
    }

    // Required fields validation
    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
    }

    // Process legit submission here (e.g., send via Resend / Sendgrid)
    // NOTE: This assumes Turnstile was verified either prior to this or within this pipeline.

    return new Response(JSON.stringify({ success: true, message: "Submission successful" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Internal error processing form" }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/submit-contact"
};
