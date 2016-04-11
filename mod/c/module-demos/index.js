var ModuleDemo = function(options) {
  this.options = options;
  this.chooseColor();
};
ModuleDemo.prototype = {
  chooseColor: function() {
    var color = this.options.color;
    document.getElementsByTagName('body')[0].style.backgroundColor = color;
  }
};
