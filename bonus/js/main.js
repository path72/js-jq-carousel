//###################################################### 
// DYNAMICS

$(document).ready(function() {
// ********************* doc ready start ***

// ** BUTTONS **
var prevBtn = $('.prev_btn'); //console.log(prevBtn);
var nextBtn = $('.next_btn'); //console.log(nextBtn);

// ** INTERACTIONS **
prevBtn.click(function() { btnClick('prev'); });
nextBtn.click(function() { btnClick('next'); });
$('body').keydown(function(_ev) {
  if      (_ev.keyCode == 37) { btnClick('prev'); }
  else if (_ev.keyCode == 39) { btnClick('next'); }
});

// ** VISUAL EFFECTS **
var arrL = $('.fa-angle-left');
var arrR = $('.fa-angle-right');
var scaleUp   = { 'transition': '0.1s ease-in', 'transform': 'scale(1.2)' };
var scaleDown = { 'transition': '0.1s ease-in', 'transform': 'scale(1.0)' };
prevBtn.mouseenter(function() { arrL.addClass('highlight');    arrL.css(scaleUp);   });
prevBtn.mouseleave(function() { arrL.removeClass('highlight'); arrL.css(scaleDown); });
nextBtn.mouseenter(function() { arrR.addClass('highlight');    arrR.css(scaleUp);   });
nextBtn.mouseleave(function() { arrR.removeClass('highlight'); arrR.css(scaleDown); });


// *********************** doc ready end ***
});

//###################################################### 
// FUNCTIONS

function btnClick(_new) {
  var activeImg = $('.active');
  var firstImgBol = activeImg.hasClass('first');
  var lastImgBol  = activeImg.hasClass('last');
  var newImg;
  if (firstImgBol && _new == 'prev') {
    newImg = $('.last');
  } else if (lastImgBol && _new == 'next') {
    newImg = $('.first');
  } else {
    newImg = (_new == 'next') ? activeImg.next(): activeImg.prev();
  }
  // image switch (to be animated)
  activeImg.removeClass('active');
  newImg.addClass('active');
}

