Application.DreamySketch.Vector = class Vector {
  constructor(x, y) {
    this.coordinates = {
      x: new this.constructor.Coordinate(),
      y: new this.constructor.Coordinate()
    };

    if(arguments.length !== 0) this.set(x, y);
  }

  get x() {
    return this.coordinates.x.value;
  }

  set x(v) {
    this.coordinates.x.value = v;
  }

  get y() {
    return this.coordinates.y.value;
  }

  set y(v) {
    this.coordinates.y.value = v;
  }

  get opposite() {
    return this.multiply(-1, -1);
  }

  get inverse() {
    return new Vector(1/this.x, 1/this.y);
  }

  get double() {
    return this.multiply({x: 2, y: 2})
  }

  get horizontal() {
    return this.multiply(1, 0);
  }

  get vertical() {
    return this.multiply(0, 1);
  }

  get average() {
    return this.sum/2
  }

  get sum() {
    return this.x + this.y;
  }

  get abs() {
    return new this.constructor(Math.abs(this.x), Math.abs(this.y));
  }

  get clone() {
    return new this.constructor(this.x, this.y);
  }

  get noises() {
    if(!Array.isArray(this._noises)) this._noises = (new Array(2)).fill(null).map(() => new Application.DreamySketch.Noise());
    return this._noises;
  }

  set noises(v) {
    this._noises = v;
  }

  delta() {
    return this.substract(...arguments).abs;
  }

  distance() {
    var delta = this.delta(...arguments);
    return Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
  }

  add() {
    var delta = this.constructor.from(...arguments);
    return new this.constructor(this.x + delta.x, this.y + delta.y);
  }

  substract(vector) {
    return this.add(this.constructor.from(vector).opposite);
  }

  multiply() {
    var factor = this.constructor.from(...arguments);
    return new this.constructor(this.x*factor.x, this.y*factor.y);
  }

  divide() {
    return this.multiply(this.constructor.from(...arguments).inverse)
  }

  noise(factor, offset, minimum, maximum) {
    var vector = this.add(new this.constructor(
      this.noises[0].bound(minimum, maximum).time(factor, offset),
      this.noises[1].bound(minimum, maximum).time(factor, offset)
    ));

    vector.noises = this.noises;

    return vector;
  }

  set(x, y) {
    if(typeof x === 'object' && x !== null) {
      var vector = x;
      this.set(vector.x, vector.y);
    }
    else {
      this.x = x;
      this.y = y;
    }
  }

  static from(vector) {
    return vector instanceof this ? vector : new this(...arguments);
  }
}
