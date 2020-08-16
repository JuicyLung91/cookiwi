/**
 * holds classes for the lifecycle
 */

import DefaultContent from "./DefaultContent";

export default class CookieLifesycle {

    /**
     * @description gets called when the instances is loaded
     * @param {string, boolean} status Can be allow or dismiss or can be fales if not set yet
     * @param {object} consents If status is true every consent becomes a status property
     */
    onInitialise(status, consents) {

    }

    /**
     * 
     * @param {*} newStatus 
     */
    onStatusChange(newStatus) {

    }

    /**
     * @description gets called when cookies a refused
     */
    onRevokeChoice() {

    }

    /**
     * @description gets called before the modalbox opens if it return false the popup will not be opened
     * @param {domEl} el the modal box
     */
    onPopupOpen(el) {

        /** add exception for imprintUrl and DataPrivacy url */
        let imprintLink = new DefaultContent().getContent().imprintLink;
        let dataPrivacyLink = new DefaultContent().getContent().privacyLink;
        let currentUrl = window.location.href;
        if (currentUrl == imprintLink || currentUrl == dataPrivacyLink) {
            return false;
        }
        return true;
    }

    /**
     * @description gets called every time a consent is toggled - it is not saved at this time
     * @param {*} el the toggle dom element 
     * @param {*} consent the consent key
     */
    onToggleConsent(el, consent) {

    }

    /**
     * gets called when a consent is given inside the content - i.e. click on elements with class addConsent
     * @param {string} consentName
     * @param {DOMElement} el
     */
    onAddConsentOnClick (consentName, el) {

    }

    /**
     * gets called after the the cookie is saved
     */
    afterConsent(status, consents) {
    }
}