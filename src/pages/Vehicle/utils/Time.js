export default class Time {
  constructor(_option) {
    this.interval = _option?.interval;
    this.delta = 0;
    this.current = undefined;
    this.callbacks = {};
    this.render = this.render.bind(this);
    this.tricker = window.requestAnimationFrame(this.render);
  }

  // 绑定自定义事件回调函数
  on(name, callback) {
    const that = this;
    // Errors
    if (typeof name === 'undefined' || name === '') {
      console.warn('wrong names')
      return false
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback')
      return false
    }

    if (!this.callbacks[name]) {
      this.callbacks[name] = [];
      this.callbacks[name].push(callback);
    } else {
      this.callbacks[name].push(callback);
    }
    return callback;
  }

  //卸载自定义事件函数
  off(name, callback) {
    this.callbacks[name].forEach((item, index) => {
      if (callback == item) {
        this.callbacks[name].splice(index, 1);
      }
    })
    return this.callbacks;
  }

  // 触发自定义事件
  trigger(name, _args) {
    // Errors
    if (typeof name === 'undefined' || name === '') {
      console.warn('wrong name')
      return false
    }
    const args = !(_args instanceof Array) ? [] : _args;
    if(!this.callbacks[name]){
        return false;
    }
    var that = this;
    this.callbacks[name].forEach((callback, index) => {
      callback.apply(that, args);
    });
  }

  render(time) {
    this.tricker = window.requestAnimationFrame(this.render);
    this.trigger("render");
  }

  stop() {
    window.cancelAnimationFrame(this.tricker);
  }
}
