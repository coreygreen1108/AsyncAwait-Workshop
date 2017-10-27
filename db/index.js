const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/banking', {logging: false});

let User = db.define('user', {
    name: Sequelize.STRING,
    ssn: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NOT AMERICAN'
    }
});

let Account = db.define('account', {
    balance: Sequelize.INTEGER,
    category: Sequelize.ENUM('Checking', 'Savings', 'Brokerage')
})

//before we validate
//validate that we can do something
//after we validate

//before we do something
//we have to do something.
//after we do something.

User.hook('beforeCreate', (user) => {
    user.ssn  = encrpytFn(user.ssn);
    return user;
})

function encrpytFn(someSSN){
    console.log('hello!!');
    return someSSN.replace('2', 'A');
}

User.belongsToMany(Account, {through: 'user_account'}) //this will allow us to add accounts to user. User.addAccount()
Account.belongsToMany(User, {through: 'user_account'}) //this will allow us to add users to accounts. Account.addUser()

// User.bulkCreate([{
//     name: 'Doug',
//     ssn: '123-45-689'
// },{
//     name: 'Leah',
//     ssn: '123-65-689'
// },{
//     name: 'Mary',
//     ssn: '523-45-689'
// }])
// .then(users => {
//     console.log('users made!');
// })
// Account.bulkCreate([{
//     balance: 100,
//     category: 'Checking'
// }, {
//     balance: 50,
//     category: 'Checking'
// },{
//     balance: 15000,
//     category: 'Savings'
// },])
// .then(accounts => {
//     console.log('accounts made!'); 
// // })
// let mAccount;
// Account.findById(3)
// .then(account => {
//     mAccount = account;
//     return User.findById(3);
// })
// .then(user => {
//     return mAccount.addUser(user); 
// })

module.exports = { db, User, Account }; // ES6

