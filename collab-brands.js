// Using built-in fetch (Node 18+)

const resendKey = 're_JUuzjyVG_5kKHCbMkfqUH1GnXq8Q6bPXU';
const sender = 'daniel@theimrsvproject.org';
const testRecipient = 'danielingallsbiz@gmail.com';

const headerHtml = `
    <div style="margin-bottom: 40px; text-align: left;">
        <h1 style="font-family: 'Inter', Arial, sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; margin: 0; color: #000;">THE IMRSV PROJECT</h1>
        <span style="font-family: Arial, sans-serif; font-size: 14px; letter-spacing: 0.1em; color: #666; text-transform: uppercase; margin-top: 10px; display: block;">Collaboration Discovery / SUnday collection drop</span>
    </div>
`;

const emailFooter = `
    <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
        <p><strong>Daniel</strong><br>Founder, The IMRSV Project</p>
        <p><em>Participation that restores.</em></p>
        <p><a href="https://theimrsvproject.org" style="color: #666; text-decoration: none;">theimrsvproject.org</a> | <a href="mailto:daniel@theimrsvproject.org" style="color: #666; text-decoration: none;">daniel@theimrsvproject.org</a></p>
    </div>
`;

const emailVariant = (brandName) => ({
    subject: `Partnership: The SUnday collection x ${brandName}`,
    html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
            ${headerHtml}
            <p>Hey team,</p>
            <p>I’m Daniel, I run <strong>The IMRSV Project</strong>.</p>
            
            <p>I’ve been following <strong>${brandName}</strong> and I really dig the aesthetic. We’re currently building out a platform for "Intentional exploration"—bringing locals and travelers together at curated events we call <strong>"SUnday collections."</strong></p>

            <p>These aren't just pop-ups; they're intentional gatherings designed to host and bridge community. We’re currently planning drops in both <strong>Oahu</strong> and <strong>Medellín</strong>, and I’d love to explore ways to <strong>showcase your brand</strong> as part of these collections.</p>

            <p>We work on a <strong>70/30 impact model</strong>: 70% of event profits are reinvested straight into local restoration and community projects, while 30% supports our small team so we can keep building this platform responsibly.</p>

            <p>We’re also <strong>developing an app</strong> that maps out trusted "Hubs" for our community to support. We’d love to see if there’s a way to integrate ${brandName} into the vibe of these upcoming SUnday collection drops.</p>

            <p>Hit me up if you're open to a 10-min riff on it.</p>

            <p>Appreciate you,</p>
            <p>Daniel</p>
            ${emailFooter}
        </div>
    `
});

async function sendSingleCollabDraft(brandName = "Afends") {
    console.log(`--- SENDING SINGLE REFINED COLLAB DRAFT FOR [${brandName}] TO DANIEL ---`);

    const { subject, html } = emailVariant(brandName);

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendKey}`
            },
            body: JSON.stringify({
                from: `Daniel | IMRSV Founder <${sender}>`,
                to: [testRecipient],
                subject: `[REFINED DRAFT: ${brandName}] ${subject}`,
                html: html
            })
        });

        if (response.ok) {
            console.log(`SUCCESS: Refined draft for ${brandName} sent to your inbox.`);
        } else {
            console.error(`FAILED:`, await response.text());
        }
    } catch (e) {
        console.error(`ERROR:`, e);
    }
}

// Only sending ONE for review as requested
sendSingleCollabDraft("Afends");
