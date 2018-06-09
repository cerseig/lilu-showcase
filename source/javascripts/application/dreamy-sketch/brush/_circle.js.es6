Application.DreamySketch.Brush.Circle = class Circle extends Application.DreamySketch.Brush {
  constructor() {
    super(...arguments);

    this.colors = new Application.DreamySketch.Color.List([
      Application.DreamySketch.Color.magenta,
      Application.DreamySketch.Color.yellow,
      Application.DreamySketch.Color.red,
      Application.DreamySketch.Color.green,
      Application.DreamySketch.Color.blue
    ]);

    this.colors.each(color => { color.alpha = 1 });

    this.noise = new Application.DreamySketch.Noise()

    this.size = 10;
    this.density = 100;
    this.diffusion = 100;
  }

  compute(touches, offset) {
    var shapes = new Application.DreamySketch.Brush.Shape.List();

    touches.each((touch, index) => {
      var circle = new Application.DreamySketch.Brush.Shape.Ellipse.Circle();
      circle.size = this.noise.bound(1, this.size).time(0.001);
      circle.position = touch.position.noise(0.0005, offset/100, -this.diffusion, this.diffusion)
      circle.color = this.colors.cycle(this.time/500);

      shapes.push(circle);
    });

    return shapes;
  }
}
