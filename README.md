# Anytime Capital Form Tracking Script

This repository contains a custom JavaScript file (`form-tracking.js`) used for multi-platform tracking of the Buy Crypto intake form embedded on [Anytime-Capital.com](https://anytime-capital.com/buy-crypto-offer).

## Purpose

The script enables robust tracking of form submissions for analytics and ad platforms, even when the form is embedded via iframe and cross-domain challenges prevent native tag manager triggers.

### Platforms Supported
- **Meta (Facebook) Pixel**
- **Google Ads / GA4 (Google Tag / gtag.js)**
- **Custom Event Messaging for Google Tag Manager (via postMessage)**

## How It Works

- **Meta Pixel** and **Google Ads/GA4** tracking events fire automatically on successful form submission.
- The script also sends a `postMessage` event (`form123_submitted`) to the parent window, which can be used by the host website (e.g., Wix) to trigger additional tracking (e.g., via Google Tag Manager).
- The script is loaded by 123 Form Builder using their “Add JS script to your form” feature, referencing the [raw GitHub file URL](https://raw.githubusercontent.com/Anytime-Capital-LLC/form-tracking/main/form-tracking.js).

## Installation / Usage

1. **Update or maintain the script** in `form-tracking.js` as needed.
2. **Get the raw file URL** (click "Raw" on GitHub, copy the URL).
3. In 123 Form Builder, go to:
   - **Set Up > Advanced > Add a JS script to your form**
   - Paste the raw JS file URL and save.
4. **(Optional)**: On the parent site (e.g., Wix), add a message listener to capture the `form123_submitted` event if additional tracking or workflows are needed.

## Customization

- Update Meta Pixel ID or Google Ads/GA4 conversion parameters as needed.
- Extend the event payload for `postMessage` if you want to send additional data (e.g., selected amount, user email, etc.) to the parent page.

## Notes

- Do **not** include any sensitive credentials, API keys, or private logic in this file. It is served publicly to browsers.
- This repo is **public** to allow 123 Form Builder to access the file directly.

---

**For questions, updates, or to extend tracking, please contact JSol or the Anytime Capital marketing/engineering team.**
