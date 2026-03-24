import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { token } = await req.json();
    const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: "Token is required" }), { status: 400 });
    }

    const formData = new FormData();
    formData.append("secret", SECRET_KEY || "");
    formData.append("response", token);

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      body: formData,
      method: "POST",
    });

    const outcome = await result.json();

    if (outcome.success) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, error: outcome["error-codes"] }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/verify-turnstile"
};
