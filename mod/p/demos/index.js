var Demo = function() {
  this.init();
};
Demo.prototype = {
  init: function() {
    console.log('welcome to use TFE');
    this.showShare();
  },
  $: function(id) {
    return document.getElementById(id);
  },
  showShare: function() {
    var _this = this;
    this.$('J_Share').onclick = function() {
      _this.$('J_ShareAlert').style.top = '10px';
    }
    this.$('J_Copy').onclick = function() {
      _this.$('J_ShareAlert').style.top = '-130px';
      alert('复制成功~');
    }
  }
};

new Demo();