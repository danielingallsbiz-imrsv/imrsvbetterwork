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
