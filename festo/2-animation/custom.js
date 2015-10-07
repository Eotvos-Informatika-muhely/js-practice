/**
 * Created by festo on 2015.10.04..
 */

jQuery.fn.rotate = function(degrees) {
  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
    '-moz-transform' : 'rotate('+ degrees +'deg)',
    '-ms-transform' : 'rotate('+ degrees +'deg)',
    'transform' : 'rotate('+ degrees +'deg)'});
  return $(this);
};

$(document).ready(function () {
  var $bbox = $('#border-box');
  var $mbox = $('#moving-box');
  var pressedKeys = {};
  var spinnerLock = false;

  $(document).on('keydown', function (e) {
    e.preventDefault();
    pressedKeys[e.keyCode] = true;

    if(e.keyCode == 82) {
      spinner(360);
    }
  });

  $(document).on('keyup', function (e) {
    e.preventDefault();
    pressedKeys[e.keyCode] = false;
  });

  var normalize = function(position) {
    var border = {
      height: $bbox.height() - $mbox.outerHeight(),
      width: $bbox.width() - $mbox.outerWidth()
    };

    if(position.left < 0) {
      position.left = 0;
    }

    if(position.top < 0) {
      position.top = 0;
    }

    if(position.left > border.width) {
      position.left = border.width;
    }

    if(position.top > border.height) {
      position.top = border.height;
    }
    return position;
  };

  var move = function (position, duration) {
    var needAnimate = true;
    var step = 5;
    duration = duration || 0;

    if (!position) {
      position = $mbox.position();
      needAnimate = false;
    }

    for (var direction in pressedKeys) {
      if (!pressedKeys[direction]) {
        continue;
      }

      if (direction == 37) { // LEFT
        position.left -= step;
        needAnimate = true;
      }

      if (direction == 38) { // UP
        position.top -= step;
        needAnimate = true;
      }

      if (direction == 39) { // RIGHT
        position.left += step;
        needAnimate = true;
      }

      if (direction == 40) {
        position.top += step;
        needAnimate = true;
      }
    }

    normalize(position);
    if (needAnimate) {
      $mbox.stop().animate(position, duration);
    }
  };

  setInterval(move, 20);

  $bbox.on('click', function(e) {
    move({
      top: e.offsetY - ($mbox.outerHeight() / 2),
      left: e.offsetX - ($mbox.outerWidth() / 2)
    }, 400);
  });

  var spinner = function(degre) {
    if (!!spinnerLock) {
      return;
    }

    var step = 5;
    spinnerLock = setInterval(function() {
      if(degre > 0) {
        degre -= step;
        $mbox.rotate(degre);
      } else {
        clearInterval(spinnerLock);
        spinnerLock = null;
      }
    }, 20);
  };
});