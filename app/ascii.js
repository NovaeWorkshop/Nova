'use strict';

var chalk = require('chalk');
var version = require('../package.json').version;

var title = chalk.green(
'\n  ooo. .oo.    .ooooo.  oooo    ooo  .oooo.   ' +
'\n  `888P"Y88b  d88\' `88b  `88.  .8\'  `P  )88b  ' +
'\n   888   888  888   888   `88..8\'    .oP"888  ' +
'\n   888   888  888   888    `888\'    d8(  888  ' +
'\n  o888o o888o `Y8bod8P\'     `8\'     `Y888""8o ') +
'\n  ' + pad(version, 8) + '                  ' + chalk.bgBlack('Fast Architecture') +
'\n\n';

function pad (str, nb) {
  return str.length >= nb ? str.substr(0, nb) : str + Array(nb - str.length + 1).join(' ');
}

module.exports = title;
