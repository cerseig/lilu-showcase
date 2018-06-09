Application.DreamySketch = class DreamySketch extends Component {
  constructor(element) {
    super();

    console.log(element);

    this.element = element;
    this.canvas = new this.constructor.Canvas(this.element.querySelector('.landing__canvas'));
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


    this.canvas.element.addEventListener('mousedown', event => {
      updateFromMouseEvent(event);
      window.addEventListener('mousemove', updateFromMouseEvent);
      draw();
    });

    this.canvas.element.addEventListener('touchstart', event => {
      updateFromTouchEvent(event);
      window.addEventListener('touchmove', updateFromTouchEvent);
      draw();
    });

    window.addEventListener('mouseup', () => {
      this.touches.clear()
      window.removeEventListener('mousemove', updateFromMouseEvent);
    });

    this.canvas.element.addEventListener('touchend', event => {
      this.touches.updateFromTouchEvent(event)
      if(!this.drawing) window.removeEventListener('touchmove', updateFromTouchEvent);
    });
  }

  draw() {
    this.brush.shapes(this.touches).draw(this.canvas.context);
  }

  get drawing() {
    return this.touches.any;
  }

  static init() {
    super.init();
    this.singleton = new this(document.querySelector('.dreamy-sketch'));
    return this.singleton;
  }
}
