Application.DreamySketch.Canvas = class Canvas extends Component {
  constructor(element) {
    super();

    this.element = element;
    this.context = this.element.getContext('2d');
    this.resizeListener = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.resize(), 200);
    }
    this.autoResize = true;
  }

  get parent() {
    return this.element.parentNode;
  }

  get width() {
    return this.element.width;
  }

  set width(v) {
    this.element.width = v;
  }

  get height() {
    return this.element.height;
  }

  set height(v) {
    this.element.height = v;
  }

  get autoResize() {
    return this._autoResize || false;
  }

  set autoResize(v) {
    v = !!v;

    if(v !== this.autoResize) {
      if(v) {
        window.addEventListener('resize', this.resizeListener);
        this.resize();
      }
      else window.removeEventListener('resize', this.resizeListener);
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  blob(callback) {
    return this.element.toBlob(callback);
  }

  resize() {
    if(this.parent) {
      var image = new Image();
      image.onload = () => this.context.drawImage(image, 0, 0);

      this.blob(blob => {
        this.width = this.parent.offsetWidth;
        this.height = this.parent.offsetHeight;
        image.src = URL.createObjectURL(blob);
      });
    }
  }
}
