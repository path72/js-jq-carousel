
/** [OK]
 ** .index() 
 * $(elemento).index()
 * indice di elemento tra i suoi siblings uguali
 * 
 * 
 * [OK]
 ** .each() 
 al posto del ciclo for sul jQuery-array
 * $('btn').each(function(){
 * 	$(this).action()
 * }) 
 * [OK]
 ** .append()
 ** .prepend()
 * $(padre).append(figlio)
 * $(padre).prepend(figlio)
 * appende un figlio al padre specificato
 * in coda / in testa ad altri siblings se presenti
 * 
 * 
 ** .appendTo()
 ** .prependTo()
 * $(padre).appendTo(figlio)
 * $(padre).prependTo(figlio)
 * 
 */

 //###################################################### 
// DYNAMICS

$(document).ready(function() {
// ********************* doc ready start ***


var firstActiveImagePos = Math.floor(Math.random()*(getActiveImageOfASet().tot))+1;

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
	var fa0 = '<i class="far fa-circle"></i>';
	for (var i=1; i<=getActiveImageOfASet().tot; i++) $('.nav').append(fa0);;
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
	var newPos = _navBtn.index() + 1;
	if (newPos != getActiveImageOfASet().pos) imgUpdate(newPos);
}

// *** VISUAL DYNAMICS ***
function imgUpdate(_newPos) {
	var oldImg = getActiveImageOfASet();
	$('.img_container').children('img').each(function(_index) {
		if ((_index + 1) == oldImg.pos) {
			$(this).removeClass('active');
		} else if ((_index + 1) == _newPos) {
			$(this).addClass('active');
		}
	});
	navUpdate();
}
function navUpdate() {
	$('.nav').find('.fa-circle').each(function(_index) {
		var t = $(this);
		if ((_index + 1) == getActiveImageOfASet().pos) {
			t.addClass('fas');
			t.removeClass('far');
			t.css( 'color', 'var(--purple)');
		} else {
			t.addClass('far');
			t.removeClass('fas');
			t.css( 'color', 'var(--black)');
		}
	});
}

// *** KEY TOOL ***
function getActiveImageOfASet() {
	/**
	 * .pos: active image position in a set
	 * .tot: total number of images in the set
	 */
	var imgSet = $('.img_container').children('img'), // jQ object-array
		obj = { 'pos': null, 'tot': imgSet.length };
	imgSet.each(function(_index) {
		if ($(this).hasClass('active')) obj.pos = _index + 1;
	});
	return obj;
}
