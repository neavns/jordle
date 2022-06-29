class Cache {
  constructor() {
    this.cache = {
      seenWords: []
    };
  }

  get(key) {
    return this.cache[key];
  }

  getMany(keys) {
    return {...keys} = this.cache;
  }

  set(key, value) {
    this.cache[key] = value;
  }

  setMany(map) {
    for(let key in map) {
      this.set(key, map[key]);
    }
  }

  remove(key) {
    delete this.cache[key];
  }

  clear() {
    this.cache = {};
  }
}

export default new Cache