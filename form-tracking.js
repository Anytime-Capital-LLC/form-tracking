// ===== META PIXEL (unchanged) =====
!function(f,b,e,v,n,t,s){
  if(f.fbq) return; n=f.fbq=function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
  if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
  n.queue=[]; t=b.createElement(e); t.async=!0;
  t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

try { fbq('init', '1360261405409329'); fbq('track', 'PageView'); } catch (e) {}

// ===== UTM AUTOFILL + SUBMIT TRACKING =====
(function () {
  // --- helpers ---
  function getQS(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ""; }
    catch(e){ return ""; }
  }
  function setVal(fieldId, value) {
    try {
      if (!fieldId || value === undefined || value === null || value === "") return;
      loader.engine.document.getElementById(fieldId).setValue({ value: String(value) });
    } catch(e) { /* ignore to avoid breaking submit */ }
  }

  // Map URL params to fields (iframe often receives querystring)
  function fillFromURL() {
    setVal(118981960,   getQS("utm_source"));
    setVal(118982127,   getQS("utm_medium"));
    setVal(118982128, getQS("utm_campaign"));
  }

  // Accept payload pushed from parent (Wix) via postMessage
  function fillFromPayload(p) {
    if (!p) return;
    const last  = p.last || {};
    const first = p.first || {};
    const cta   = p.cta || {};

    // Primary UTMs (last-touch)
    setVal(118981960,   last.utm_source);
    setVal(118982127,   last.utm_medium);
    setVal(118982128, last.utm_campaign);
  }

  // Listen for parent messages carrying UTMs
  window.addEventListener("message", function(ev){
    if (!ev || !ev.data || ev.data.type !== "UTM_PAYLOAD") return;
    fillFromPayload(ev.data);
  }, false);

  // When the form DOM is ready, populate fields from URL first
  document.addEventListener('DOMContentLoaded', function () {
    // Attempt URL-based fill (cheap, no cross-origin needed)
    setTimeout(fillFromURL, 700);

    // Your existing submission tracking (unchanged, just made resilient)
    var form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function () {
      try {
        // 1) Notify parent page (Wix) if you handle tags there
        window.parent.postMessage({ event: 'form123_submitted' }, '*');
      } catch(e){}

      try {
        // 2) Fire Google Ads/GA4 conversion **inside** the iframe if gtag is available
        // Prefer parent gtag if defined; otherwise use local gtag if present.
        var g = (window.parent && window.parent.gtag) ? window.parent.gtag : (window.gtag || null);
        if (typeof g === 'function') {
          g('event', 'conversion_event_submit_lead_form', {
            'event_callback': function () {},
            'event_timeout': 2000
          });
        }
      } catch(e){}

      try {
        // Optional: Meta standard event on submit
        if (typeof fbq === 'function') fbq('track', 'Lead');
      } catch(e){}
    });
  });
})();
