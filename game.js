var spriteSize = 50;
var game = new Phaser.Game(
	900, 
	600, 
	Phaser.AUTO, 
	'gamearea', 
	{ 
		preload: preload, 
		create: create, 
		update: update 
	}
);
var player;
var enemy;
var hasMoved = false;
function update () {
	var cursors = game.input.keyboard.createCursorKeys();
	var moveDistance = spriteSize;
	if (!hasMoved) {
		if (cursors.left.isDown)
		{
			player.animations.play('player1_left');
			player.position = new PIXI.Point(player.position.x - moveDistance, player.position.y);
			StartMoveTimer();
			
		}
		if (cursors.right.isDown)
		{
			player.animations.play('player1_right');
			player.position = new PIXI.Point(player.position.x + moveDistance, player.position.y);
			StartMoveTimer();
		}
		if (cursors.up.isDown)
		{
			player.animations.play('player1_up');
			player.position = new PIXI.Point(player.position.x, player.position.y - moveDistance);
			StartMoveTimer();
		}
		if (cursors.down.isDown)
		{
			player.animations.play('player1_down');
			player.position = new PIXI.Point(player.position.x, player.position.y + moveDistance);
			StartMoveTimer();
		}
	}
}
function StartMoveTimer(){
	hasMoved = true;
	setTimeout(function(){ hasMoved = false; }, 500);
}
function preload () {
	game.load.spritesheet('player', './images/game/sprites/players.png', 32, 48);
	game.load.spritesheet('enemy', './images/game/sprites/player.png', 35, 35);
	game.load.image('background', './images/Background_Brown.jpg');
}
function parseSpriteSheet(object, animationName, frames, start, speed, offset) {
	var i = start;
	object.animations.add(animationName+'_down', [i++, i++, i++, i++], speed, true);
	i = i + offset;
	object.animations.add(animationName+'_left', [i++, i++, i++, i++], speed, true);
	i = i + offset;
	object.animations.add(animationName+'_right', [i++, i++, i++, i++], speed, true);
	i = i + offset;
	object.animations.add(animationName+'_up', [i++, i++, i++, i++], speed, true);
	return object;
}
function create () {
	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
	logo.anchor.setTo(0.5, 0.5);
	
	player = game.add.sprite(0, 0, 'player');
	player = parseSpriteSheet(player, 'player1', 4, 4 * 0, 10, 8);
	player.animations.play('player1_down').stop();
	
	enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
	enemy = parseSpriteSheet(enemy, 'player2', 4, 4 * 1, 10, 8);
	enemy.animations.play('player2_right').stop();
	
	// player = parseSpriteSheet(player, 'player3', 4, 4 * 2, 10, 8);
	// player = parseSpriteSheet(player, 'player4', 4, 4 * 3, 10, 8);
	// player = parseSpriteSheet(player, 'player5', 4, 4 * 4, 10, 8);
	// player = parseSpriteSheet(player, 'player6', 4, 4 * 5, 10, 8);
}