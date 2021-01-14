import { readFileSync } from "fs";
var readlineSync = require('readline-sync');

const chalk = require('chalk');
var query = require('cli-interact');

const log = console.log;
class Game {
	gamePosition: object = {};
	gameSaveArray: string = "";
}

async function startGame() {
	log(chalk.yellow('Welcome to pp-ailumette game !'))
	let acutalGame = game()
	log(chalk.blue('_________'))
	while (countMetteAll(acutalGame) >= 1) {
		let line = readlineSync.question('Chose your y :');
		let matches = readlineSync.question('Chose your nb :');
		demiseMette(acutalGame, matches, line)
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
		if (!line) { break; }
		for (let value of line.split('')) {
			x++;
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

	while (x !== 9) {
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

function show(game: Game) {

	let oldY = 0
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
	log(chalk.red(game.gameSaveArray))
	//let a = countMette(game, 3);

}

function countMette(game: Game, y: number): number {
	let x: number = 0;
	let count: number = 0
	while (x !== 9) {
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

startGame();

