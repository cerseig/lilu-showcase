Application.DreamySketch.Color = class Color extends Component {
  constructor(...components) {
    super();

    this.components = {
      red: new this.constructor.Component.Rgb(),
      green: new this.constructor.Component.Rgb(),
      blue: new this.constructor.Component.Rgb(),
      alpha: new this.constructor.Component.Alpha()
    };

    this.formats = {
      rgb: new this.constructor.Format.Rgb(this),
      rgba: new this.constructor.Format.Rgba(this),
      hexadecimal: new this.constructor.Format.Hexadecimal(this)
    };

    this.set(...components);
  }

  get red() {
    return this.components.red.value;
  }

  set red(v) {
    return this.components.red.value = v;
  }

  get green() {
    return this.components.green.value;
  }

  set green(v) {
    return this.components.green.value = v;
  }

  get blue() {
    return this.components.blue.value;
  }

  set blue(v) {
    return this.components.blue.value = v;
  }

  get alpha() {
    return this.components.alpha.value;
  }

  set alpha(v) {
    return this.components.alpha.value = v;
  }

  get r() {
    return this.red;
  }

  set r(v) {
    this.red = v;
  }

  get g() {
    return this.green;
  }

  set g(v) {
    this.green = v;
  }

  get b() {
    return this.blue;
  }

  set b(v) {
    this.blue = v;
  }

  get a() {
    return this.alpha;
  }

  set a(v) {
    this.alpha = v;
  }

  get rgb() {
    return this.formats.rgb.value;
  }

  set rgb(v) {
    return this.formats.rgb.value = v;
  }

  get rgba() {
    return this.formats.rgba.value;
  }

  set rgba(v) {
    return this.formats.rgba.value = v;
  }

  get hexadecimal() {
    return this.formats.hexadecimal.value;
  }

  set hexadecimal(v) {
    return this.formats.hexadecimal.value = v;
  }

  get hex() {
    return this.hexadecimal;
  }

  set hex(v) {
    return this.hexadecimal = v;
  }

  get string() {
    return this.rgba;
  }

  set string(v) {
    var format = this.Format.matching(v);

    if(format) format.set(this, v);
    else this.clear();
  }

  get clone() {
    return new this.constructor(this.r, this.g, this.b, this.a);
  }

  get reverted() {
    return this.clone.revert();
  }

  get inverted() {
    return this.clone.invert();
  }

  get squared() {
    return this.clone.square();
  }

  get transparented() {
    return this.clone.transparent()
  }

  each(callback, alpha) {
    for(var component in this.components) {
      if((component !== 'alpha' || alpha === true) && callback.call(this, component, this[component]) === false) break;
    }

    return this;
  }

  map(callback, alpha) {
    return this.each((component, value) => { this[component] = callback.call(this, component, value) }, alpha);
  }

  set(...components) {
    this.constructor.each(components, (component, value) => this[component] = value);
    return this;
  }

  add(...components) {
    this.constructor.each(components, (component, value) => this[component] += value);
    return this;
  }

  substract(...components) {
    this.constructor.each(components, (component, value) => this[component] -= value);
    return this;
  }

  multiply(...components) {
    this.constructor.each(components, (component, value) => this[component] *= value);
    return this;
  }

  divide(...components) {
    this.constructor.each(components, (component, value) => this[component] /= value);
    return this;
  }

  pow(...components) {
    this.constructor.each(components, (component, value) => this[component] = Math.pow(this[component], value));
    return this;
  }

  square() {
    return this.pow(2, 2, 2);
  }

  reverse() {
    return this.map((component, value) => 255 - value);
  }

  invert() {
    return this.map((component, value) => value === 0 ? 0 : 1/value);
  }

  transparent() {
    return this.set({alpha: 0})
  }

  clear() {
    return this.set(0, 0, 0, 1);
  }

  static each(components, callback) {
    if(typeof components[0] === 'object' && components[0] !== null && !Array.isArray(components)) {
      ['r', 'g', 'b', 'a', 'red', 'green', 'blue', 'alpha', 'rgb', 'rgba', 'hex', 'hexadecimal'].forEach(component => {
        if(components[component] !== undefined) callback.call(this, component, components[component]);
      });
    }
    else {
      ['r', 'g', 'b', 'a'].forEach((component, index) => {
        if(index < components.length) callback.call(this, component, components[index]);
      });
    }
  }

  static get black() {
    return new this();
  }

  static get white() {
    return new this(255, 255, 255);
  }

  static get red() {
    return new this(255);
  }

  static get green() {
    return new this(0, 255);
  }

  static get blue() {
    return new this(0, 0, 255);
  }

  static get cyan() {
    return new this(0, 255, 255);
  }

  static get magenta() {
    return new this(255, 0, 255);
  }

  static get yellow() {
    return new this(255, 255);
  }
}
