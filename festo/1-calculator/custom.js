$(document).ready(function () {
  var $result = $('#top');
  var asn = 0;

  var show = function (srt) {
    $result.html($result.html() + srt);
  };

  $('.button').on('click', function (e) {
    console.log(e.target.id);
    var id = e.target.id;

    if (id.split('-')[0] === 'num') {
      show(id.split('-')[1])
    }

  });

});