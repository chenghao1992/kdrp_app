function showToast(msg, duration) {
  duration = isNaN(duration) ? 2000 : duration;
  var m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "width:60%; min-width:1.5rem;background:#000; opacity:0.5; height:0.8rem; color:#fff; line-height:0.8rem; text-align:center; border-radius:5px; position:fixed; top:70%; left:20%; z-index:9999999999; font-weight:bold;";
  document.body.appendChild(m);
  setTimeout(function() {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d
      + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() {
      document.body.removeChild(m)
    }, d * 1000);
  }, duration);
}
