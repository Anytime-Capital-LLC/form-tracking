(function () {
  // Your 123FB field IDs
  var ID_SOURCE   = 118981960; // utm_source
  var ID_MEDIUM   = 118982127; // utm_medium
  var ID_CAMPAIGN = 118982128; // utm_campaign

  function getQS(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ""; }
    catch(e){ return ""; }
  }

  function setField(fieldId, value) {
    if (!fieldId || !value) return false;
    try {
      var node = loader && loader.engine && loader.engine.document && loader.engine.document.getElementById(fieldId);
      if (node && typeof node.setValue === 'function') {
        node.setValue({ value: String(value) });
        return true;
      }
    } catch (e) {}
    return false;
  }

  function fillOnce() {
    var s = getQS('utm_source');
    var m = getQS('utm_medium');
    var c = getQS('utm_campaign');

    var ok = false;
    ok = setField(ID_SOURCE, s)   || ok;
    ok = setField(ID_MEDIUM, m)   || ok;
    ok = setField(ID_CAMPAIGN, c) || ok;
    return ok;
  }

  // Try repeatedly for up to ~5s so we don't race the form renderer
  var tries = 0, maxTries = 20;
  var timer = setInterval(function () {
    tries++;
    if (fillOnce() || tries >= maxTries) clearInterval(timer);
  }, 250);
})();
