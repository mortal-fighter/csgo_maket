var COUNT_SOLDIERS = 5;
var mode = 2;

$(document).ready(function() {
	$('.target').on('mouseenter', function() {
		//$(this).addClass('bordered');
		
		switch (mode) { 
			case 1:
				soldiersEvade(this);
				break;
			case 2:
				soldiersEvade2(this);
				break;
		}
	})

	$('.target').on('mouseleave', function() {
		//$(this).removeClass('bordered');
	})

	$('.target').on('click', function() {
		$(this).addClass('bordered')
		setTimeout(() => {
			$(this).removeClass('bordered')
		}, 1000)

		soldiersDie(this)
	})

	soldiersInitPosition();

	soldiersInitZIndex();

	screenInitMoving();

	$('#btn-clear').on('click', soldiersInitPosition);

	$('.mode').on('click', function() {
		mode = parseInt($('input', this).val());
	})
});

function soldiersInitPosition() {
	$('.target').each(function(index, element) {
		$(this).css('left', index*200+'px')
		$(this).css('top', 0)

		var img = $('img', this)
		$(img).removeClass('rotated-left').removeClass('rotated-right')
		
		$(this).show()
	});
} 

function soldiersInitZIndex() {
	var k = COUNT_SOLDIERS;
	$('.target').each(function(index, element) {
		$(this).css('z-index', k)
		k--;
	});
}

function soldiersEvade(soldier) {
	var direction = generateRandomInteger(3);
	var distance = 100;

	switch (direction) {
		case 0: 
			distance = parseInt($(soldier).css('height'))
			$(soldier).css('top', parseInt($(soldier).css('top')) - distance + 'px')
			break;
		case 1:
			distance = parseInt($(soldier).css('width'))
			$(soldier).css('left', parseInt($(soldier).css('left')) + distance + 'px')
			break;
		case 2:
			distance = parseInt($(soldier).css('height'))
			$(soldier).css('top', parseInt($(soldier).css('top')) + distance + 'px')
			break;
		case 3: 
			distance = parseInt($(soldier).css('width'))
			$(soldier).css('left', parseInt($(soldier).css('left')) - distance + 'px')
			break;
	}
}

function soldiersEvade2(soldier) {
	var distance = parseInt($(soldier).css('width')) * 1.2

	if (dX >= 0) {
		$(soldier).css('left', parseInt($(soldier).css('left')) - distance + 'px')
	} else {
		$(soldier).css('left', parseInt($(soldier).css('left')) + distance + 'px')
	}
}

function soldiersDie(soldier) {
	var img = $('img', soldier)
	var direction = generateRandomInteger(1)

	if (direction == 0) {
		img.addClass('rotated-left')
	} else {
		img.addClass('rotated-right')
	}

	setTimeout(() => {
		$(soldier).hide();
	}, 3000)
}

var mouseX, mouseY;
var dX, dY;
var jqCanvas = $('#soldiers');

function screenInitMoving() {
	$('html').mousemove(function(e) {
		var msg = "Handler for .mousemove() called at ";
		msg += e.pageX + ", " + e.pageY;
		console.log(msg);

		dX = e.pageX - mouseX
		dY = e.pageY - mouseY

		jqCanvas.css('left', -1 * dX + parseInt(jqCanvas.css('left') + 'px'))
		jqCanvas.css('top', -1 * dY + parseInt(jqCanvas.css('top') + 'px'))

		mouseX = e.pageX;
		mouseY = e.pageY;
	});
}

function generateRandomInteger(maxInteger) {
	return Math.trunc(Math.random() * 10 % (maxInteger+1))
}

function cursorMove() {
	console.log('Случайный набор чисел:');
	var arr = [];
	for (var i = 0; i < 100; i++) {
		arr.push(generateRandomInteger(4));
		console.log(arr[arr.length-1]);
	}
	
	var counts = [0, 0, 0, 0];
	for (var i = 0; i < arr.length; i++) {
		counts[arr[i]]++;
	}

	console.log('Количество различных:');
	for (var i = 0; i < counts.length; i++) {
		console.log(i+': '+counts[i]);
	}
}
