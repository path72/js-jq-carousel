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
  var newImg;
  
  // senza identificare in html prima e ultima immagine
  var firstImg = $('.img_container > img:first-child'); 
  var lastImg  = $('.img_container > img:last-child');
  if      (activeImg[0] == firstImg[0] && _new == 'prev') newImg = lastImg;
  else if (activeImg[0] == lastImg[0]  && _new == 'next') newImg = firstImg;
  else    newImg = (_new == 'next') ? activeImg.next(): activeImg.prev();

  // identificando in html prima e ultima immagine con classi first/last
  // var firstImgBool = activeImg.hasClass('first'); 
  // var lastImgBool  = activeImg.hasClass('last'); 
  // if      (firstImgBool && _new == 'prev') newImg = $('.last');
  // else if (lastImgBool  && _new == 'next') newImg = $('.first');
  // else    newImg = (_new == 'next') ? activeImg.next(): activeImg.prev();
  
  // image switch (to be animated)
  activeImg.removeClass('active'); 
  newImg.addClass('active');
}

