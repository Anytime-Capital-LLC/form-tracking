/* ========= META PIXEL (kept) ========= */
!function(f,b,e,v,n,t,s){
  if(f.fbq) return;
  n=f.fbq=function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
  if(!f._fbq) f._fbq=n;
  n.push=n; n.loaded=!0; n.version='2.0';
  n.queue=[]; t=b.createElement(e); t.async=!0;
  t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

try { fbq('init', '1360261405409329'); fbq('track', 'PageView'); } catch (e) {}

/* ========= UTM FILL + SUBMIT TRACKING ========= */
(function () {
  // ---- 123FormBuilder hidden field IDs (your values) ----
  var ID_SOURCE   = 118981960; // utm_source
  var ID_MEDIUM   = 118982127; // utm_medium
  var ID_CAMPAIGN = 118982128; // utm_campaign

  // ---- helpers ----
  function getQS(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ""; }
    catch(e){ return ""; }
  }
  function setVal(fieldId, value) {
    try {
      if (!fieldId || value == null || value === "") return;
      loader.engine.document.getElementById(fieldId).setValue({ value: String(value) });
    } catch(e) { /* never block submit */ }
  }

  // Try to populate from the iframe URL (works if querystring is present)
  function fillFromURL() {
    setVal(ID_SOURCE,   getQS("utm_source"));
    setVal(ID_MEDIUM,   getQS("utm_medium"));
    setVal(ID_CAMPAIGN, getQS("utm_campaign"));
  }

  // Accept payload from the parent Wix page (robust path)
  function fillFromPayload(p) {
    if (!p) return;
    var last = p.last || {};
    setVal(ID_SOURCE,   last.utm_source);
    setVal(ID_MEDIUM,   last.utm_medium);
    setVal(ID_CAMPAIGN, last.utm_campaign);
  }

  // Listen for UTMs pushed from parent (Wix custom code sends UTM_PAYLOAD)
  window.addEventListener("message", function(ev){
    if (!ev || !ev.data || ev.data.type !== "UTM_PAYLOAD") return;
    fillFromPayload(ev.data);
  }, false);

  // On form DOM ready: fill UTMs, then wire submit tracking
  document.addEventListener('DOMContentLoaded', function () {
    // give the form controls a moment to mount
    setTimeout(fillFromURL, 600);

    var form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function () {
      // 1) Notify parent (optional central tagging)
      try { window.parent.postMessage({ event: 'form123_submitted' }, '*'); } catch(e){}

      // 2) Fire GA4/Ads conversion (prefer parent gtag if available)
      try {
        var g = (window.parent && typeof window.parent.gtag === 'function')
                  ? window.parent.gtag
                  : (typeof window.gtag === 'function' ? window.gtag : null);

        // Send UTMs as event params too (GA4 custom definitions required)
        var src = getQS("utm_source")   || "";
        var med = getQS("utm_medium")   || "";
        var cmp = getQS("utm_campaign") || "";

        if (g) {
          g('event', 'conversion_event_submit_lead_form', {
            utm_source: src,
            utm_medium: med,
            utm_campaign: cmp,
            event_timeout: 2000,
            event_callback: function () {}
          });
        }
      } catch(e){}

      // 3) Optional: Meta Lead on submit
      try { if (typeof fbq === 'function') fbq('track', 'Lead'); } catch(e){}
    });
  });
})();
