Application.DreamySketch.Brush.Polygon = class Polygon extends Application.DreamySketch.Brush {
  constructor() {
    super(...arguments);

    this.colors = new Application.DreamySketch.Color.List([
      Application.DreamySketch.Color.magenta,
      Application.DreamySketch.Color.yellow,
      Application.DreamySketch.Color.red,
      Application.DreamySketch.Color.green,
      Application.DreamySketch.Color.blue
    ]);
  }

  compute(touches, offset) {
    var polygon = new Application.DreamySketch.Brush.Shape.Polygon();
    polygon.color = this.colors.cycle(Date.now()/500);
    polygon.stroked = true;
    polygon.filled = false;

    touches.each((touch, index) => polygon.vectors.push(touch.position));

    if(touches.length == 1) {
      var vector = new Application.DreamySketch.Vector(
        (Math.random()*this.density -this.density/2)*100,
        (Math.random()*this.density -this.density/2)*100
      );

      polygon.vectors.push(polygon.vectors.first.add(vector));
    }

    return new Application.DreamySketch.Brush.Shape.List(polygon);
  }
}
