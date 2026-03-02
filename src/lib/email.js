export const sendNotificationEmail = async (formData) => {
  try {
    console.log("Routing notification thru Vercel backend...");
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Backend error:", err);
      return;
    }

    console.log("Vercel backend successfully fired notifications.");
  } catch (e) {
    console.error("Network error hitting backend:", e);
  }
};

export const sendCampaignEmail = async (emails, subject, htmlContent) => {
  try {
    console.log(`Routing campaign broadcast to ${emails.length} subscribers thru Vercel backend...`);
    const response = await fetch('/api/send-campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emails, subject, htmlContent })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Backend campaign error:", err);
      return { success: false, error: err };
    }

    const data = await response.json();
    console.log("Vercel backend successfully fired campaign batch.", data);
    return { success: true, data };
  } catch (e) {
    console.error("Network error hitting campaign backend:", e);
    return { success: false, error: e.message };
  }
};

