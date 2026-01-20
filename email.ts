
import { Resend } from "resend";
const resend = new Resend(process.env?.RESEND_API_KEY);

interface verficationEmailProps {
  email: string;
  token: string;
}

export async function sendVerficationEmail({
  email,
  token,
}: verficationEmailProps) {
  if (!process.env?.NEXTAUTH_URL) throw new Error("NextAuth_URL  not set");
  const verifyLink = `${process.env?.NEXTAUTH_URL}/verify_email?token=${token}`;
  try {
    const result = await resend.emails.send({
      from: "ToDoList  <no-reply@resend.dev>",
      to: email,
      subject: "verify you email",
      html: `<h1> Verfiy your email </h2> <p>Click the link below to verify your email address:</p>
    <a href="${verifyLink}" style="display:inline-block;padding:10px 20px;background:#0070f3;color:white;text-decoration:none;border-radius:5px;"> veify Email</a> <p>This link expires in 1 hour.</p>

    
    `,
    });
    
  } catch (err) {
    console.error('Failed to send verfication email',err,);
  }
}
