Component.Number = class Number extends Component {
  constructor(value) {
    super();

    this.value = arguments.length === 0 ? this.constructor.default : value;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = typeof v === 'number' ? this.constructor.filter(v) : this.constructor.cast(v);

    if(isNaN(this._value)) this._value = this.constructor.default;
    else if(this._value < this.constructor.minimum) this._value = this.constructor.minimum;
    else if(this._value > this.constructor.maximum) this._value = this.constructor.maximum;
  }

  static cast(value) {
    return parseFloat(value, 10);
  }

  static filter(value) {
    return value;
  }

  static get minimum() {
    return -Infinity;
  }

  static get maximum() {
    return Infinity;
  }

  static get default() {
    return 0;
  }
}
