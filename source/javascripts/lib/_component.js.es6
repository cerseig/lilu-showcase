//= require_self
//= require_tree ./component

class Component {
  static get components() {
    var components = [];

    for(var component in this) {
      if(this.hasOwnProperty(component) && this.hasComponent(component)) components.push(this[component]);
    }

    return components;
  }

  static hasComponent(component) {
    return (component + '').match(/^[A-Z]/) !== null;
  }

  static init() {
    this.components.forEach(component => {
      if(typeof component.init === 'function') component.init();
    });
  }
}
