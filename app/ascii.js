'use strict';

var chalk = require('chalk');
var version = require('../package.json').version;

var title = chalk.green(
  '\n  nov,nov.   .novan;, no.    an: .nova.   ' +
  '\n  OVAN"VANo aNO\'  "ANo`AN.  nO" `"\'`nOv  ' +
  '\n  VAN   NOV NOV    ANO `NO.aN\'  .vanOVA  ' +
  '\n  ANO   OVA OVA.  ,NOV  `VAN\'  oV!  vAN  ' +
  '\n  NOV   VAN  `NOvaNO"    `n\'   `aNOV"NO  ') +
  '\n  ' + pad(version, 8) + '            ' + 'Fast Architecture' +
  '\n\n';

function pad(str, nb) {
  return str.length >= nb ? str.substr(0, nb) : str + Array(nb - str.length + 1).join(' ');
}

module.exports = title;
