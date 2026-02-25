export const sendNotificationEmail = async (formData) => {
  const resendKey = import.meta.env.VITE_RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'info@theimrsvproject.org';
  const emailFrom = import.meta.env.VITE_EMAIL_FROM || 'Sunday Collection <notifications@theimrsvproject.org>';

  if (!resendKey) {
    console.warn("Resend API Key not configured. Skipping email.");
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`
      },
      body: JSON.stringify({
        from: emailFrom, // Using your verified domain
        to: [adminEmail], // Update this to your real email address
        subject: `New Sunday Collection Application: ${formData.name}`,
        html: `
          <h1>New Application Received</h1>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Hub:</strong> ${formData.hub}</p>
          <p><strong>Occupation:</strong> ${formData.occupation}</p>
          <p><strong>Social:</strong> ${formData.social}</p>
          <p><strong>Contribution:</strong> ${formData.contribution}</p>
          <hr />
          <p>Sent via imrsv project automated tracking.</p>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    console.log("Notification email sent successfully");
  } catch (e) {
    console.error("Error sending email:", e);
  }
};
