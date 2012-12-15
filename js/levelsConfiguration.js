var app = app || {};

(function(){

	app.levels = 
	[
		{
			objects: 
			[
				{
					url: 'img/level1/dino.png',
					x: 0,
					y: 0,
					width: 120,
					height: 120,
					score: 15,
					velocity: 3,
					duration: 0,
				},
				{
					url: 'img/level1/mammoth.png',
					x: 0,
					y: 100,
					width: 100,
					height: 100,
					score: 5,
					velocity: 8,
					duration: 1000,
				},
				{
					url: 'img/level1/mammoth.png',
					x: 600,
					y: 0,
					width: 50,
					height: 50,
					score: 20,
					velocity: 3,
					duration: 2000,
				},
				{
					url: 'img/level1/dino.png',
					x: 0,
					y: 100,
					width: 10,
					height: 10,
					score: 50,
					velocity: 50,
					duration: 3000,
				},
				{
					url: 'img/level1/dino.png',
					x: 400,
					y: 0,
					width: 70,
					height: 70,
					score: 17,
					velocity: 3,
					duration: 4000,
				}
			]
		},
		{
			objects: 
			[
				{
					url: 'img/level2/elk.png',
					x: 680,
					y: 0,
					width: 120,
					height: 120,
					score: 10,
					velocity: 10,
					duration: 0,
					toLeft: true,
				},
				{
					url: 'img/level2/sheep.png',
					x: 700,
					y: 100,
					width: 96,
					height: 80,
					score: 5,
					velocity: 8,
					duration: 500,
					toLeft: true,
				},
				{
					url: 'img/level2/skunk.png',
					x: 300,
					y: 0,
					width: 90,
					height: 90,
					score: -20,
					velocity: 4,
					duration: 1300,
				}
			]
		}
	];

})();