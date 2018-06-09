Component.List = class List extends Component {
  constructor(items) {
    super();

    if(arguments.length === 0) items = [];
    else if(!Array.isArray(items)) items = [items];

    this.items = items;
  }

  get length() {
    return this.items.length;
  }

  get first() {
    return this.get(0);
  }

  set first(v) {
    this.set(0, v);
  }

  get last() {
    return this.get(this.length - 1);
  }

  set last(v) {
    this.set(this.length - 1, v);
  }

  cycle(index) {
    return this.get(index%this.length);
  }

  push(...items) {
    this.items.push(...items);

    return this;
  }

  concat(list) {
    list.each(item => this.push(item));
  }

  each(callback) {
    this.items.forEach((...args) => callback.apply(this, args));

    return this;
  }

  map(callback) {
    return new this.constructor(this.items.map((...args) => callback.apply(this, args)));
  }

  get(index) {
    return this.items[index];
  }

  set(index, item) {
    this.items[index] = item;
  }

  index(item, callback) {
    var index = this.items.indexOf(item);

    if(index === -1) return null;
    else if(typeof callback === 'function') callback.call(this, index);
  }

  remove(item) {
    return this.index(item, index => this.removeAt(index)) !== null;
  }

  removeAt(index) {
    index = parseInt(index, 10);

    if(!isNaN(index)) {
      if(index >= 0 && index < this.length) {
        this.items.splice(index, 1);

        return true;
      }
    }

    return false;
  }

  clear() {
    this.items.splice(0, this.length);
  }

  static from(list) {
    return list instanceof this ? list : new this(list);
  }
}
