class Input {
  constructor(docBody) {
    this.UP_ARROW = 38; this.RT_ARROW = 39; this.LT_ARROW = 37; this.DN_ARROW = 40; this.SPACE = 32;
    this.ENTER = 13;

    this.keys = [];

    docBody.addEventListener('keydown', (e) => {
      this.keys[e.keyCode] = true;
    });

    docBody.addEventListener('keyup', (e) => {
      this.keys[e.keyCode] = false;
    });
  }

  check(key) {
    return this.keys[key];
  }

  addListener(key, callback) {
    document.body.addEventListener('keydown', (e) => {
      if(e.keyCode === key) {
        callback();
      }
    });
  }
}

module.exports = Input;
