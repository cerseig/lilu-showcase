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
    this.blank = true
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

  get url() {
    return this.element.toDataURL();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.blank = true
  }

  blob(callback) {
    return this.element.toBlob(callback);
  }

  load(url, callback) {
    var image = new Image()
    image.onload = () => {
      this.clear()
      this.context.drawImage(image, 0, 0)
      this.blank = false
      if(typeof callback === 'function') callback.call(this)
    }
    image.src = url
  }

  transition(duration, callback) {
    this.element.style.transition = (duration/1000) + 's'
    setTimeout(() => callback.call(this), 1)
    setTimeout(() => this.element.style.transition = null, duration + 1)
  }

  show(duration = 0) {
    if(duration === 0) this.element.style.opacity = null
    else this.transition(duration, () => this.element.style.opacity = null)
  }

  hide(duration = 0) {
    if(duration === 0) this.element.style.opacity = 0
    else this.transition(duration, () => this.element.style.opacity = 0)
  }

  resize() {
    if(this.parent) {
      var image = new Image();
      image.onload = () => this.context.drawImage(image, 0, 0);

      this.blob(blob => {
        this.width = this.parent.offsetWidth;
        this.height = this.parent.offsetHeight;
        if(blob) image.src = URL.createObjectURL(blob);
      });
    }
  }
}
