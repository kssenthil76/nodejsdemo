var argv = require('yargs')
	.command('adduser', 'Greets the user', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your first name goes here',
				type: 'string'
			},
			lastname: {
				demand: true,
				alias: 'l',
				description: 'Your last name goes here',
				type: 'string'
			},
			age: {
				demand: true,
				alias: 'a',
				description: 'Your age goes here',
				type: 'number'
			}
		}).help('help');
	})
	
	.help('help')
	.argv;
var command = argv._[0];

console.log(argv);

if (command === 'adduser' && typeof argv.name !== 'undefind' && typeof argv.lastname !== 'undefined' && typeof argv.age !== 'undefined') {
	console.log('Hello ' + argv.name + ' ' + argv.lastname + '(' + argv.age + ')!');	
} else if (command === 'adduser' && typeof argv.name !== 'undefined'  && typeof argv.lastname !== 'undefined') {
	console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');
} else if (command === 'adduser' && typeof argv.name !== 'undefined') {
	console.log('Hello ' + argv.name + '!');
} else if (command === 'adduser') {
	console.log('Hello world!');
}