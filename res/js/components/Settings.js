import VirtualDom from '../modules/VirtualDom';
import DefaultContent from '../modules/DefaultContent';
import { CookieConsent } from '../modules/CookieConsent';
import { ToggleOptions, ToggleConsent, SaveSettings, RevokeAllCookies, AcceptAllCookies } from './Actions';


const Settings = new VirtualDom({
    el: 'Settings',
    template: (data) => {
        const CookieInstance = new CookieConsent();
        let consents = CookieInstance.getConsents();
        let textContent = new DefaultContent().getContent(); 

        let template = ``;
        template += `<h3 class="cookieConsent__headline">${textContent.headlineSettings}</h3>`;
        template += `<p class="cookieConsentSettings__message">${textContent.messageSettings}</p>`
        template += `
        <div class="cookieConsentSettings__actions">
            <div class="cookieConsentSettings__actionsPrimary">
                <div class="cookieConsent__button cookieConsent__button--primary" on-click="AcceptAllCookies">${textContent.allowAll}</div>`;
            
            if (data.destination != 'content') { 
                template += `<div class="cookieConsent__button cookieConsent__button--secondary" on-click="ToggleOptions">${textContent.goBack}</div>`
            } else {
                template += `<div class="cookieConsent__button cookieConsent__button--secondary" on-click="SaveSettings">${textContent.saveConsents}</div>`
            }
            template += `
            </div>`;
        
        if (data.destination != 'content') {
            template += `
            <div class="cookieConsentSettings__actionsSecondary">
                <div class="cookieConsent__link" on-click="SaveSettings">${textContent.saveConsents}</div>
                <span class="cookieConsent__spacer"> | </span> 
                <div on-click="RevokeAllCookies" class="cookieConsent__link cookieConsent__dismiss cookieConsent__link--passivLink">${textContent.dismiss}</div>
            </div>`;
        }
        template += `
        </div>
        <div class="cookieConsentSettings__container">`;
        for (const consentKey in consents) {
            if (consents.hasOwnProperty(consentKey)) {
                let consent = consents[consentKey];
                template += `
                <div class="cookieConsentSetting">
                    <div class="cookieConsentSetting__inner">
                        <div class="cookieConsentSetting__header">
                            <h4 class="cookieConsentSetting__headline">${consent.name}</h4>`
                if (consent.showSwitch) {
                    template += `
                    <div class="cookieConsentSetting__toggle">
                        <label class="cookieConsentSetting__switch"><input on-change="toggleConsent" data-consentkey="${consentKey}" class="cookieConsentSetting--switchInput" type="checkbox" ${consent.status ? 'checked' : ''}><span class="cookieConsentSetting--slider"></span>
                        </label>
                    </div>`
                }

                template += `
                        </div>
                        <p class="cookieConsentSetting__content">${consent.info}</p>
                    </div>
                </div>`;
            }
        }
        template += `
        </div>
        <div class="cookieConsentSettings__imprint">
            <div class="cookieConsent__setupActionsSecondary">
                <a href="${textContent.privacyLink}" class="cookieConsent__link cookieConsent__link--passivLink">${textContent.privacyText}</a>
                <a href="${textContent.imprintLink}" class="cookieConsent__link cookieConsent__link--passivLink">${textContent.imprintText}</a> 
            </div>
        </div>`;
        return template;
    },
    methods: {
        AcceptAllCookies,
        ToggleOptions,
        SaveSettings,
        RevokeAllCookies,
        toggleConsent(e) {
            let key = e.target.getAttribute('data-consentkey');
            const CookieInstance = new CookieConsent();
            CookieInstance.onToggleConsent(e.target, CookieInstance.getConsents(key));
            ToggleConsent(key);
        }
    },
});



export { Settings };