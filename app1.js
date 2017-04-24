console.log('starting password manager');

var crypto = require('crypto-js');
var encKey = 'Admin123';

var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
	.command('create', 'Create a new account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			question: {
				demand: true,
				alias: 'q',
				description: 'Question for Security',
				type: 'string'
			},
			answer: {
				demand: true,
				alias: 'a',
				description: 'Answer for Security Question',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Get an existing account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

// create
//     --name
//     --username
//     --password

// get
//     --name

// account.name Facebook
// account.username User12!
// account.password Password123!

function createAccount (account) {
	var accounts = storage.getItemSync('accounts');

	if (typeof accounts === 'undefined') {
		accounts = [];
	}

	//------ Encryption of the Object -----
	var encAccount = crypto.AES.encrypt(JSON.stringify(account),encKey);
	
	console.log(encAccount);

	accounts.push(encAccount);
	storage.setItemSync('accounts', accounts);

	return account;
}

function getAccount (accountName) {
	var accounts = storage.getItemSync('accounts');
	var matchedAccount;

	accounts.forEach(function (account) {

		//--- Decrption of the object ---
		var bytes = crypto.AES.decrypt(account,encKey);
		var acccount1 = JSON.parse(bytes.toString(crypto.enc.Utf8));

		if (acccount1.name === accountName) {
			matchedAccount = account1;
		}
	});

	return matchedAccount;
}

if (command === 'create') {
	try	
	{
	var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password,
		question: argv.question,
		answer: argv.answer
	});
	console.log('Account created!');
	console.log(createdAccount);
}
catch(e) {
	console.log('Unable to create account');
}
} else if (command === 'get') {
	try
	{

	var fetchedAccount = getAccount(argv.name);

	if (typeof fetchedAccount === 'undefined') {
		console.log('Account not found');
	} else {
		console.log('Account found!');
		console.log(fetchedAccount);
	}
}
catch(e) {
	console.log('Unable to fetch the account');
}
}
