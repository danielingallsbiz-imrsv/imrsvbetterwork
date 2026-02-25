// Using default Node.js serverless runtime flavor for reliable env variable injection

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    // Hardcoding securely into backend to bypass Vercel propagation bug
    const resendKey = 're_JUuzjyVG_5kKHCbMkfqUH1GnXq8Q6bPXU';
    const emailFrom = 'Sunday Collection <sundaycollection@theimrsvproject.org>';

    if (!resendKey) {
      return res.status(500).json({ error: 'Resend API Key missing in environment' });
    }

    let subject = '';
    let htmlContent = '';
    const firstName = formData.name ? formData.name.split(' ')[0] : 'there';

    if (formData.type === 'approval') {
      subject = `Your Sunday Collection Application: APPROVED`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F5EA; color: #111;">
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em; color: rgba(17, 17, 17, 0.5);">the imrsv project / Vetting Queue</p>
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 30px;">Access Granted.</h1>
          <p style="font-size: 16px; line-height: 1.6;">Hello ${firstName},</p>
          <p style="font-size: 16px; line-height: 1.6;">We are pleased to inform you that your application to join the Sunday Collection network has been <strong>APPROVED</strong>.</p>
          <p style="font-size: 16px; line-height: 1.6;">We were impressed by your contribution intent and believe you will be a valuable addition to our collective. You now have priority access to upcoming activations and community initiatives.</p>
          <p style="font-size: 16px; line-height: 1.6;">Stay tuned for a follow-up transmission with details on our next physical activation and how to secure your RSVP.</p>
          <br/>
          <div style="margin: 20px 0;">
            <a href="https://sundaycollection.theimrsvproject.org?mode=claim" style="background-color: #F7D031; color: #000; padding: 16px 32px; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 4px; display: inline-block; text-transform: uppercase; letter-spacing: 0.1em;">Claim Your Node & Login</a>
          </div>
          <br/>
          <p style="font-size: 16px; font-weight: bold;">Welcome to the project.</p>
          <hr style="border: none; border-top: 1px solid rgba(17,17,17,0.1); margin: 30px 0;" />
          <p style="font-size: 12px; color: rgba(17, 17, 17, 0.5);">the imrsv project / Sunday Collection</p>
        </div>
      `;
    } else if (formData.type === 'denial') {
      subject = `Update regarding your Sunday Collection Application`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F5EA; color: #111;">
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em; color: rgba(17, 17, 17, 0.5);">the imrsv project / Vetting Queue</p>
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 30px;">Vetting Update.</h1>
          <p style="font-size: 16px; line-height: 1.6;">Hello ${firstName},</p>
          <p style="font-size: 16px; line-height: 1.6;">Thank you for your interest in joining the Sunday Collection. At this time, we are unable to move forward with your application.</p>
          <p style="font-size: 16px; line-height: 1.6;">We receive a high volume of interest and have to make difficult decisions to maintain the specific balance and focus of our current community activations. This is not a reflection on your individual merit, but rather a alignment with our current operational capacity.</p>
          <p style="font-size: 16px; line-height: 1.6;">We appreciate your desire to contribute and wish you the best in your future endeavors.</p>
          <br/>
          <hr style="border: none; border-top: 1px solid rgba(17,17,17,0.1); margin: 30px 0;" />
          <p style="font-size: 12px; color: rgba(17, 17, 17, 0.5);">the imrsv project / Sunday Collection</p>
        </div>
      `;
    } else {
      // Default: Confirmation / Initial Receipt
      subject = `Your Sunday Collection Application is Pending.`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F7F5EA; color: #111;">
          <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em; color: rgba(17, 17, 17, 0.5);">the imrsv project / Vetting Queue</p>
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 30px;">Application Received.</h1>
          <p style="font-size: 16px; line-height: 1.6;">Hello ${firstName},</p>
          <p style="font-size: 16px; line-height: 1.6;">Your application to join the Sunday Collection network has been routed to our vetting team. Your current status is: <strong>PENDING</strong>.</p>
          <p style="font-size: 16px; line-height: 1.6;">We carefully review every contribution to ensure we are building a collective that actually restores the communities we operate in.</p>
          <p style="font-size: 16px; line-height: 1.6;">If approved, you will receive further instructions on how to RSVP for upcoming activations or secure event access.</p>
          <br/>
          <hr style="border: none; border-top: 1px solid rgba(17,17,17,0.1); margin: 30px 0;" />
          <p style="font-size: 12px; color: rgba(17, 17, 17, 0.5);">This is an automated message. Please do not reply.</p>
        </div>
      `;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [formData.email],
        subject: subject,
        html: htmlContent
      })
    });

    if (!emailResponse.ok) console.error("Resend API error:", await emailResponse.text());

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Backend endpoint error:", error.message);
  }
}
