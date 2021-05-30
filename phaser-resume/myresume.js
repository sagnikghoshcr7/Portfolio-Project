var w = window.innerWidth;
var h = window.innerHeight;
var bgColor = "#2ECCFA";

var game = new Phaser.Game(w, h, Phaser.CANVAS, 'canvas', {
	preload: preload,
	create: create,
	update: update,
	render: render
});

var debug = false;
var hero;
var cursors;
var bulletTime = 0;
var ctext, pythontext, javatext, jstext;
var style_white = {
	font: "24px Roboto",
	fill: "#FFF",
	align: "center"
};
var style_roboto = {
	font: "24px Roboto",
	fill: "#FFF",
	align: "center"
}
var text;
var inst_text;
var base5 = 15100;
var base6 = 17500 + 1400;
var base7 = 19500 + 1400;
var platformLength = base7 + 2000;
var starting_point = 100;
var back_btn;
var touch;
var direction = "left";


function preload() {

	text = game.add.text(w / 2, h / 2, "Loading...", {
		font: "80px Roboto",
		fill: '#ffffff'
	});
	text.anchor.setTo(0.5, 0.5);
	game.load.image('ground', 'assets/ground.png');
	game.load.image('pipe', 'assets/pipe.png');
	game.load.image('board', 'assets/board.png');
	game.load.image('college', 'assets/college.png');
	game.load.image('back', 'assets/back64.png');
	game.load.image('grass', 'assets/grass.png');
	game.load.atlasJSONHash('prateek', 'assets/hero_running1.png', 'assets/hero_running.json');
	game.load.image('night', 'assets/night.jpg');
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Set the world (global) gravity
  game.physics.arcade.gravity.y = 100;

	//Add night mode
	night = game.add.tileSprite(0, 0, platformLength * 2, h, 'night');
	night.alpha = 1;

	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	// bullets.physics.arcade.gravity.y = 100;
	bullets.setAll('physics.arcade.gravity.y', 100);
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y', 1);
	bullets.setAll('outOfBoundsKill', true);
	bullets.setAll('checkWorldBounds', true);

	tiles = game.add.group();
	tiles.enableBody = true;
	tiles.physicsBodyType = Phaser.Physics.ARCADE;

	game.stage.backgroundColor = bgColor;
	game.world.setBounds(0, 0, platformLength, h + 800);

	game.add.sprite(platformLength - 220, h - 200, 'pipe');

	/* The newer one */
	game.add.sprite(6650, h - 200, 'pipe');

	game.add.sprite(400, h - 260, 'board');
	game.add.sprite(700, h - 450, 'college');

	//Add Ground and Grass
	var ground = game.add.tileSprite(0, h - 100, platformLength * 2, 2000, 'ground');
	ground.scale.setTo(0.5, 0.5);

	var grass = game.add.tileSprite(0, h - 100, platformLength * 2, 50, 'grass');
	grass.scale.setTo(0.5, 0.5);

	inst_text = game.add.text(290, h - 50, "Use  Arrow Keys  OR << Screen Buttons >> ", {
		font: "30px Arial",
		fill: "#fff"
	});

	//Add hero 
	hero = game.add.sprite(100, -200, 'prateek');
	hero.animations.add('run');
	hero.allowGravity = true;

	//	hero tween
	var entryTween = game.add.tween(hero);
	entryTween.to({
		x: starting_point,
		y: h - 245 - hero.height
	}, 2000, Phaser.Easing.Bounce.Out, true);
	entryTween.start();

	cursors = game.input.keyboard.createCursorKeys();
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(hero);
	game.physics.arcade.enable(night);
	night.body.velocity.x = -30;

	game.input.mouse.mouseWheelCallback = mouseWheel;

	game.camera.follow(hero);
	game.camera.follow(hero, Phaser.Camera.FOLLOW_PLATFORMER);

	back_btn = game.add.button(10, h - 94, 'back');
	fwd_btn = game.add.button(w - 10, h - 94, 'back');
	fwd_btn.scale.x *= -1;
	fwd_btn.fixedToCamera = true;
	back_btn.fixedToCamera = true;
	back_btn.alpha = 1;

	night_tween = game.add.tween(night);
	night_tween.to({
		alpha: 0
	}, 10000)
}

function mouseWheel(event) {
	inst_text.setText("");
	if (game.input.mouse.wheelDelta > 0) {
		hero.x += 60;
		hero.animations.play('run', 15, true);
	} else {
		hero.x -= 60;
		hero.animations.play('run', 15, true);
	}
}

function forwardButtonPressed() {
	var ptr = game.input.activePointer;
	hero.animations.play('run', 15, true);
	if ((ptr.x >= w - 150 && ptr.y >= h - 150 && ptr.isDown) || cursors.right.isDown || scroll > 0) {
		if (direction == "left") {
			direction = "right";
			hero.scale.setTo(1, 1);
			hero.anchor.setTo(0, 0);
		}
		return true;
	} else {
		return false;
	}
}

function backButtonPressed() {
	var ptr = game.input.activePointer;
	hero.animations.play('run', 15, true);
	if ((ptr.x <= 150 && ptr.y >= h - 150 && ptr.isDown) || cursors.left.isDown || scroll < 0) {
		if (direction == "right") {
			direction = "left";
			hero.scale.setTo(-1, 1);
		}
		return true;
	} else
		return false;
}

function update() {

	game.physics.arcade.overlap(bullets, tiles, null, this);

	if (forwardButtonPressed()) {
		inst_text.setText("");
		hero.x += 30;
		hero.animations.play('run', 15, true);
	} else if (backButtonPressed()) {
		hero.x -= 30;
	}else {
		hero.animations.stop('run');
	}

	if (hero.x <= 0 && direction == "right") {
		hero.x = 0;
	}
	if (hero.x <= 150 && direction == "left") {
		hero.x = 150;
	}
}

function render() {
	if (debug) {
		game.debug.spriteInfo(hero, 32, 32);
	}
}