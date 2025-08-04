// META PIXEL
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1360261405409329');
fbq('track', 'PageView');

// Google Tag/gtag() code fires after submit
document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', function() {
    // 1. Notify parent page
    window.parent.postMessage({ event: 'form123_submitted' }, '*');
    // 2. Fire Google Ads/GA4 conversion event
    gtag('event', 'conversion_event_submit_lead_form', {
      // add event parameters here
      'event_callback': function() {},
      'event_timeout': 2000
    });
  });
});
