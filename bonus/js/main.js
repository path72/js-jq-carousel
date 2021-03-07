//###################################################### 
// DYNAMICS

$(document).ready(function() {
// ********************* doc ready start ***

// ** BUTTON INIT **
btnInit();

// ** NAV INIT ** 
navInit();

// *********************** doc ready end ***
});

//###################################################### 
// FUNCTIONS

// ** INIT **
function btnInit() {
  $('.prev_btn').click(function() { btnClick('prev'); });
  $('.next_btn').click(function() { btnClick('next'); });
  $('body').keydown(function(_ev) {
    if      (_ev.keyCode == 37) { btnClick('prev'); }
    else if (_ev.keyCode == 39) { btnClick('next'); }
  });
  arrowVisualEffectInit();
}
function navInit() {
  var fa0 = '<i class="far fa-circle"></i>',
      fa1 = '<i class="fas fa-circle"></i>',
      faListHtml = '',
      N = getActiveImageOfSet();
  for (var i=1; i<=N[1]; i++) faListHtml += (i==N[0]) ? fa1 : fa0;
  $('.nav').html(faListHtml);
  $('.fa-circle.fas').css( 'color', 'var(--purple)');
  $('.fa-circle')
    .css({ 'font-size':'1em','padding':'3px 4px', 'cursor':'pointer' })
    .click(function(){ navClick($(this)); });
}
function arrowVisualEffectInit() {
  var pBtn = $('.prev_btn'),
      nBtn = $('.next_btn'),
      arrL = $('.fa-angle-left'),
      arrR = $('.fa-angle-right'),
      scaleUp   = { 'transition': '0.1s ease-in', 'transform': 'scale(1.2)' },
      scaleDown = { 'transition': '0.1s ease-in', 'transform': 'scale(1.0)' };
  pBtn.mouseenter(function() { arrL.addClass('highlight');    arrL.css(scaleUp);   });
  pBtn.mouseleave(function() { arrL.removeClass('highlight'); arrL.css(scaleDown); });
  nBtn.mouseenter(function() { arrR.addClass('highlight');    arrR.css(scaleUp);   });
  nBtn.mouseleave(function() { arrR.removeClass('highlight'); arrR.css(scaleDown); });
}

// ** CLICK ** 
function btnClick(_shift) {
  var N = getActiveImageOfSet(), newPos = null;
  if      (N[0] == 1     && _shift == 'prev') newPos = N[1];
  else if (N[0] == N[1]  && _shift == 'next') newPos = 1;
  else    newPos = (_shift == 'next') ? (N[0]+1) : (N[0]-1);
  imgUpdate(newPos);
  navUpdate();
}
function navClick(_navBtn) {
  var navBtnSet = $('.nav > .fa-circle'), newPos = null;
  for (var i=0; i<navBtnSet.length; i++) {
    if (_navBtn[0] == navBtnSet[i]) newPos = i+1;
  }
  if (newPos != getActiveImageOfSet()[0]) imgUpdate(newPos);
}

// ** VISUAL DYNAMICS ** 
function imgUpdate(_newPos) {
  var N = getActiveImageOfSet();
  for (var i=1; i<=N[1]; i++) {
    var img = $('.img_container > img:nth-child('+i+')');
    if (i == N[0]) {
      img.removeClass('active');
    } else if (i == _newPos) {
      img.addClass('active');
    }
  }
  navUpdate();
}
function navUpdate() {
  var N = getActiveImageOfSet();  
  for (var i=1; i<=N[1]; i++) {
    var fa = $('.nav > .fa-circle:nth-child('+i+')');
    if (i == N[0]) {
      fa.addClass('fas');
      fa.removeClass('far');
      fa.css( 'color', 'var(--purple)');
    } else {
      fa.addClass('far');
      fa.removeClass('fas');
      fa.css( 'color', 'var(--black)');
    }
  }
}

// ** KEY TOOL **
function getActiveImageOfSet() {
  /**
   * N[0] active image position
   * N[1] total number of images
   */
  var imgSet = $('.img_container > img');
  var N = [null,imgSet.length];
  for (var i=1; i<=N[1]; i++) {
    var img = $('.img_container > img:nth-child('+i+')');
    if (img.hasClass('active')) N[0] = i;
  }
  return N;
}
