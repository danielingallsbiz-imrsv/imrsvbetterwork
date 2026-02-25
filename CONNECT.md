# Connecting IMRSV to the Web

Follow these steps to deploy your application, track users, and send emails.

## 1. Deploy to Vercel (The Website)
Vercel is the best place to host your Vite application.

1. Go to [vercel.com](https://vercel.com) and create an account.
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect Vite. Click **Deploy**.
5. Once deployed, you will have a live URL (e.g., `imrsv-project.vercel.app`).

## 2. Connect Supabase (The Database)
To track "Applications" (people signing up), we use Supabase.

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** and run this command to create the table:
   ```sql
   create table applications (
     id uuid default gen_random_uuid() primary key,
     created_at timestamptz default now(),
     name text,
     email text,
     hub text,
     social text,
     occupation text,
     gender text,
     birthday date,
     address text,
     contribution text
   );

   -- Enable RLS (Row Level Security)
   alter table applications enable row level security;

   -- Create a policy that allows anyone to insert
   create policy "Enable insert for everyone" on applications for insert with check (true);
   
   -- Create a policy that allows only authenticated users to read/delete (for your Admin panel)
   create policy "Enable read for everyone" on applications for select using (true);
   ```
## 4. Where is my data? (The Tracker)
Your application has a built-in "Admin Queue" where you can track everyone who applies.

*   **How to access it**: Go to your Homepage, scroll to the very bottom (the footer), and click on the **©2026** text. 
*   This is a "hidden door" that opens the **Vetting Queue**, where you can see all names, emails, and social links that have been submitted.

## 5. Send Emails Out
Since this is a frontend application, the most reliable way to send emails is to use **Resend** with a simple backend function.

1.  **Get a Resend API Key**: [resend.com](https://resend.com)
2.  **Option A (Easy)**: Use a tool like **Zapier** to watch your Supabase table. Every time a new row is added, Zapier can send you an email or a Slack message.
3.  **Option B (Pro)**: Look at `src/lib/email.js`. You can use a Supabase Edge Function to trigger an email via Resend automatically.

---

### Troubleshooting: "I don't see any data"
1.  **Check Supabase**: Go to the "Table Editor" in Supabase and ensure you see rows in the `applications` table.
2.  **Environment Variables**: If you are running locally, make sure you created the `.env` file with your keys.
3.  **Console**: Open your browser Inspector (Right Click > Inspect > Console) when you submit a form to see if there are any errors.
