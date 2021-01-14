import { readFileSync } from "fs";
var readlineSync = require('readline-sync');

const chalk = require('chalk');
var query = require('cli-interact');

const log = console.log;
class Game {
	gamePosition: object = {};
	gameSaveArray: string = "";
	gameMaxY: number = 0;
	gameMaxX: number = 0;
}

async function startGame() {
	log(chalk.yellow('Welcome to pp-ailumette game !'))
	let acutalGame = game()
	show(acutalGame)
	while (countMetteAll(acutalGame) >= 1) {
		log(chalk.blue('_________'))
		log(chalk.blue('Your turn'))
		let playerLineError: boolean = true
		let playerMatcheError: boolean = true
		let line: number
		let matches: number
		while (playerLineError) {
			line = readlineSync.question('Line : ');
			playerLineError = testLinePlayerError(line, acutalGame)
		}
		while (playerMatcheError) {
			matches = readlineSync.question('Matches : ');
			playerMatcheError = testMatchesPlayerError(line, matches, acutalGame)
		}
		log(chalk.blue(`Player removed ${matches} match(es) from line ${line} `))
		demiseMette(acutalGame, matches, line)
		log(chalk.green('_________'))
		log(chalk.green('IA\'s turn...'))
		theBestIACreatedEver(acutalGame)
	}
	log('finish')
}

function game() {
	let gameRaw: string = readFileSync('./data/game.map', 'utf8');
	let gameLine: string[] = gameRaw.split('\n');

	let game = new Game();
	let y: number = -1;
	for (let line of gameLine) {
		let x: number = -1;
		y++;
		if (game.gameMaxY <= y) {
			game.gameMaxY = y + 1
		}
		if (!line) { break; }
		for (let value of line.split('')) {
			x++;
			if (game.gameMaxX < x) {
				game.gameMaxX = x
			}
			let position: string = `${x}:${y}`;
			game.gamePosition[position] = {
				value: value
			}
		}

	}
	//countMetteAll(game)
	return game;

}



function demiseMette(game: Game, nbDemise: number, y: number) {
	if (countMette(game, y) < nbDemise) {
		console.log('error');
		return;
	}

	let x: number = 0;
	let count: number = 0;

	while (x !== game.gameMaxX) {
		if (game.gamePosition[`${x}:${y}`].value == '|') {
			if (count != nbDemise) {
				count++
				game.gamePosition[`${x}:${y}`].value = ' '
			} else {
				game.gamePosition[`${x}:${y}`].value = '|'
			}
		}
		x++
	}
	show(game);

}

async function show(game: Game) {

	let oldY = 0
	game.gameSaveArray = ""
	for (let obj in game.gamePosition) {
		let XandY = obj.split(":");
		let X = parseInt(XandY[0], 10)
		let Y = parseInt(XandY[1], 10)
		if (Y > oldY) {
			game.gameSaveArray = game.gameSaveArray + '\n'
		}
		game.gameSaveArray = game.gameSaveArray + game.gamePosition[obj]['value']
		oldY = Y
	}
	log(chalk.red.bold(game.gameSaveArray))
	//let a = countMette(game, 3);

}

function countMette(game: Game, y: number): number {
	let x: number = 0;
	let count: number = 0
	while (x !== game.gameMaxX) {
		if (game.gamePosition[`${x}:${y}`].value == '|') {
			count++
		}
		x++
	}
	return count;
}
function countMetteAll(game: Game): number {
	let count: number = 0
	Object.entries(game.gamePosition).forEach(obj => {
		if (obj[1].value == '|') {
			count++
		}
	});
	return count;
}

function theBestIACreatedEver(game: Game) {
	let chosedLine: boolean = true
	let y:number
	while (chosedLine) {
		y = Math.floor(Math.random() * ((game.gameMaxY - 2) - 1 + 1) + 1)
		if (countMette(game, y) > 0) {
			chosedLine = false
		}
	}
	let nb = Math.floor(Math.random() * (countMette(game, y) - 0 + 1) + 0)

	log(chalk.green(`IA removed ${nb} match(es) from line ${y} `))
	demiseMette(game, nb, y)
}









function testLinePlayerError(line: number, game: Game) {
	if (line > game.gameMaxY - 2) {
		log('Error: this line is out of range')
		return true
	}
	if (line == 0) {
		log('Error: this line is out of range')
		return true
	}
	if (line < 0) {
		log('Error: invalid input (positive number expected)')
		return true
	}
	if (line > 0 && line < game.gameMaxY - 1) {
		return false
	} else {
		log('Error: invalid input (positive number expected)')
		return true
	}
}

function testMatchesPlayerError(line: number, matches: number, game: Game) {
	if (matches == 0) {
		log('Error: you have to remove at least one match')
		return true
	}
	if (matches < 0) {
		log('Error: invalid input (positive number expected)')
		return true
	}
	if (matches > countMette(game, line)) {
		log('Error: not enough matches on this line')
		return true
	}
	if (matches > 0 && line <= countMette(game, line)) {
		return false
	} else {
		log('Error: invalid input (positive number expected)')
		return true
	}
}

startGame();

