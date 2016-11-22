var Input = 
{
	playing: false,
	drawGridLines: false,
	gameSpeed: 100,
	mouseIsDown: false,
	mouse: {x: 0, y: 0},
	
	mouseMove: function(event)
	{
		var parentOffset = Screen.parent().offset();
		var relX = event.pageX - parentOffset.left;
		var relY = event.pageY - parentOffset.top;

		this.mouse.x = Math.floor(relX * (gameGrid.width / Screen.width()));
		this.mouse.y = Math.floor(relY * (gameGrid.height / Screen.height()));
	},

	mouseDown: function()
	{
		this.mouseIsDown = true;
	},

	mouseUp: function()
	{
		this.mouseIsDown = false;
	},

	update: function()
	{
		if(this.mouseIsDown)
		{
			gameGrid.getCell(this.mouse.x, this.mouse.y).alive = true;
			gameGrid.getCell(this.mouse.x, this.mouse.y).aliveNext = true;
		}
	},
	
	speed: function()
	{
		var speedButton = document.getElementById("speedButton");
		if(this.gameSpeed == 200)
		{
			this.gameSpeed = 100;
			speedButton.innerHTML = "Normal Speed";
		}
		else if(this.gameSpeed == 100)
		{
			this.gameSpeed = 50;
			speedButton.innerHTML = "Fast Speed";
		}
		else if(this.gameSpeed == 50)
		{
			this.gameSpeed = 200;
			speedButton.innerHTML = "Slow Speed";
		}
	},
};


$(document).ready(function() { 

$( window ).resize(function() {
	Screen.width($('#screen-container').width());
	Screen.height($('#screen-container').height());
	ctx.canvas.width = Screen.width();
	ctx.canvas.height = Screen.height();
});

$('#playButton').click(function() {
	Input.playing = !Input.playing;
	if(Input.playing)
		$('#playButton').html('Stop');
	else
		$('#playButton').html('Play');
});

$('#stepButton').click(function() {
	gameGrid.step();
});

$('#clearButton').click(function() {
	gameGrid.clear();
});

$('#stepButton').click(function() {
	gameGrid.step();
});

$('#gridLinesButton').click(function() {
	Input.drawGridLines = !Input.drawGridLines;
});

$('#resizeButton').click(function() {

	var xInput = parseInt($('#xInput').val(), 10);
	var yInput = parseInt($('#yInput').val(), 10);
	gameGrid = new Grid(xInput, yInput);

});


});