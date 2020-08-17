import DefaultPalette from "./DefaultPalette";
import DefaultContent from "./DefaultContent";
import { InitCookie } from "../components/InitCookie";
import CookieLifesycle from "./CookieLifecycle";
import CookieHelper from "./CookieHelper";


let CookieInstance;

let CookieStatusName = 'cookieconsent_status';
let CookieStatusBowl = [
    'dismiss',
    'allow'
];
let CookieConsentName = 'cookieconsent_custom_cookies';


class CookieConsent extends CookieLifesycle {
    /**
     * 
     * @param {object} arguments with properties for consents, palette, content 
     */
    constructor() {
        super();
        if (CookieInstance) {
            return CookieInstance;
        }
        this.Helper = new CookieHelper(this);

        CookieInstance = this;
    }

    init({consents, palette, content}) {
        this.consents = consents ?? console.error('Du benötigst mindestens einen "Consent"!');
        this.palette = new DefaultPalette().combinePalettes(palette ?? {});
        this.content = new DefaultContent().combineContent(content ?? {});
        
        this.checkStatus();

        /**
         * runs through consents and call onInit function
         */
        for (const key in this.consents) {
            if (this.consents.hasOwnProperty(this.consents)) {
                const consent = object[key];
                if (consent.hasOwnProperty('onInit') && consent.status) {
                    consent.onInit(consent.status ?? false);
                }
                
            }
        }
        
        CookieInstance = this; //for singleton

        InitCookie();
        this.onInitialise(this.status, this.consents);
    }

    /**
     * @description loads consents and creates initialise this.consentStatus && this.consents && this.consentStatus
     */
    checkStatus() {
        this.consentStatus = {};
        let statusCookie = this.getCookie(CookieStatusName);

        let consentCookie = this.getCookie(CookieConsentName) ? JSON.parse(this.getCookie(CookieConsentName)) : false;
        this.status = statusCookie && statusCookie != '' ? statusCookie : false;
        for (const consentKey in this.consents) {
            if (!this.consents.hasOwnProperty(consentKey)) {
                continue;
            }
            const consent = this.consents[consentKey];
            const cookieName = consent.cookieName;
            if (!cookieName) {
                continue;
            }
            /** create a status only for consent */
            let status = false;
            if (cookieName && consentCookie && consentCookie[cookieName]) {
                status = consentCookie[cookieName];
            }
            /** when Status Cookie is false then the cookie banner is init for first time so every consent status should be false */
            if (!this.status) {
                status = true;
            }
            this.consents[consentKey].status = status; //overall object for every consent
            this.consentStatus[consentKey] = status; //object for cookies
        }
    }

    /**
     * @description get all consents with specific consent or specific single one by key name
     * @param {string} name key of specific consent
     */
    getConsents(name) {
        if (name) {
            return this.consents[name] ?? false;
        }
        return this.consents;
    }

    /**
     * @description removes one single consent
     * @param {string} consentName 
     */
    removeConsent(consentName) {
        this.consents[consentName].status = false;
        this.consentStatus[consentName] = false;
    }
    /**
     * @description adds one single consent
     * @param {string} consentName 
     */
    addConsent(consentName) {
        this.consentStatus[consentName] = true;
        this.consents[consentName].status = true;
    }

    /**
     * checks if both cookies are set
     * if user has already given consent in the previous days 
     */
    hasConsent() {
        return this.getCookie(CookieStatusName) && this.getCookie(CookieConsentName);
    }

    /**
     * @description toggles the status for one single consent
     * @param {string} consentName 
     */
    toggleConsent(consentName) {
        if (this.consentStatus[consentName]) {
            this.removeConsent(consentName);
        } else {
            this.addConsent(consentName)
        }
    }

    /**
     * saves the status of the consents
     */
    saveCookieConsent () {
        for (const consentKey in this.consents) {
            const consent = this.consents[consentKey];
            if (consent.hasOwnProperty('onAllow') && consent.status) {
                consent.onAllow();
            }
            if (consent.hasOwnProperty('onRevoke') && !consent.status) {
                consent.onRevoke();
            }
        }
        let cookieValue = JSON.stringify(this.consentStatus);
        this.addCookie(CookieConsentName, cookieValue);
    }

    /**
     * saves the status of the cookie banner
     */
    saveCookieStatus () {
        let statusName = this.status ? CookieStatusBowl[1] : CookieStatusBowl[0];
        this.onStatusChange(this.status);
        if (!this.status) {
            this.onRevokeChoice();
        }
        this.addCookie(CookieStatusName, statusName);
    }


    /**
     * 
     * @param {string} cookieName 
     * @param {JSON String} cookieValue 
     */
    addCookie(cookieName, cookieValue) {
        const path = '/';
        const days = 30;
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = cookieName + '=' + cookieValue + '; expires=' + expires + '; path=' + path;
    }

    /**
     * 
     * @param {string} cookieName 
     */
    getCookie(cookieName) {
        const cookie = document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=')
            return parts[0] === cookieName ? decodeURIComponent(parts[1]) : r
        }, '');
        return cookie && cookie != '' ? cookie : false;
    }
}


export {CookieInstance, CookieConsent};