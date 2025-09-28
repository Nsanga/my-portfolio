import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // 1. Envoi du message à toi
    await resend.emails.send({
      from: "Portfolio <no-reply@ton-domaine.com>",
      to: "mercuremekinda@gmail.com",
      subject: `📩 Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message reçu via le Portfolio</h2>
        <p><b>Nom:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    // 2. Réponse automatique à l’émetteur
    await resend.emails.send({
      from: "Portfolio <no-reply@ton-domaine.com>",
      to: email,
      subject: "📬 Merci pour votre message",
      html: `
        <p>Bonjour ${name},</p>
        <p>Merci de m’avoir contacté via mon portfolio.</p>
        <p>J’ai bien reçu votre message et je reviendrai vers vous dans les plus brefs délais.</p>
        <br/>
        <p>— Emmanuel Mercure Nsanga Mekinda</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error || "Erreur lors de l’envoi du message" },
      { status: 500 }
    );
  }
}
