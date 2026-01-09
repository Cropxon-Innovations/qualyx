import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  inquiryType: string;
  subject: string;
  message: string;
}

const inquiryTypeLabels: Record<string, string> = {
  sales: "Sales Inquiry",
  support: "Technical Support",
  partnership: "Partnership",
  general: "General Question",
};

async function sendEmail(to: string[], subject: string, html: string, replyTo?: string, from = "QUALYX <onboarding@resend.dev>") {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      ...(replyTo && { reply_to: replyTo }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, inquiryType, subject, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !inquiryType || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const inquiryLabel = inquiryTypeLabels[inquiryType] || inquiryType;

    // Send notification to QUALYX team
    const teamEmailResponse = await sendEmail(
      ["contact@qualyx.com"],
      `[${inquiryLabel}] ${subject}`,
      `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 24px; border-radius: 12px 12px 0 0; }
            .content { background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { margin-top: 4px; color: #1e293b; }
            .message-box { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 8px; }
            .badge { display: inline-block; padding: 4px 12px; background: #f1f5f9; border-radius: 999px; font-size: 12px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 20px;">New Contact Form Submission</h1>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">From QUALYX Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Inquiry Type</div>
                <div class="value"><span class="badge">${inquiryLabel}</span></div>
              </div>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      email,
      "QUALYX Contact <onboarding@resend.dev>"
    );

    // Send confirmation to the user
    const userEmailResponse = await sendEmail(
      [email],
      "We received your message - QUALYX",
      `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 32px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
            .footer { text-align: center; padding: 24px; color: #64748b; font-size: 14px; }
            .btn { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Thank You, ${name}!</h1>
              <p style="margin: 16px 0 0; opacity: 0.9;">We've received your message</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to QUALYX. We've received your ${inquiryLabel.toLowerCase()} and our team will review it promptly.</p>
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your message within 24 hours</li>
                <li>You'll receive a personal response from a team member</li>
                <li>For urgent matters, feel free to reply to this email</li>
              </ul>
              <p>In the meantime, you might find these resources helpful:</p>
              <p style="text-align: center; margin: 24px 0;">
                <a href="https://qualyx.com/docs/getting-started" class="btn">View Documentation</a>
              </p>
            </div>
            <div class="footer">
              <p>Best regards,<br><strong>The QUALYX Team</strong></p>
              <p style="font-size: 12px; color: #94a3b8;">Autonomous QA-as-a-Service Platform</p>
            </div>
          </div>
        </body>
        </html>
      `
    );

    console.log("Team email sent:", teamEmailResponse);
    console.log("User confirmation sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
