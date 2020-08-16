export default class VirtualDom {
    constructor(args) {
      this.el =  args.el ? args.el : console.error('Need a selector to bind. Pass "el" to the construtor.');
      this.template = args.template ? args.template : console.error('Need to get a template');
      // property for the setter and getter of data 
      this.apiData = args.data ? args.data : {};
  
      //bidn methods
      this.methods = args.methods ? args.methods : {};
      
      // caching the el in the dom
      this.domElement = false;
      this.components = args.components ?? {};
  
      if (!args.stopBeforeCreate) {
        this.create();
      }
    }
    render() {
      let elements = document.querySelectorAll(this.el);
      if (!elements || elements.length == 0) {
        return;
      }
      [...elements].forEach(element => {

        /** render template */
        element.innerHTML = this.template(this.apiData).trim(); // read template and trim whitespace
        
        /* add on events */
        this.bindEventsForElement(element);
        /* create child components */
        this.renderChildComponents();
      });

      this.domElement = elements; 
      this.afterRender();
    }
  
    afterRender() {}
  
    set data(data) {
      if (!data) {
        console.error('Need Data.');
      }
  
      this.apiData = data;
      this.render();
    }
    get data() {
      return this.apiData;
    }

    /**
     * runs thorugh child components and calls the render function
     */
    renderChildComponents() {
        for (const component in this.components) {
            if (this.components.hasOwnProperty(component)) {
                const comp = this.components[component];
                comp.el = `${this.el} ${comp.el}`;
                comp.render();
            }
        }
    }

    /**
     * @description binds on- attributes as events iniside a specific dom element
     * @param {DOMElement} element 
     */
    bindEventsForElement(element) {
        if (element) {
          
            // reflow and repaint the dom
    
            /*
            *
            * bind inline events
            */
           //click 
            let clicks = element.querySelectorAll('[on-click]');
            [...clicks].forEach(element => {
              let functionName = element.getAttribute('on-click');
              element.addEventListener('click', (e) => {
                e.preventDefault();
                this.methods[functionName](e);
              })
            });
           //change 
            let change = element.querySelectorAll('input[on-change]');
            [...change].forEach(element => {
              let functionName = element.getAttribute('on-change');
              element.addEventListener('change', (e) => {
                e.preventDefault();
                this.methods[functionName](e);
              })
            });
            
    
            //submit
            let submit = element.querySelectorAll('[on-submit]');
            [...submit].forEach(element => {
              let functionName = element.getAttribute('on-submit');
              element.addEventListener('submit', (e) => {
                e.preventDefault();
                this.methods[functionName](e);
              })
            });
            
          } else {
            console.error('Element not found');
          }
    }
    create() {
      this.render();
    }
  }