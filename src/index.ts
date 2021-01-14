import { readFileSync } from "fs";
import { exit } from "process";
var readlineSync = require('readline-sync');
const chalk = require('chalk');

const log = console.log;
class Game {
	gamePosition: object = {};
	gameSaveArray: string = "";
	gameMaxY: number = 0;
	gameMaxX: number = 0;
	iaActualArray: Array<number> = []

	game() {
		let gameRaw: string = readFileSync('./data/game.map', 'utf8');
		let gameLine: string[] = gameRaw.split('\n');

		let y: number = -1;
		for (let line of gameLine) {
			let x: number = -1;
			y++;
			if (this.gameMaxY <= y) {
				this.gameMaxY = y + 1
			}
			if (!line) { break; }
			for (let value of line.split('')) {
				x++;
				if (this.gameMaxX < x) {
					this.gameMaxX = x
				}
				let position: string = `${x}:${y}`;
				this.gamePosition[position] = {
					value: value
				}
			}

		}
		return this;
	}
	show() {
		let oldY = 0
		this.gameSaveArray = ""
		for (let obj in this.gamePosition) {
			let XandY = obj.split(":");
			let X = parseInt(XandY[0], 10)
			let Y = parseInt(XandY[1], 10)
			if (Y > oldY) {
				this.gameSaveArray = this.gameSaveArray + '\n'
			}
			this.gameSaveArray = this.gameSaveArray + this.gamePosition[obj]['value']
			oldY = Y
		}
		log(chalk.red.bold(this.gameSaveArray))
	}
	demiseMatches(nbDemise: number, y: number) {
		if (this.countMatches(y) < nbDemise) {
			console.log('error');
			return;
		}

		let x: number = 0;
		let count: number = 0;

		while (x !== this.gameMaxX) {
			if (this.gamePosition[`${x}:${y}`].value == '|') {
				if (count != nbDemise) {
					count++
					this.gamePosition[`${x}:${y}`].value = ' '
				} else {
					this.gamePosition[`${x}:${y}`].value = '|'
				}
			}
			x++
		}
	}
	countMatches(y: number): number {
		let x: number = 0;
		let count: number = 0
		while (x !== this.gameMaxX) {
			if (this.gamePosition[`${x}:${y}`].value == '|') {
				count++
			}
			x++
		}
		return count;
	}
	countMatchesAll(): number {
	let count: number = 0
	Object.entries(this.gamePosition).forEach(obj => {
		if (obj[1].value == '|') {
			count++
		}
	});
	return count;
}
}

function startGame() {
	log(chalk.yellow('Welcome to pp-ailumette game !'))
	let game = new Game();
	game.game()
	game.show()
	arrayMetteAll(game)
	while (game.countMatchesAll() >= 0) {
		player(game)
		game.show()
		trueIA(game)
	}
}

function player(game: Game) {
	log(chalk.blue('_________'))
	log(chalk.blue('Your turn'))
	let playerLineError: boolean = true
	let playerMatcheError: boolean = true
	let line: number
	let matches: number
	while (playerLineError) {
		line = readlineSync.question('Line : ');
		playerLineError = testLinePlayerError(line, game)
	}
	while (playerMatcheError) {
		matches = readlineSync.question('Matches : ');
		playerMatcheError = testMatchesPlayerError(line, matches, game)
	}
	log(chalk.blue(`Player removed ${matches} match(es) from line ${line} `))
	game.demiseMatches(matches, line)
	if (game.countMatchesAll() == 0) {
		log('You lost, too bad..')
		game.show()
		process.exit(0)
	}
}

function arrayMetteAll(game: Game) {
	let count: number = 0
	game.iaActualArray = []
	for (let index = 1; index < game.gameMaxY - 1; index++) {
		game.iaActualArray.push(game.countMatches(index))

	}
}

function IAxOR(game: Game) {
	return game.iaActualArray[0] ^ game.iaActualArray[1] ^ game.iaActualArray[2] ^ game.iaActualArray[3]
}

function theBestIACreatedEver(game: Game) {
	let chosedLine: boolean = true
	let y: number
	while (chosedLine) {
		y = Math.floor(Math.random() * ((game.gameMaxY - 2) - 1 + 1) + 1)
		if (game.countMatches(y) > 0) {
			chosedLine = false
		}
	}
	let nb: number
	let chosedNb: boolean = true
	while (chosedNb) {
		nb = Math.floor(Math.random() * (game.countMatches(y) - 0 + 1) + 0)
		if (nb > 0) {
			chosedNb = false
		}
	}

	log(chalk.green(`IA removed ${nb} match(es) from line ${y} `))
	game.demiseMatches(nb, y)
	game.show()
}

function trueIA(game: Game) {
	log(chalk.green('_________'))
	log(chalk.green('IA\'s turn...'))
	if (game.countMatchesAll() == 1) {
		theBestIACreatedEver(game)
		log('I lost.. snif.. but I’ll get you next time!!')
		process.exit(0)
	}
	arrayMetteAll(game)
	let oldGamePosition = game.gamePosition
	let chosedLine: boolean = true
	let y: number
	let v: number = 0

	while (chosedLine) {
		y = Math.floor(Math.random() * ((game.gameMaxY - 2) - 1 + 1) + 1)
		if (game.countMatches(y) > 0) {
			chosedLine = false
		}
	}

	if (IAxOR(game) == 0) {
		while (game.countMatches(y) == 0) {
			y = (y + 1) % (game.gameMaxY - 2)
		}
		log(chalk.green(`IA removed 1 match(es) from line ${y}`))
		game.demiseMatches(1, y)
		game.show()
	} else {
		while (game.countMatches(y) != 0) {
			y = (y + 1) % (game.gameMaxY - 2)
			while (game.countMatches(y) == 0) {
				y = (y + 1) % (game.gameMaxY - 2)
			}
			v = game.countMatches(y)
			while (IAxOR(game) != 0 && game.countMatches(y) > 0 && game.countMatchesAll() > 1) {
				if (game.countMatchesAll() !== 1) {
					game.demiseMatches(1, y)
				}
			}
			if (IAxOR(game) != 0) {
				game.gamePosition = oldGamePosition
			}
			if (game.countMatchesAll() == 1) {
				game.show()
				log('You can play but i have already won :D')
				return
			}
		}
		log(chalk.green(`IA removed ${v} match(es) from line ${y}`))
		game.show()
	}
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
	if (game.countMatches(line) == 0) {
		log('Error: no merche in this line')
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
	if (matches - 1 > game.countMatches(line)) {
		log('Error: not enough matches on this line')
		return true
	}
	if (matches > 0 && matches - 1 < game.countMatches(line)) {
		return false
	} else {
		log('Error: invalid input (positive number expected)')
		return true
	}
}

startGame();

