# DhofarCare — BlueFlow (Ready: Book→Save→Redirect to Payment)

- Phone set to: +968 93899484 (topbar, footer, WhatsApp button).
- Edit `config.js` with:
  - `SHEET_WEBAPP_URL`: Apps Script Web App (exec).
  - `PAYMENT_URL`: PayTabs Hosted Payment Page or Stripe Payment Link.
- Apps Script (in README of older zip or ask me to paste again) writes to Google Sheet, sends email to customer and admin (you), optional SMS via Twilio.
- After POST is saved, user is redirected instantly to the payment page.
