const chalk = require('chalk');
const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/ConverterBTC');

describe('ConverterBTC', () => {

  let consoleStub;

  const responseMock = {
    "success": true,
    "time": '2017-10-26 21:55:29',
    "price": 5831.78,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should use currency USD and 1 as amount default', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'USD',
        amount: 1,
      })
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(5831.78)}`);
      done();
    }, 300);
  });

  it('should use currency USD and 10 as amount default', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'USD',
        amount: 10,
      })
      .reply(200, responseMock);

    convertBTC('USD', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(5831.78)}`);
      done();
    }, 300);
  });

  it('should use currency BRL and 1 as amount default', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'BRL',
        amount: 1,
      })
      .reply(200, responseMock);

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(5831.78)}`);
      done();
    }, 300);
  });

  it('should message user when api reply with error', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'BRL',
        amount: 1,
      })
      .replyWithError('Error');

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Try in a few minutes'));
      done();
    }, 300);
  });

});
