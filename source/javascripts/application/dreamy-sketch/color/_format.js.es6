Application.DreamySketch.Color.Format = class Format extends Component {
  constructor(color) {
    super();

    this.color = color;
  }

  get value() {
    return '';
  }

  set value(v) {

  }

  static match(string, callback) {
    var match = null;
    string = (string + '').trim();

    (Array.isArray(this.pattern) ? this.pattern : [this.pattern]).forEach(pattern => {
      var match = string.match(pattern);

      if(match !== null) {
        if(typeof callback === 'function') callback.apply(this, Array.prototype.slice.call(match));
        return false;
      }
    });

    if(match === null) {
      if(typeof callback === 'function') callback.apply(this);
      return false;
    }
    else return true;
  }

  static get pattern() {
    return /.*/;
  }

  static matching(string) {
    var found = null;

    this.components.forEach(component => {
      if(component.match(string)) {
        found = component;
        return false;
      }
    });

    return found;
  }

  static set(color, string) {
    (new this(color)).value = string;
  }
}
