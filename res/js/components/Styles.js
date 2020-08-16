import VirtualDom from '../modules/VirtualDom';
import DefaultPalette from '../modules/DefaultPalette';

import '../polyfill/append';

const CreateStyles = function () {

        /**
     * add styleTag to head
     */
    const styleTag = document.createElement('style');
    styleTag.id = 'CookieConsentStyles';
    document.querySelector('head').append(styleTag);



    const Styles = new VirtualDom({
    el: 'head style#CookieConsentStyles',
    template: (data) => {
        let Palette = new DefaultPalette().getPalette();
        let template = ``;
        template += `
        .cookieConsent__inner {
            color:  ${Palette.typo.color};
        }
        #CookieConsent {
            background-color: ${Palette.popup.background};
        }
        .cookieConsent__headline {
            color: ${Palette.headline.color};
            font-size: ${Palette.headline["font-size"]};
            font-weight: ${Palette.headline["font-weight"]};
        }
        .cookieConsentSetting__headline {
            color: ${Palette.settingsHeadline.color};
            font-size: ${Palette.settingsHeadline["font-size"]};
            font-weight: ${Palette.settingsHeadline["font-weight"]};
        }
        .cookieConsent__button--primary {
            background-color: ${Palette.button.background};
            color: ${Palette.button.color};
        }
        .cookieConsent__button--secondary {
            background-color: ${Palette.secondaryButton.background};
            color: ${Palette.secondaryButton.color};
        }
        .cookieConsent__link {
            color: ${Palette.passivLink.color};
        }
        .cookieConsentSetting--switchInput:checked + .cookieConsentSetting--slider {
            background-color: ${Palette.switchOn.background};
        }
        .cookieConsentSetting--switchInput:checked + .cookieConsentSetting--slider:before {
            background-color: ${Palette.switchOn.toggle};
        }
        .cookieConsentSetting--slider {
            background-color: ${Palette.switchOff.background};
        }
        .cookieConsentSetting--slider:before {
            background-color: ${Palette.switchOff.toggle};
        }
        
        `;
        return template;
        },
    });
    Styles.render();
}



export { CreateStyles };