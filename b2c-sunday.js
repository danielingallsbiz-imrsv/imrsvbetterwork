// Using built-in fetch (Node 18+)

const resendKey = 're_JUuzjyVG_5kKHCbMkfqUH1GnXq8Q6bPXU';
const sender = 'daniel@theimrsvproject.org';
const recipient = 'danielingallsbiz@gmail.com';

const colors = ['#E74C3C', '#3498DB', '#F1C40F', '#2ECC71', '#9B59B6', '#34495E'];
const fonts = ['serif', 'sans-serif', 'monospace', 'Arial', 'Georgia'];

function getCutoutHtml(text) {
    return text.split('').map(char => {
        if (char === ' ') return '&nbsp;';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const font = fonts[Math.floor(Math.random() * fonts.length)];
        const rotation = (Math.random() * 6 - 3).toFixed(2);
        const isDark = ['#34495E', '#E74C3C', '#C0392B', '#3498DB', '#9B59B6'].includes(color);

        return `<span style="
            background: ${color};
            color: ${isDark ? '#FFF' : '#000'};
            padding: 4px 8px;
            font-family: ${font};
            font-size: 24px;
            font-weight: 900;
            display: inline-block;
            transform: rotate(${rotation}deg);
            margin: 2px;
            text-transform: uppercase;
            box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        ">${char}</span>`;
    }).join('');
}

const headerHtml = `
    <div style="margin-bottom: 40px; text-align: left;">
        ${getCutoutHtml('Sunday')} <br/>
        ${getCutoutHtml('collection')} <br/>
        <span style="font-family: Arial, sans-serif; font-size: 14px; letter-spacing: 0.1em; color: #666; text-transform: uppercase; margin-top: 10px; display: block;">by imrsv</span>
    </div>
`;

const emailFooter = `
    <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
        <p><strong>Daniel</strong><br>Founder and COO, The IMRSV Project</p>
        <p><em>Participation that restores.</em></p>
        <p><a href="https://theimrsvproject.org" style="color: #666; text-decoration: none;">theimrsvproject.org</a> | <a href="mailto:daniel@theimrsvproject.org" style="color: #666; text-decoration: none;">daniel@theimrsvproject.org</a></p>
    </div>
`;

const itineraryHtml = `
    <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #F7D031; margin: 25px 0;">
        <h4 style="margin-top: 0; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; color: #666;">Event Itinerary / Oahu Drop</h4>
        <p style="font-size: 14px; margin: 8px 0;"><strong>09:00 — 11:00</strong> : IMRSV RUN CLUB</p>
        <p style="font-size: 14px; margin: 8px 0;"><strong>12:00 — 14:00</strong> : CURATED NETWORKING</p>
        <p style="font-size: 14px; margin: 8px 0;"><strong>15:00 — 21:00</strong> : DJ SET / OPEN BAR</p>
    </div>
`;

const emails = [
    {
        subject: 'Sponsorship: Our Next Drop (Sunday Collection x Local Hub)',
        html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
                ${headerHtml}
                <p>Hi There,</p>
                <p>I’m reaching out from <strong>The IMRSV Project</strong>. We’re gearing up for <strong>Our Next Drop</strong>—a massive marketing and release party in Oahu on April 12.</p>
                
                <p><strong>The App:</strong> IMRSV is a real-world collection system centered around verified “Hubs.” Our members physically "claim" spots like yours to earn participation currency, which unlocks exclusive perks, missions, and community status. We're moving from being spectators to being active contributors.</p>

                <p><strong>The Drop Event:</strong> This isn't just an activation; it's a launch. Here’s how the day looks:</p>
                ${itineraryHtml}

                <p><strong>The Ask:</strong> We are looking for <strong>just 1 sponsor</strong> for this drop to help bring costs down. We specifically need support with <strong>Ice, Alcohol, or Food</strong>.</p>
                <p><strong>Why Sponsor?</strong> By bringing our overhead down, we can reinvest more into the community. We've committed to a transparent model where <strong>70% of all event profits</strong> are reinvested directly into local artists and community projects. The remaining 30% supports our small, dedicated team.</p>
                
                <p>As a sponsor, you'll be featured as a core <strong>Hub</strong> in our app, driving high-value, intentional traffic to your door through our mission-based exploration game.</p>
                
                <p>Are you open to a quick chat about joining the drop?</p>
                <p>Best,<br>Daniel</p>
                ${emailFooter}
            </div>
        `
    },
    {
        subject: 'Sponsorship Invitation: Supporting the Oahu Drop',
        html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
                ${headerHtml}
                <p>Hi There,</p>
                <p>I’m writing to you regarding <strong>Our Next Drop</strong>—the official marketing and release party for Sunday Collection, hitting Oahu on April 12.</p>

                <p><strong>How the App Works:</strong> The IMRSV app turns city exploration into a collaborative game. By visiting "Hubs," users unlock status and earn currency that reinvests back into the local culture. It’s an intentional ecosystem built to stop extraction and start participation.</p>

                <p><strong>The Oahu Itinerary:</strong></p>
                ${itineraryHtml}

                <p><strong>The Ask:</strong> We’re looking for a singular partner to sponsor <strong>Ice, Alcohol, or Food</strong> for this release. We only work with <strong>just 1 sponsor</strong> per category to maintain exclusivity.</p>

                <p><strong>70/30 Impact Model:</strong> Our goal is reinvestment. We put <strong>70% of profits</strong> into the local community via our Restoration Fund and 30% toward our small team. Your sponsorship directly enables more of those funds to hit the ground in Oahu.</p>

                <p>Would you be interested in being the featured Hub for our Oahu drop?</p>
                <p>Best,<br>Daniel</p>
                ${emailFooter}
            </div>
        `
    }
];

async function sendEmails() {
    for (const email of emails) {
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendKey}`
                },
                body: JSON.stringify({
                    from: `Daniel | IMRSV Founder & COO <${sender}>`,
                    to: [recipient],
                    subject: email.subject,
                    html: email.html
                })
            });

            if (response.ok) {
                console.log(`Email sent: ${email.subject}`);
            } else {
                console.error(`Failed to send: ${email.subject}`, await response.text());
            }
        } catch (e) {
            console.error(`Error sending ${email.subject}:`, e);
        }
    }
}

sendEmails();
