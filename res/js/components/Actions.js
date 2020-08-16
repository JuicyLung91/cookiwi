import { SetupCookie, closeWrapper } from "./InitCookie";
import { Settings } from "./Settings";
import { CookieConsent } from "../modules/CookieConsent";


const ToggleOptions = function () {
    [...SetupCookie.domElement].forEach(element => {
        element.querySelector('.cookieConsent__setup').classList.toggle('is-open');
        element.querySelector('.cookieConsentSettings').classList.toggle('is-open');
    });
}


const AcceptAllCookies = function() {
    let Cookie =  new CookieConsent();
    let consents = Cookie.getConsents();
    for (const consentKey in consents) {
        if (!consents.hasOwnProperty(consentKey)) {
            continue;
        }
        Cookie.addConsent(consentKey);
    }
    Cookie.status = true;
    Cookie.saveCookieStatus();
    Cookie.saveCookieConsent();
    Cookie.afterConsent();
    closeWrapper();
}

const RevokeAllCookies = function() {
    let Cookie =  new CookieConsent();
    let consents = Cookie.getConsents();
    for (const consentKey in consents) {
        if (!consents.hasOwnProperty(consentKey)) {
            continue;
        }
        Cookie.removeConsent(consentKey);
    }
    Cookie.status = false;
    Cookie.saveCookieStatus();
    Cookie.saveCookieConsent();
    Cookie.afterConsent();
    closeWrapper();
}

const ToggleConsent = function(consentKey) {
    let Cookie =  new CookieConsent();
    Cookie.toggleConsent(consentKey);
}

const SaveSettings = function() {
    let Cookie =  new CookieConsent();
    Cookie.status = true;
    Cookie.saveCookieStatus();
    Cookie.saveCookieConsent();
    Cookie.afterConsent();
    closeWrapper();
}


export { ToggleOptions, AcceptAllCookies, RevokeAllCookies, SaveSettings, ToggleConsent };