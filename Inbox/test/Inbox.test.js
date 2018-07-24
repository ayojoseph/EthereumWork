const assert = require ('assert');
const ganache = require ('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
  //get list of all accounts
  //this is async and will always return a promise (promise syntax below)

  // web3.eth.getAccounts()
  //   .then(fetchedAccounts => {
  //     console.log(fetchedAccounts);
  //   });


  //async syntax using a declared variable (newer way)
  accounts = await web3.eth.getAccounts();



  //use on of the accounts to deloy contract on local test network
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send( { from: accounts[0], gas: '1000000' } );

});

describe('Inbox', () => {
  it('it deploys a contract', () => {
    // console.log(inbox);
    assert.ok(inbox.options.address); //assert ok makes sure that the passed in object is not null or exists

  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('Can change the message', async () => {
    await inbox.methods.setMsg('bye').send({ from: accounts[0] }); // send and specify who the transaction is coming from
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });

});

















// class Car {
//   park() {
//     return 'stopped';
//   }
//   drive() {
//     return'vroom';
//   }
// }
// let car;
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car Class Test w/ Describe', () => {
//   it('can park', () => {
//     assert.equal(car.park(),'stopped');
//   } );
//
//   it('can drive', () => {
//     assert.equal(car.drive(),'vroom');
//   });
// });
