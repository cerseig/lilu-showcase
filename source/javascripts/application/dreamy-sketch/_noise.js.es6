Application.DreamySketch.Noise = class Noise extends Component {
  constructor(minimum, maximum) {
    super();

    this.simplex = new SimplexNoise();
    this.bound(minimum, maximum);
  }

  get delta() {
    return Math.abs(this.maximum - this.minimum);
  }

  bound(minimum, maximum) {
    this.minimum = typeof minimum === 'number' ? minimum : -1;
    this.maximum = typeof maximum === 'number' ? maximum : 1;

    return this;
  }

  value(...values) {
    if(values.length < 2) values = values.length == 0 ? [0, 0] : [values[0], values[0]];
    else if(values.length > 4) values = values.slice(0, 4);
    return (this.simplex['noise' + values.length + 'D'](...values) + 1)*0.5*this.delta + this.minimum;
  }

  time(factor, offset) {
    return this.value(Date.now()*(factor || 1) + (offset || 0));
  }
}
