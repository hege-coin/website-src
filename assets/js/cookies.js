//
// COOKIE CONSENT
//

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Consent when user accepts all cookies (we only use analytics atm)
const ACCEPT_CONSENT = {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'granted',
};

// Consent when user rejects cookies, or has not yet made a choice
const REJECT_CONSENT = {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
};

const DEFAULT_CONSENT = REJECT_CONSENT

const DEBUG = false;
function debug_log() {
  DEBUG && console.log(arguments);
}

/** Returns user settings from storage, or null if not set. */
function loadConsentSettings(storage = localStorage) {
  consent = JSON.parse(storage.getItem('consent'));
  debug_log('Loaded consent...', consent);
  return consent;
}

/** Saves user settings to storage. */
function saveConsentSettings(consent, storage = localStorage) {
  debug_log('Saving consent...', consent);
  storage.setItem('consent', JSON.stringify(consent));
}

/** Sets consent with gtag. Op should be either 'default' or 'update'. */
function setConsent(consent, op) {
  debug_log('Setting consent with gtag...', consent, op);
  gtag('consent', op, consent);
  document.dispatchEvent(new CustomEvent("consentChanged", { detail: consent }));
}

// Set defaults based on user preference, before loading Google Analytics
gtag('consent', 'default', DEFAULT_CONSENT);

// Did user already make a selection in the past?
settings = loadConsentSettings();
if (settings) {
  // Yes: Set it accordingly
  debug_log('Cookie settings found:', settings);
  setConsent(settings, 'update');
}

document.addEventListener('DOMContentLoaded', function () {
  const dialog = document.getElementById('cookie-consent-dialog');
  if (!dialog) {
    console.error('Cookie consent dialog not found.');
    return false;
  }
  const accept_button = document.getElementById('accept-cookies-btn');
  const reject_button = document.getElementById('reject-cookies-btn');

  accept_button.addEventListener('click', function () {
    debug_log('Handling accept...')
    saveConsentSettings(ACCEPT_CONSENT);
    setConsent(ACCEPT_CONSENT, 'update');
  });
  reject_button.addEventListener('click', function () {
    debug_log('Handling reject...')
    saveConsentSettings(REJECT_CONSENT);
    setConsent(REJECT_CONSENT, 'update');
  });

  // Has user not yet made their selection? Show the banner if so.
  // Note that this can be disabled by setting data-disable_cookie_banner="false" on <body>
  if (!loadConsentSettings() && !document.body.dataset.disable_cookie_banner) {
    debug_log('User has not set cookie settings yet. Showing dialog...');
    dialog.show();
  }
});
