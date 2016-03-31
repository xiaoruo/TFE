var Demo = function() {
  this.init();
};
Demo.prototype = {
  init: function() {
    console.log('welcome to use TFE');
    this.setColor();
  },
  setColor: function() {
    new ModuleDemo({
      color: 'green'
    });
  }
};

new Demo();