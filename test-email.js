import fetch from 'node-fetch';

async function testEmail() {
    const resendKey = process.env.VITE_RESEND_API_KEY;
    if (!resendKey) {
        console.error("No VITE_RESEND_API_KEY in environment");
        return;
    }

    try {
        const adminResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendKey}`
            },
            body: JSON.stringify({
                from: 'Sunday Collection <notifications@theimrsvproject.org>',
                to: ['info@theimrsvproject.org', 'danielingallsbiz@gmail.com'],
                subject: `TEST EMAIL from node`,
                html: `<p>Test email successful</p>`
            })
        });

        if (adminResponse.ok) {
            console.log("Email sent! ", await adminResponse.json());
        } else {
            console.error("Email failed!", await adminResponse.text());
        }
    } catch (e) {
        console.error("Error: ", e);
    }
}
testEmail();
