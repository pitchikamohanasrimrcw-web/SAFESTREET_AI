import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  organization: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

const RECIPIENT = "surakshavision123@gmail.com";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); }
        catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }

        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
        }
        const { name, email, organization, message } = parsed.data;

        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
        const smtpPort = Number(process.env.SMTP_PORT || 465);

        const submission = {
          to: RECIPIENT,
          from: email,
          name,
          organization,
          message,
          receivedAt: new Date().toISOString(),
        };

        if (smtpUser && smtpPass) {
          try {
            const nodemailer = await import("nodemailer");
            const transporter = nodemailer.default.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: { user: smtpUser, pass: smtpPass },
            });
            await transporter.sendMail({
              from: `"SafeStreet AI" <${smtpUser}>`,
              to: RECIPIENT,
              replyTo: email,
              subject: `New SafeStreet AI inquiry — ${name}${organization ? ` (${organization})` : ""}`,
              text:
                `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "—"}\n\n${message}`,
              html: `
                <div style="font-family:Inter,Arial,sans-serif;background:#0b0d1a;padding:24px;color:#e6e8f2">
                  <h2 style="color:#7ce0ff;margin:0 0 12px">New SafeStreet AI inquiry</h2>
                  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                  <p><strong>Organization:</strong> ${escapeHtml(organization || "—")}</p>
                  <hr style="border:0;border-top:1px solid #2a2d4a"/>
                  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
                </div>
              `,
            });
            return Response.json({ ok: true, delivered: true });
          } catch (err) {
            console.error("SMTP send failed:", err);
          }
        }

        console.log("[contact-submission]", JSON.stringify(submission));
        return Response.json({
          ok: true,
          delivered: false,
          note: "Submission logged. Configure SMTP_USER / SMTP_PASS to enable email delivery.",
        });
      },
    },
  },
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
