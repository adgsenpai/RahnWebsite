const axios = require("axios");

const TARGET_URL = process.env.TARGET_URL || "http://localhost:3000/api/sendCV";
const API_KEY = process.env.API_KEY || "RahnWebsite";

// Convenience flags:
// VERBOSE=true -> prints detailed debug information
// DRY_RUN=true -> do not actually POST to the server; useful for testing
const VERBOSE = (process.env.VERBOSE || "false").toLowerCase() === "true" || process.argv.includes("--verbose");
const DRY_RUN = (process.env.DRY_RUN || "false").toLowerCase() === "true" || process.argv.includes("--dry-run");

(async function run() {
  console.log(`Submitting UAT POST to ${TARGET_URL}`);
  if (VERBOSE) console.log("VERBOSE mode: ON");
  if (DRY_RUN) console.log("DRY_RUN mode: ON - no request will be sent");

  const dummyName = `UAT Bot ${new Date().toISOString()}`;
  const dummyMessage = `This is a UAT test — ignore. Random ID: ${Math.random().toString(36).slice(2)}.`;

  const fakePdf = Buffer.from("%PDF-1.4\n% UAT dummy pdf\nHello UAT\n", "utf8").toString("base64");

  const payload = {
    name: dummyName,
    email: process.env.RECIPIENT || "nonsense@example.com",
    filename: `uat-${Date.now()}.pdf`,
    message: dummyMessage,
    subject: `UAT - Recruitment submission - ${new Date().toISOString()}`,
    htmlcode: `<p>${dummyMessage}</p><p>From: ${dummyName}</p>`,
    cv: fakePdf,
  };

  try {
    if (VERBOSE) {
      console.log("--- REQUEST DETAILS ---");
      console.log("Target URL:", TARGET_URL);
      console.log("Headers:", {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      });
      console.log("Payload preview (cv base64 length):", payload.cv ? payload.cv.length : 0);
      console.log("Full payload:", JSON.stringify({ ...payload, cv: payload.cv ? payload.cv.slice(0, 200) + "..." : null }, null, 2));
      console.log("-----------------------");
    }

    if (DRY_RUN) {
      console.log("DRY_RUN - request not sent. Exiting.");
      return;
    }

    const start = Date.now();
    const resp = await axios.post(TARGET_URL, payload, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    const ms = Date.now() - start;
    console.log("Status:", resp.status, `(${ms}ms)`);
    console.log("Response data:", resp.data);
    if (VERBOSE) {
      console.log("Response headers:", resp.headers);
    }
    if (resp.status === 200) {
      console.log("UAT POST succeeded — server responded OK.\nMake sure the server's SMTP/backend is pointed to a safe test mailbox (Mailtrap) unless you want real mail deliveries.");
    } else {
      console.warn("Server returned non-200 status — check request and server logs.");
    }
  } catch (err) {
    if (err.response) {
      console.error("Server error status:", err.response.status);
      console.error("Server response:", err.response.data);
      if (VERBOSE) console.error("Server response headers:", err.response.headers);
    } else {
      console.error("Error while posting to target:", err.message || err);
      if (VERBOSE) console.error(err.stack || "no-stack");
    }
    process.exitCode = 2;
  }
})();
