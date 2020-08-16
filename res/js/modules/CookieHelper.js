import { Settings } from "../components/Settings";
import VirtualDom from "./VirtualDom";

/**
 * defines Helper function 
 * i.e. show consents in dom outisde of the banner 
 */
export default class CookieHelper {
    constructor(CookieConsent) {
        this.CookieConsent = CookieConsent;
    }

    /**
     * @description print the setttings area for a secific selector
     * @param {string} selector 
     */
    printSettings(selector) {
        let SettingsCopy = Object.assign(Settings, {});
        let SettingsInContent = new VirtualDom({
            el: selector,
            template: SettingsCopy.template,
            methods: SettingsCopy.methods
        })
        SettingsInContent.data = {
            destination: 'content'
        };
        
    }

    addConsentOnClick(selector) {
        let allowConsent = document.querySelectorAll(selector);
        allowConsent.forEach(btn => {
            let consent = btn.getAttribute('data-cookiename');
            
            if (!consent) {
                return;
            }
            btn.addEventListener('click', () => {
                this.CookieConsent.addConsent(consent);
                this.CookieConsent.saveCookieStatus();
                this.CookieConsent.saveCookieConsent();
                this.CookieConsent.onAddConsentOnClick(consent, btn);
            });
        });
    }

    // printToggleButton(consent, elementname = 'div', classes = ['button']) {
    //     if (!consent) {
    //         return false;
    //     }
    // }
}