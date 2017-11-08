#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const converterBTC = require('./ConverterBTC');

program
  .version(pkg.version)
  .description('Converter Bitcoin to any currency provided')
  .option('-C, --currency <currency>', 'Currency to be convert. (Default: USD)')
  .option('-A, --amount <amount>', 'Value in Bitcoin to converter. (Default: 1)')
  .parse(process.argv);

converterBTC(program.currency, program.amount);
