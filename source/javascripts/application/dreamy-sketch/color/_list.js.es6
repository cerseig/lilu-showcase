Application.DreamySketch.Color.List = class List extends Component.List {
  get(index) {
    var floor = Math.floor(index);

    if(floor === index) return super.get(index);
    else {
      var progress = index - floor;
      var color = super.get(floor).clone;
      var next = super.get((floor + 1)%this.length);

      return color.map((component, value) => (1 - progress)*value + progress*next[component], true);
    }
  }
}
