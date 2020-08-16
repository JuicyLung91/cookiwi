import VirtualDom from '../modules/VirtualDom';
import DefaultContent from '../modules/DefaultContent';
import {Settings} from './Settings';
import { CookieConsent } from '../modules/CookieConsent';
import { ToggleOptions, AcceptAllCookies, RevokeAllCookies } from './Actions';
import { CreateStyles } from './Styles';


const wrapper = document.createElement('div');
wrapper.id = 'CookieConsent';
/**
 * add basic template
 */
const SetupCookie = new VirtualDom({
    el: '#CookieConsent',
    stopBeforeCreate: true,
    template: (data) => {
        let textContent = new DefaultContent().getContent(); 
        let template = `
        <div class="cookieConsent__inner">
            <div class="cookieConsent__content">
                <div class="cookieConsent__setup is-open">
                    <h3 class="cookieConsent__headline">${textContent.headlineSetup}</h3>
                    <p>${textContent.message}</p>
                    <div class="cookieConsent__setupActions">
                        <div class="cookieConsent__setupActionsPrimary">
                            <div class="cookieConsent__button cookieConsent__button--primary" on-click="AcceptAllCookies">${textContent.allow}</div>
                            <div class="cookieConsent__button cookieConsent__button--secondary" on-click="ToggleOptions">${textContent.optionsOpen}</div>
                        </div>
                        <div class="cookieConsent__setupActionsSecondary">
                            <div class="cookieConsent__link cookieConsent__dismiss" on-click="RevokeAllCookies">${textContent.dismiss}</div>
                            <span class="cookieConsent__spacer"> | </span> 
                            <a href="${textContent.imprintLink}" class="cookieConsent__link cookieConsent__link--passivLink">${textContent.imprintText}</a> 
                        </div>
                    </div>
                </div>
                <div class="cookieConsentSettings">
                    <Settings></Settings>
                </div>
            </div>
        </div>
        `;
        return template;
    },
    methods: {
        ToggleOptions,
        AcceptAllCookies,
        RevokeAllCookies,
    },
    components: {
        Settings
    }
});

const InitCookie = function () {

    appendWrapperToBody();

    const CookieInstance = new CookieConsent();
    /** add consents to Settings Component */
    Settings.data = CookieInstance.getConsents();
    
    CreateStyles();
    
    CookieInstance.Helper.printSettings('.CookieConsentShowSettings');
    CookieInstance.Helper.addConsentOnClick('.addConsent');
    
    /** Cookiestaus is not set yet */
    if (!CookieInstance.hasConsent() && CookieInstance.onPopupOpen(wrapper)) {
        openWrapper();
    }
    SetupCookie.render();
}

/**
 * add modalbox to body
 */
const appendWrapperToBody = function () {
    document.querySelector('body').appendChild(wrapper);
}

const openWrapper = function () {
    wrapper.classList.add('is-open');
}

const closeWrapper = function () {
    wrapper.classList.remove('is-open');
}

export { InitCookie, SetupCookie, closeWrapper, openWrapper }