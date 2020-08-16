let instance;
export default class DefaultPalette {

    constructor() {
        if (instance){
            return instance;
        }
        this.palette = {
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
        }
        instance = this;
    }

    /**
     * @description combine default properties with new ones
     * @param {object} newPalette 
     */
    combinePalettes(newPalette) {
        for (const item in newPalette) {
            if (newPalette.hasOwnProperty(item)) {
                this.palette[item] = newPalette[item];
            }
        }
        return this.palette;
    }
    getPalette() {
        return this.palette;
    }
} 
