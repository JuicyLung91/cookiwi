#### Basic example
The `cookiwi` property is globaly connected to the window property.


```JavaScript
    let cookie = {
        consents: {
            allgemein: {
                name: "Grundlegende Cookies",
                info: "Die grundlegenden Funktionen sind wichtig für eine einwandfreie Darstellung der Webseite. Diese Funktionen können nicht abgelehnt werden.",
                showSwitch: false
            }
        }
    };
    window.cookiwi.init(cookie); //initialise the cookiebanner
```

You can cuustomize the text strings by adding a `content` object to the `cookie` object. 
You can also customize the colors by adding a `palette` object. 

#### Full example

```JavaScript
    let cookie = {
        consents: {
            youtube: {
                name: 'Youtube', //the name of the consent
                info: 'We use youtube', //the description text
                showSwitch: true, //show a switch to let the user disable this group
                cookieName: 'youtube', //if consent is given the cookie banner will set a cookie with this name and gib this a status of allow or dismiss
                onInit: (status) => {
                    console.log('init youtube');
                },
                onAllow: () => {
                    console.log('allow youtube');
                },
                onRevoke: () => {
                    console.log('revoke youtube');
                }
            },
            gmaps: {
                name: 'Google Maps',
                info: 'We use Google Maps',
                showSwitch: true,
                cookieName: 'gmaps'
            },
            basic: {
                name: "Basic Cookies",
                info: "Info about basic cookies.",
                showSwitch: false //basic cookie can not be disabled
            }
        },
        palette: {
            popup: {
                background: "rgba(120, 120, 120, 0.7)",
                text: "#787878"
            },
            button: {
                background: "#de3f0e",
                text: "#ffffff"
            },
        },
        content: {
            message: 'We use cookies to ensure a best experience for the webpage learn more in our <a href="/data-privacy">Data Privacy</a>',
            link: "Data Privacy.",
            href: "/data-privacy",
            imprintLink: "/imprint",
            allow: "Allow",
            dismiss: "Revoke",
            optionsOpen: "Change options"
        },
    }
    window.cookiwi.init(cookie);

```


### Content object ###
Following text strings can be changed

```JavaScript
let content = {
    headlineSetup: 'We use cookies',
    headlineSettings: 'Data Privacy Options',
    message: 'We use cookies. Learn more about our <a href="/data-privacy">Data privacy</a>',
    messageSettings: 'Here you will find an overview of all cookies used. You can agree or refuse',
    imprintLink: '/imprint',
    imprintText: 'Imprint',
    privacyLink: '/data-privacy',
    privacyText: 'Data privacy',
    allow: "Allow cookies",
    allowAll: "Allow all",
    dismiss: "Refuse",
    optionsOpen: "Open settings",
    goBack: 'Back',
    saveConsents: 'Save settings',
    settingOn: 'On',
    settingOff: 'Off'
};

```
With the links for the imprint and for the privacy policy, it is important that the links are relative and are exactly the same as the link. It should not cause any redirection, because on these pages the cookie banner is turned off - the paths are matched when the link is called and they must be identical.



### Palette object ###

Following colors can be changed

```JavaScript

let palette = {
    typo: {
        color: '#2b2b2b'
    },
    popup: {
        background: "rgba(120, 120, 120, 0.7)",
    },
    headline: {
        "font-size": '22px',
        "font-weight": 'bold',
        color: '#2b2b2b',
    },
    settingsHeadline: {
        "font-size": '18px',
        "font-weight": 'normal',
        color: '#2b2b2b',
    },
    button: {
        background: "#de3f0e",
        color: '#808285'
    },
    secondaryButton: {
        background: '#e6e6e6',
        color: '#525252'
    },
    passivLink: {
        color: '#616161'
    },
    switchOn: {
        background: "#de3f0e",
        toggle: '#fff',
    },
    switchOff: {
        background: "#bdc1c8",
        toggle: '#fff',
    },
    setting: {
        border: '0',
        padding: '0.5rem',
        background: '#f7f7f7'
    }
};

```


### Matomo ###
Example to delay a matomo instance until the cookie banner allows the tracking.
For a delay inside matomo it is important to use the following function: `_paq.push(['requireConsent']);`

###### Beispiel:
```JavaScript
var _paq = _paq || [];
_paq.push(['requireConsent']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
    var u="//your-domain.com/piwik/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 1]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();
```

Now you can initilise or revoke the matomo tracking on inside a matomo consent. Every cookiwi conset comes with 3 states `onAllow:`, `onRevoke:` und `onInit:`. 

###### Example:

```JavaScript
var consents = {
    matomo: {
        name: 'Matomo',
        info: 'We use matomo for tracking',
        showSwitch: true,
        cookieName: 'matomo',
        onAllow: function() {
            _paq.push(['rememberConsentGiven']);
            _paq.push(['setConsentGiven']);
        },
        onRevoke: function() {
             _paq.push(['forgetConsentGiven']);
        },
        onInit: function(consent) {
            if (consent) {
                _paq.push(['rememberConsentGiven']);
                _paq.push(['setConsentGiven']); //start tracking
            }
            if (!consent) {
                _paq.push(['forgetConsentGiven']); //dont track because no consent is given
            }
        }
    }
};
```


### Lifecycle ###
You can call the following lifecylcle states.

`window.cookiwi.onInitialise = function(status, consents) {}`

```JavaScript
    /**
     * @description gets called when the instances is loaded
     * @param {string, boolean} status Can be allow or dismiss or can be false if not set yet
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
     * @description gets called every time a consent is toggled - it is not saved at this time
     * @param {*} el the toggle dom element 
     * @param {*} consent the consent key
     */
    onToggleConsent(el, consent) {

    }

    /**
     * gets called when a consent is given inside the content - i.e. click on elements with class addConsent
     */
    onAddConsentOnClick (consentName, el) {

    }

    /**
     * gets called after the the cookie is saved
     */
    afterConsent(status, consents) {
        
    }
```

### Output the settings  ###
With the following html code you can display the cookie settings directly in the content of a page. 
```html
    <div class="CookieConsentShowSettings"></div>
```


### Ausgabe eines direkten aktivierung Buttons ###

With the following html code you can directly replace a button in the content area which can activate a certain consent:

```html
    <button class="addConsent" data-cookiename="gmaps">Allow Google Maps</button>
```