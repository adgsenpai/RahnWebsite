# Recruitment UAT — instructions

This folder contains a small UAT script that performs a POST to the site's `/api/sendCV` route to simulate a candidate submitting a CV.

Quick notes / safety
- The *server* controls where email actually goes via environment variables (EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_FROM). The UAT script simply posts the form and expects the server to attempt to send the email.
- By default you should use a test SMTP service (e.g., Mailtrap) while running UAT. That prevents sending real emails to real addresses.
- If you *explicitly* want to send to a real address, set the server's `EMAIL_FROM` (and SMTP settings) to your destination, then proceed. I recommend granting permission before sending real mail.

How to run (fast, from project root)

1) Ensure your Next dev server is running (e.g. `npm run dev`).
2) Set environment variables if you want to override defaults:

   - TARGET_URL - default `http://localhost:3000/api/sendCV`
   - API_KEY - default `RahnWebsite` (this script posts a Bearer header)

   3) Run the script:

   ```bash
    # run using node (JS runner)
    npm run uat:recruitment

Verbose & dry-run options
--------------------------
You can enable more verbose logging or do a dry-run that prints everything the script would send without actually POSTing.

   - DRY_RUN=true  (or pass --dry-run)
   - VERBOSE=true  (or pass --verbose)

Examples (Windows cmd):

   # dry run: show full payload and headers but do not send
   set DRY_RUN=true && set VERBOSE=true && npm run uat:recruitment

   # real send, verbose logging
   set VERBOSE=true && set RECIPIENT=raymond3572@gmail.com && npm run uat:recruitment

   # or run TypeScript directly if you have ts-node
   npx ts-node scripts/uat/recruitment-uat.ts
   ```

Configuring test SMTP (recommended)

1) Create an account on Mailtrap (or similar).
2) Add the Mailtrap SMTP credentials to your Next.js environment (e.g., in `.env.local` for local testing):

   ```ini
   EMAIL_HOST=smtp.mailtrap.io
   EMAIL_USER=your_mailtrap_user
   EMAIL_PASS=your_mailtrap_pass
   EMAIL_PORT=2525
   EMAIL_FROM=your-inbox@example.com
   ```

3) Restart your Next dev server to pick up the environment variables.

Notes about target recipient
- The server code uses `EMAIL_FROM` as the 'to' recipient by default for safety. If you'd like to test delivering to a specific address (e.g. `raymond3572@gmail.com`) you have two safe options:

   1) Configure your server's SMTP env to point to a test SMTP inbox (Mailtrap) and set `EMAIL_FROM` to the test inbox address — then real mail won't go to real recipients.

   2) If you want the API to send to the email supplied by the form body, you can enable it by setting `ALLOW_TO_OVERRIDE=true` in the server's environment. This explicitly allows the `email` field from the POST body to be used as the recipient — do this only for controlled testing.

   Example (explicitly allowed):

   ```ini
   ALLOW_TO_OVERRIDE=true
   EMAIL_HOST=... (mailtrap or your SMTP)
   EMAIL_USER=...
   EMAIL_PASS=...
   EMAIL_FROM=your-source-address@example.com
   ```

   Use caution: enabling `ALLOW_TO_OVERRIDE` allows sending to arbitrary addresses supplied in the request body, so only enable it in a secure test environment.

   To UAT and send to a specific address (e.g. raymond3572@gmail.com) — ensure your server environment has ALLOW_TO_OVERRIDE=true and test SMTP credentials set (or `EMAIL_FROM` pointed to Mailtrap). Then run the script with RECIPIENT set:

   ```bash
   # example — ensure server is running and environment has ALLOW_TO_OVERRIDE=true
   RECIPIENT=raymond3572@gmail.com npm run uat:recruitment
   ```

   ---

   Project .env note
   ------------------
   I inspected the project's `.env` and noticed it contains Office365 SMTP settings (EMAIL_HOST=smtp.office365.com, EMAIL_USER, EMAIL_PASS, EMAIL_PORT) but it does not currently define `EMAIL_FROM`. The mailer requires `EMAIL_FROM` — without it the mail send will fail. Because the repository is configured to use real Office365 SMTP, please do not enable `ALLOW_TO_OVERRIDE` or send to personal addresses while connected to production credentials unless you're sure you want to send real email.

   If you want to perform safe local UAT, either:

   - Switch environment SMTP to a test SMTP provider (Mailtrap) and set `EMAIL_FROM` to the test inbox address; or
   - Provide `EMAIL_FROM` and keep `ALLOW_TO_OVERRIDE` set to `false` so messages are delivered only to a single controlled inbox.

