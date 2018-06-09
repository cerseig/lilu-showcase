Application.DreamySketch.Brush.Polygon = class Polygon extends Application.DreamySketch.Brush {
  constructor() {
    super(...arguments);
    //this.colors.each(color => { color.alpha = 0.1 });
  }

  compute(touches, offset) {
    var floatColorIndex = (Date.now()/500)%this.colors.length;
    var colorIndex = Math.floor(floatColorIndex);
    var colorProgress = floatColorIndex - colorIndex;

    var polygon = new Application.DreamySketch.Brush.Shape.Polygon();
    polygon.color = this.colors.cycle(colorIndex).to(this.colors.cycle(colorIndex + 1), colorProgress);
    polygon.stroked = true;
    polygon.filled = false;

    touches.each((touch, index) => polygon.vectors.push(touch.position));

    // if(touches.length == 1) {
    //   var vector = new Application.DreamySketch.Vector.random(-this.density*100, this.density*100);
    //   polygon.vectors.push(polygon.vectors.first.add(vector));
    // }

    return new Application.DreamySketch.Brush.Shape.List(polygon);
  }
}
