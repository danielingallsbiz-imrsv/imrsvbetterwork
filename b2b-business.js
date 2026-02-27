// Using built-in fetch (Node 18+)

const resendKey = 're_JUuzjyVG_5kKHCbMkfqUH1GnXq8Q6bPXU';
const sender = 'daniel@theimrsvproject.org';

const headerHtml = `
    <div style="margin-bottom: 40px; text-align: left;">
        <h1 style="font-family: 'Inter', Arial, sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; margin: 0; color: #000;">THE IMRSV PROJECT</h1>
        <span style="font-family: Arial, sans-serif; font-size: 14px; letter-spacing: 0.1em; color: #666; text-transform: uppercase; margin-top: 10px; display: block;">Staple Hub / Oahu Drop</span>
    </div>
`;

const emailFooter = `
    <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
        <p><strong>Daniel</strong><br>Founder, The IMRSV Project</p>
        <p><em>Participation that restores.</em></p>
        <p><a href="https://theimrsvproject.org" style="color: #666; text-decoration: none;">theimrsvproject.org</a> | <a href="mailto:daniel@theimrsvproject.org" style="color: #666; text-decoration: none;">daniel@theimrsvproject.org</a></p>
    </div>
`;

const emailVariants = [
    // Variant 1: "Intentionality" Focus
    (business, contactName) => ({
        subject: `Partnership: IMRSV x ${business}`,
        html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
                ${headerHtml}
                <p>Hey ${contactName},</p>
                <p>I’m Daniel, I run <strong>The IMRSV Project</strong>.</p>
                
                <p>We’re putting together a drop in Oahu soon. The goal is to get locals and travelers together in a way that actually feels intentional — moving away from the usual generic pop-ups and toward something that keeps real value circulating in the neighborhood.</p>

                <p>Our model is pretty straightforward: we host curated gatherings/events, and <strong>70% of the profits</strong> go straight back into local restoration and community projects. The other 30% just keeps my small team moving so we can keep building this thing responsibly.</p>

                <p>Beyond the events, we’re currently <strong>developing an app</strong> that maps out the best local spots as “Hubs.” It’s going to be a digital guide for our community to find, support, and actually connect with the places that make the city what it is. I’d love to have ${business} live on the app as a featured Hub for this drop — we’d love to send our people your way.</p>

                <p>If you're into the vibe, I’d love to catch up for 10 mins and see if it’s a fit.</p>

                <p>Best,</p>
                <p>Daniel</p>
                ${emailFooter}
            </div>
        `
    }),
    // Variant 2: "Restorative" Focus
    (business, contactName) => ({
        subject: `Oahu Drop x ${business}: Intentional Connection`,
        html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
                ${headerHtml}
                <p>Hi ${contactName},</p>
                <p>Daniel here, Founder of <strong>The IMRSV Project</strong>. Reaching out because we’re planning a restorative event in Oahu and I think ${business} would be a perfect fit for the itinerary.</p>
                
                <p>We’re all about hosting experiences that feel real. Less transactional tourism, more staying connected to the local culture. We use a <strong>70/30 model</strong> — 70% of what we make goes back into the community (restoration, arts, local initiatives) and 30% keeps our core team running.</p>

                <p>We’re also <strong>developing the IMRSV app</strong> where we feature "Hubs" — basically a curated list of spots that our community hits to find missions and support local culture. It’s a clean way to drive intentional traffic to your door while giving people a reason to keep coming back.</p>

                <p>Would love to chat about featuring ${business} for the upcoming drop if you're open to it.</p>

                <p>Cheers,<br>Daniel</p>
                ${emailFooter}
            </div>
        `
    }),
    // Variant 3: "Sustainable Ecosystem" Focus
    (business, contactName) => ({
        subject: `Restoring value: IMRSV x ${business}`,
        html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
                ${headerHtml}
                <p>Hey ${contactName},</p>
                <p>Daniel from <strong>The IMRSV Project</strong> here. We’re building out a new system for intentional city exploration, and we’re heading to Oahu next.</p>

                <p>Our whole thing is keeping value local. For every event we host, <strong>70% of profits</strong> are reinvested into local projects, with 30% supporting our small team. It’s about building a sustainable ecosystem for the places we love.</p>

                <p>Part of that system is an <strong>app we are developing</strong> to highlight trusted local spots as "Hubs." Our members will use it to find spots like ${business} that align with the vibe. We’d love to feature you guys for our upcoming Oahu release and get you some high-value, aligned traffic.</p>

                <p>Hit me up if you want to chat more about it.</p>

                <p>Appreciate you,<br>Daniel</p>
                ${emailFooter}
            </div>
        `
    })
];

const recipients = [
    { business: 'Paradise Ciders', email: 'miliani@paridiseciders.com', contact: 'Miliani' },
    { business: 'Honolulu Beadwork\'s', email: 'carrie@honolulubearworks.com', contact: 'Carrie' },
    { business: 'Waikiki Brewing Company', email: 'Andy@wakikibrewingcomapny.com', contact: 'Andy' },
    { business: 'Hawaiian Ice Company', email: 'kawika@hawnice.com', contact: 'Kawika' },
    { business: 'Lanterns Hawaii', email: 'cameron@lanternshawaii.com', contact: 'Cameron' },
    { business: 'Village Beer and Bottle Shop', email: 'info@villagebeerhawaii.com', contact: 'team' },
    { business: 'Food & Music Test', email: 'danielingallsbiz@gmail.com', contact: 'Daniel' }
];

async function sendSponsorshipCampaign(dryRun = true) {
    console.log(dryRun ? "--- DRY RUN: PREVIEWING EMAILS ---" : "--- STARTING REAL CAMPAIGN ---");

    for (let i = 0; i < recipients.length; i++) {
        const recipientData = recipients[i];
        const variantIndex = i % emailVariants.length; // Rotate through 3 variants
        const getEmail = emailVariants[variantIndex];
        const { subject, html } = getEmail(recipientData.business, recipientData.contact);

        if (dryRun) {
            console.log(`\n[RECIPIENT]: ${recipientData.email} (${recipientData.business})`);
            console.log(`[VARIANT]: ${variantIndex + 1}`);
            console.log(`[SUBJECT]: ${subject}`);
            console.log(`--------------------------------------------------`);
            continue;
        }

        try {
            console.log(`Sending to ${recipientData.email}...`);
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendKey}`
                },
                body: JSON.stringify({
                    from: `Daniel | IMRSV Founder <${sender}>`,
                    to: [recipientData.email],
                    subject: subject,
                    html: html
                })
            });

            if (response.ok) {
                console.log(`SUCCESS: Sent to ${recipientData.business}`);
            } else {
                console.error(`FAILED: ${recipientData.business}`, await response.text());
            }

            // Rate limit safety (1s per email)
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (e) {
            console.error(`ERROR: ${recipientData.business}`, e);
        }
    }
}

// TOGGLE THIS TO FALSE TO SEND FOR REAL
const isDryRun = false;
sendSponsorshipCampaign(isDryRun);
