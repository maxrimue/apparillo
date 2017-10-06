const readline = require('readline');
const cliui = require('cliui');
const chalk = require('chalk');

const ui = cliui({width: process.stdout.columns});
const data = {articles: [
	{title: 'Cola', price: '2,5', quantity: '0'},
	{title: 'Wasser', price: '4', quantity: '6'},
	{title: 'Fanta', price: '2', quantity: '2'}
]};
addArticleNumbers();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function normalizeNumber(n) {
	if (n < 10) {
		n = String('0' + n);
	}

	return n;
}

function addArticleNumbers() {
	for (const k in data.articles) {
		if ({}.hasOwnProperty.call(data.articles, k)) {
			data.articles[k].number = normalizeNumber(Number(k) + 1);
		}
	}
}

function findArticle(number) {
	for (const k in data.articles) {
		if ({}.hasOwnProperty.call(data.articles, k)) {
			if (data.articles[k].number === number) {
				return k;
			}
		}
	}

	return false;
}

function displayWelcome() {
	console.log('Hey there! Have some stuff we have:');

	for (const k in data.articles) {
		if ({}.hasOwnProperty.call(data.articles, k)) {
			const obj = data.articles[k];
			ui.div(
				`  ${chalk.bold(obj.number)} ${chalk.bold(obj.title)}  ${obj.price}€  ${obj.quantity >= 1 ? chalk.green('IN STOCK') : chalk.red('OUT OF STOCK')}`
			);
		}
	}

	console.log(ui.toString());
}

displayWelcome();
rl.question('Please enter an article number: ', answer => {
	console.log(`You chose: ${answer}`);

	const k = findArticle(answer);

	if (k) {
		const article = data.articles[k];
		console.log(`That's ${article.title}!`);
		if (article.quantity >= 1) {
			console.log(`It's in stock and costs ${article.price}€`);
		} else {
			console.log('However, it\'s not in stock... Bummer');
		}
	} else {
		console.log('Unfortunately, that one doesn\'t exist. lol');
	}

	rl.close();
});
