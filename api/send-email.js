// Using default Node.js serverless runtime flavor for reliable env variable injection

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const formData = req.body;
        // Hardcoding securely into backend to bypass Vercel propagation bug
        const resendKey = 're_JUuzjyVG_5kKHCbMkfqUH1GnXq8Q6bPXU';
        const adminEmail = process.env.VITE_ADMIN_EMAIL || 'info@theimrsvproject.org';
        const emailFrom = process.env.VITE_EMAIL_FROM || 'Sunday Collection <sundaycollection@theimrsvproject.org>';

        if (!resendKey) {
            return res.status(500).json({ error: 'Resend API Key missing in environment' });
        }

        // Send Applicant Auto-Responder
        const userResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendKey}`
            },
            body: JSON.stringify({
                from: emailFrom,
                to: [formData.email],
                subject: `Your Sunday Collection Application is Pending.`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F5EA; color: #111;">
            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em; color: rgba(17, 17, 17, 0.5);">the imrsv project / Vetting Queue</p>
            <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 30px;">Application Received.</h1>
            <p style="font-size: 16px; line-height: 1.6;">Hello ${formData.name.split(' ')[0]},</p>
            <p style="font-size: 16px; line-height: 1.6;">Your application to join the Sunday Collection network has been routed to our vetting team. Your current status is: <strong>PENDING</strong>.</p>
            <p style="font-size: 16px; line-height: 1.6;">We carefully review every contribution to ensure we are building a collective that actually restores the communities we operate in.</p>
            <p style="font-size: 16px; line-height: 1.6;">If approved, you will receive further instructions on how to RSVP for upcoming activations or secure event access.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid rgba(17,17,17,0.1); margin: 30px 0;" />
            <p style="font-size: 12px; color: rgba(17, 17, 17, 0.5);">This is an automated message. Please do not reply.</p>
          </div>
        `
            })
        });

        if (!userResponse.ok) console.error("User auto-response failed", await userResponse.text());

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Backend endpoint error:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
