//###################################################### 
// DYNAMICS

$(document).ready(function() {
// ********************* doc ready start ***


var firstActiveImagePos = 3;

// ** KICK-OFF **

// nav init
navInit(firstActiveImagePos); 

// prev/next button & arrow key init
btnKeyInit();


// *********************** doc ready end ***
});

//###################################################### 
// FUNCTIONS

// *** INIT ***
function navInit(_firstActiveImagePos) {
	/**
	 * nav deploy
	 * <i class="fas fa-circle"></i> selected
	 * <i class="far fa-circle"></i> unselected
	 */
	var fa0 = '<i class="far fa-circle"></i>', faSet = '';
	for (var i=1; i<=getActiveImageOfASet().tot; i++) faSet += fa0;
	$('.nav').html(faSet);
	$('.fa-circle')
		.css({ 'font-size':'1em', 'padding':'4px 3px', 'cursor':'pointer' })
		.click(function(){ navClick($(this)); }); // $(this) is the clicked $('.fa-circle')
	// first active image selection (after nav deploy)
	imgUpdate(_firstActiveImagePos);
}
function btnKeyInit() {
	$('.prev_btn').click(function() { btnKeyClick('prev'); });
	$('.next_btn').click(function() { btnKeyClick('next'); });
	$('body').keydown(function(_ev) {
		if      (_ev.keyCode == 37) { btnKeyClick('prev'); }
		else if (_ev.keyCode == 39) { btnKeyClick('next'); }
	});
	arrowVisualEffectInit();
}
function arrowVisualEffectInit() {
	var pBtn = $('.prev_btn'),
		nBtn = $('.next_btn'),
		pArr = $('.fa-angle-left'),
		nArr = $('.fa-angle-right'),
		scaleUp   = { 'transition': '0.1s ease-in', 'transform': 'scale(1.2)' },
		scaleDown = { 'transition': '0.1s ease-in', 'transform': 'scale(1.0)' };
	pBtn.mouseenter(function() { pArr.addClass('highlight');    pArr.css(scaleUp);   });
	pBtn.mouseleave(function() { pArr.removeClass('highlight'); pArr.css(scaleDown); });
	nBtn.mouseenter(function() { nArr.addClass('highlight');    nArr.css(scaleUp);   });
	nBtn.mouseleave(function() { nArr.removeClass('highlight'); nArr.css(scaleDown); });
}

// *** CLICK ACTIONS ***
function btnKeyClick(_shift) {
	var actPos = getActiveImageOfASet().pos,
		totImg = getActiveImageOfASet().tot,
		newPos = null;
	if      (actPos == 1       && _shift == 'prev') newPos = totImg;
	else if (actPos == totImg  && _shift == 'next') newPos = 1;
	else    newPos = (_shift == 'next') ? (actPos + 1) : (actPos - 1);
	imgUpdate(newPos);
}
function navClick(_navBtn) { // _navBtn jQ object (clicked nav button)
	var navBtnSet = $('.nav > .fa-circle'), // jQ object-array > navBtnSet[i]: single html structure 
		newPos = null;
	// clicked nav button > get position in set
	for (var i=0; i<navBtnSet.length; i++) {
		if (_navBtn[0] == navBtnSet[i]) newPos = i+1; // comparison between html structures
	}
	if (newPos != getActiveImageOfASet().pos) imgUpdate(newPos);
}

// *** VISUAL DYNAMICS ***
function imgUpdate(_newPos) {
	var actPosTot = getActiveImageOfASet();
	for (var i=1; i<=actPosTot.tot; i++) {
		var img = $('.img_container > img:nth-child('+i+')'); // jQ obcject
		if (i == actPosTot.pos) {
			img.removeClass('active');
		} else if (i == _newPos) {
			img.addClass('active');
		}
	}
	navUpdate();
}
function navUpdate() {
	var actPosTot = getActiveImageOfASet();  
	for (var i=1; i<=actPosTot.tot; i++) {
		var fa = $('.nav > .fa-circle:nth-child('+i+')'); // jQ obcject
		if (i == actPosTot.pos) {
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

// *** KEY TOOL ***
function getActiveImageOfASet() {
	/**
	 * .pos: active image position in a set
	 * .tot: total number of images in the set
	 */
	var imgSet = $('.img_container > img'), // jQ object-array > imgSet[i]: single html structure 
		obj = { 'pos': null,'tot': imgSet.length };
	for (var i=1; i<=obj.tot; i++) {
		var img = $('.img_container > img:nth-child('+i+')'); // jQ object
		if (img.hasClass('active')) obj.pos = i;
	}
	return obj;
}
