# Deployment Guide

This guide walks you through deploying the Client Dashboard to Vercel so it can be accessed online and shared with clients. No technical experience required.

---

## Before You Start

You will need:
- A **GitHub account** (free) — this is where the project code lives
- Your **Airtable API key** and **Base ID** (see Step 3 below for how to find them)

---

## Step 1 — Create a Free Vercel Account

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**.
2. Choose **Continue with GitHub** — this links your Vercel and GitHub accounts together automatically.
3. Follow the prompts to authorize Vercel to access your GitHub.

---

## Step 2 — Connect Your GitHub Repository

1. From your Vercel dashboard, click **Add New... → Project**.
2. Under **Import Git Repository**, find the repository for this project (e.g. `nextjs-app` or whatever you named it).
3. Click **Import** next to it.
4. On the configuration screen, leave all settings at their defaults — Vercel detects Next.js automatically.
5. **Do not click Deploy yet** — you need to add your Airtable credentials first (Step 3).

---

## Step 3 — Add Your Airtable Credentials as Environment Variables

The dashboard connects to Airtable using two secret values. You must add them before deploying, or the app will show an error.

### How to find your Airtable API Key

1. Log in to [airtable.com](https://airtable.com).
2. Click your **profile icon** in the top-right corner, then go to **Account**.
3. Under **API**, click **Generate API key** (or copy the one already shown).
4. Copy the key — it starts with `pat` or `key`.

### How to find your Airtable Base ID

1. Open the Airtable base that contains your `WeeklyMetrics` table.
2. Look at the URL in your browser. It will look something like:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY/...
   ```
3. The **Base ID** is the part that starts with `app` — copy everything from `app` up to the next `/`.

### Add them in Vercel

1. Back on the Vercel configuration screen (from Step 2), scroll down to **Environment Variables**.
2. Add the first variable:
   - **Name:** `AIRTABLE_API_KEY`
   - **Value:** paste your Airtable API key
3. Click **Add** and then add the second:
   - **Name:** `AIRTABLE_BASE_ID`
   - **Value:** paste your Airtable Base ID
4. Make sure both show as **Production** (this is the default).

---

## Step 4 — Deploy

1. Click the **Deploy** button.
2. Vercel will build and deploy the project. This usually takes 1–2 minutes.
3. When it finishes, you will see a **Congratulations** screen with a live URL (e.g. `https://your-project.vercel.app`).

---

## Step 5 — Share the URL with Clients

1. Copy the live URL from the Vercel dashboard.
2. You can share this URL directly with clients — no login required to view the dashboard.
3. To share a pre-filtered view (e.g. a specific date range), apply the filter in your browser and copy the full URL including the `?startDate=...&endDate=...` query parameters. Anyone who opens that link will see the same date range automatically.

---

## Re-deploying After Changes

Any time you push new code to your GitHub repository, Vercel will automatically rebuild and redeploy the project. No manual action needed.

If you need to update your Airtable credentials:
1. Go to your project in the Vercel dashboard.
2. Click **Settings → Environment Variables**.
3. Edit the relevant variable and save.
4. Trigger a new deployment from the **Deployments** tab for the change to take effect.
