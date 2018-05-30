Animation.Transition = class Transition extends Animation {
  constructor(subject, values, options) {
    super(options)

    this.subject = subject
    this.values = values

    Object.defineProperty(this, 'method', {
      value: progress => {
        for(var property in this.values) {
          this.subject[property] = this.transition(this.origin[property], this.target[property])
        }
      },
      writable: false
    })
  }

  start() {
    this.origin = {}
    for(var property in this.values) this.origin[property] = this.subject[property] || 0
    super.start()
  }

  static animate() {
    (new this(...arguments)).start()
  }
}
