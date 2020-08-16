let instance;
export default class DefaultContent {

    constructor() {
        if (instance){
            return instance;
        }
        this.content = {
            headlineSetup: 'Wir verwenden Cookies',
            headlineSettings: 'Datenschutzeinstellungen',
            message: 'Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu. Weitere Informationen zu Cookies erhalten Sie in unserer <a href="/datenschutzerklaerung">Datenschutzerklärung</a>',
            messageSettings: 'Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Zustimmung zu ganzen Kategorien geben oder sich weitere Informationen anzeigen lassen und so nur bestimmte Cookies auswählen.',
            imprintLink: '/impressum',
            imprintText: 'Impressum',
            privacyLink: '/datenschutzerklaerung',
            privacyText: 'Datenschutzerklärung',
            allow: "Cookies Akzeptieren",
            allowAll: "Alle Akzeptieren",
            dismiss: "Ablehnen",
            optionsOpen: "Einstellungen ändern",
            goBack: 'Zurück',
            saveConsents: 'Speichern',
            settingOn: 'An',
            settingOff: 'Aus'
        }
        instance = this;
    }

    /**
     * @description combine default properties with new ones
     * @param {object} newContent 
     */
    combineContent(newContent) {
        for (const item in newContent) {
            if (newContent.hasOwnProperty(item)) {
                this.content[item] = newContent[item];
            }
        }
        return this.content;
    }
    getContent() {
        return this.content;
    }
} 
