import { readFileSync } from "fs";

class Game {
	gamePosition: object = {};
	gameSaveArray: string = "";


}

function game() {
	let gameRaw:string = readFileSync('./data/game.map', 'utf8');
	let gameLine:string[] = gameRaw.split('\n');

	let game = new Game();
	let y: number = -1;
	for (let line of gameLine) {
		let x: number = -1;
		y++;
		if (!line) { break; }
		for (let value of line.split('')) {
			x++;
			let position:string = `${x}:${y}`;
			game.gamePosition[position] = {
				value: value
			}
		}
		
	}
	show(game)

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
	//console.log(game.gameSaveArray)
	//let a = countMette(game, 3);

}

function countMette(game: Game, y: number): number {
	let x: number = 0;
	let count:number = 0
	while (x !== 9) {		
		if (game.gamePosition[`${x}:${y}`].value == '|') {
			count++
		}
		x++
	}
	return count;
}

game();

