Application.DreamySketch = class DreamySketch extends Component {
  constructor(element) {
    super();

    console.log(element);

    this.element = element;
    this.canvas = new this.constructor.Canvas(this.element.querySelector('#canvas'));
    this.touches = new this.constructor.Touch.List();
    this.brush = new Application.DreamySketch.Brush.Pen();

    var draw = () => {
      if(this.drawing) {
        this.draw();
        window.requestAnimationFrame(draw);
      }
      else window.cancelAnimationFrame(draw);
    };

    var updateFromMouseEvent = event => {
      event.preventDefault();
      this.touches.updateFromMouseEvent(event)
    };

    var updateFromTouchEvent = event => {
      event.preventDefault();
      this.touches.updateFromTouchEvent(event)
    };

    this.mousedown = event => {
      updateFromMouseEvent(event);
      window.addEventListener('mousemove', updateFromMouseEvent);
      draw();
    };

    this.mouseup = () => {
      this.touches.clear();
      window.removeEventListener('mousemove', updateFromMouseEvent);
    };

    this.touchstart = event => {
      updateFromTouchEvent(event);
      window.addEventListener('touchmove', updateFromTouchEvent);
      draw();
    };

    this.touchend = event => {
      this.touches.updateFromTouchEvent(event);
      if(!this.drawing) window.removeEventListener('touchmove', updateFromTouchEvent);
    };
  }

  get drawing() {
    return this.touches.any;
  }

  get enabled() {
    return this._enabled
  }

  set enabled(v) {
    v = !!v
    if(v !== this._enabled) {
      this._enabled = v
      var method = (v ? 'add' : 'remove') + 'EventListener'
      this.canvas.element[method]('mousedown', this.mousedown);
      window[method]('mouseup', this.mouseup);
      this.canvas.element[method]('touchstart', this.touchstart);
      this.canvas.element[method]('touchend', this.touchend);
    }
  }

  enable() {
    this.enabled = true

    return this
  }

  disable() {
    this.enabled = false

    return this
  }

  enable() {
    this.canvas.element.addEventListener('mousedown', this.mousedown);
    window.addEventListener('mouseup', this.mouseup);
    this.canvas.element.addEventListener('touchstart', this.touchstart);
    this.canvas.element.addEventListener('touchend', this.touchend);
  }

  disable() {
    this.canvas.element.removeEventListener('mousedown', this.mousedown);
    window.removeEventListener('mouseup', this.mouseup);
    this.canvas.element.removeEventListener('touchstart', this.touchstart);
    this.canvas.element.removeEventListener('touchend', this.touchend);
    this.touches.clear();
  }

  draw() {
    this.brush.shapes(this.touches).draw(this.canvas);
  }

  static init() {
    super.init();
  }
}
