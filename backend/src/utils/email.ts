import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

interface EmailConfig {
    hostname: string;
    port: number;
    username: string;
    password: string;
    fromEmail: string;
    fromName: string;
}

// Load email configuration from environment variables
const emailConfig: EmailConfig = {
    hostname: Deno.env.get("SMTP_HOST") || "smtp.example.com",
    port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
    username: Deno.env.get("SMTP_USERNAME") || "",
    password: Deno.env.get("SMTP_PASSWORD") || "",
    fromEmail: Deno.env.get("EMAIL_FROM") || "library@example.com",
    fromName: Deno.env.get("EMAIL_FROM_NAME") || "Library System",
};

/**
 * Send an email using SMTP
 * @param to Recipient email address
 * @param subject Email subject
 * @param body Email body (HTML content supported)
 * @returns Promise that resolves when email is sent
 */
export async function sendEmail(
    to: string,
    subject: string,
    body: string
): Promise<void> {
    try {
        const client = new SmtpClient();
        
        await client.connectTLS({
            hostname: emailConfig.hostname,
            port: emailConfig.port,
            username: emailConfig.username,
            password: emailConfig.password,
        });

        await client.send({
            from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
            to,
            subject,
            content: body,
            html: body,
        });

        await client.close();
        console.log(`Email sent to ${to} successfully`);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}