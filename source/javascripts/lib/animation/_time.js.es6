Animation.Time = class Time {
  constructor(animation) {
    this.animation = animation
    this.reversed = false
  }

  get value() {
    return this._value
  }

  set value(v) {
    this._value = v < 0 ? 0 : (v > this.animation.duration ? this.animation.duration : v)
  }

  get current() {
    return Date.now() - this.beginning
  }

  get changed() {
    return this.delta > this.animation.milliSecondsPerFrame
  }

  get finished() {
    return this.value >= this.animation.duration
  }

  get reversed() {
    return this._reversed
  }

  set reversed(v) {
    v = !!v

    if(v !== this.reversed) {
      this._reversed = v
      if(this.reversed) this.compute = () => 1 - this.value/this.animation.duration
      else this.compute = () => this.value/this.animation.duration
    }
  }

  reverse() {
    this.reversed = !this.reversed
  }

  update() {
    this.delta = this.current - this.value

    if(this.changed) {
      this.value += this.delta
      this.progress = this.animation.ease(this.compute())

      return true
    }
    else return false
  }

  start() {
    this.stop()
    this.beginning = Date.now()
  }

  stop() {
    this.value = this.delta = this.beginning = this.progress = 0
  }
}

