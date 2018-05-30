//= require_self
//= require ./animation/_easing
//= require ./animation/_time

class Animation {
  constructor(options, method) {
    if(typeof options === 'function') method = options
    options = typeof options === 'object' && options !== null ? options : {}

    this.duration = options.duration || 1000
    this.easing   = options.easing
    this.started  = options.started
    this.stopped  = options.stopped
    this.loop     = !!options.loop
    this.reverse  = !!options.reverse
    this.finished = options.finished
    this.fps      = options.fps || 60
    this.method   = method
    this.time     = new this.constructor.Time(this)
    this.frame    = null

    Object.defineProperty(this, 'play', {
      value: () => {
        this.update()
        if(this.time.finished) {
          this.stop()
          if(this.reverse) this.time.reverse()
          if(this.reverse || this.loop) this.start()
          else if(typeof this.finished === 'function') this.finished()
        }
        else this.continue()
      },
      writable: false
    })
  }

  get fps() {
    return 1000/this.milliSecondsPerFrame
  }

  set fps(v) {
    this.milliSecondsPerFrame = 1000/v
  }

  get easing() {
    return this._easing
  }

  set easing(v) {
    this._easing = this.constructor.Easing.method(v)
    this.ease = this.constructor.Easing[this.easing]
  }

  get playing() {
    return this.frame !== null
  }

  transition(origin, target) {
    return origin + this.time.progress*(target - origin)
  }

  update() {
    if(this.time.update()) {
      this.method.call(this, this.time.progress)
      return true
    }
    else return false
  }

  start() {
    if(typeof this.started === 'function') this.started()
    this.time.start()
    this.play()
  }

  stop() {
    if(typeof this.stopped === 'function') this.stopped()
    this.pause()
    this.time.stop()
    this.frame === null
  }

  continue() {
    this.frame = window.requestAnimationFrame(this.play)
  }

  pause() {
    window.cancelAnimationFrame(this.frame)
  }

  static animate() {
    return (new this(...arguments)).start()
  }
}
