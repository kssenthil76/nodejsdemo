var storage = require('node-persist');
storage.initSync();

storage.setItemSync('accounts', [{
    username: 'Senthil',
    balanace: 100
},
{
    username: 'Mahima',
    balanace: 200
}
,
{
    username: 'Prathikna',
    balanace: 300
}
]);

var accounts = storage.getItemSync('accounts');

//push on a new accounts
accounts.push({
    unsername: 'Ruthvick',
    balance: 400
});

storage.setItemSync('accounts', accounts);

console.log(accounts);