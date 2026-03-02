export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { emails, subject, htmlContent } = req.body;

        // Hardcoding securely into backend to bypass Vercel propagation bug
        const resendKey = 're_JUuzjyVG_5kKHCbMkfqUH1GnXq8Q6bPXU';
        const emailFrom = 'Sunday Collection <sundaycollection@theimrsvproject.org>';

        if (!resendKey) {
            return res.status(500).json({ error: 'Resend API Key missing in environment' });
        }

        if (!emails || !emails.length) {
            return res.status(400).json({ error: 'No recipients provided' });
        }

        if (!subject || !htmlContent) {
            return res.status(400).json({ error: 'Subject or content missing' });
        }

        // Format for Resend Batch API
        // https://resend.com/docs/api-reference/emails/send-batch-emails
        // "You can send up to 100 emails per batch"
        const BATCH_SIZE = 100;

        for (let i = 0; i < emails.length; i += BATCH_SIZE) {
            const batchEmails = emails.slice(i, i + BATCH_SIZE);
            const emailPayloads = batchEmails.map(email => ({
                from: emailFrom,
                to: [email],
                subject: subject,
                html: htmlContent
            }));

            const emailResponse = await fetch('https://api.resend.com/emails/batch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendKey}`
                },
                body: JSON.stringify(emailPayloads)
            });

            if (!emailResponse.ok) {
                const errorText = await emailResponse.text();
                console.error("Resend Batch API error:", errorText);
                return res.status(500).json({ error: 'Failed to send campaign batch', details: errorText });
            }
        }

        return res.status(200).json({ success: true, count: emails.length });
    } catch (error) {
        console.error("Backend campaign endpoint error:", error.message);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
