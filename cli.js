// Const autocomplete = require('cli-autocomplete');
const cliui = require('cliui');
const chalk = require('chalk');

const ui = cliui({width: process.stdout.columns});
const data = {articles: [
	{article: 'Cola', price: '2,5', quantity: '0'},
	{article: 'Wasser', price: '4', quantity: '6'}
]};

function displayWelcome() {
	console.log('Hey there! Have some stuff we have:');

	for (const k in data.articles) {
		const obj = data.articles[k];
		ui.div(
			`  ${chalk.bold(obj.article)}  ${obj.price}€  ${obj.quantity >= 1 ? chalk.green('IN STOCK') : chalk.red('OUT OF STOCK')}`
		);
	}

	console.log(ui.toString());
}

displayWelcome();
