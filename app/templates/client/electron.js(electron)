var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var win;

app.on('ready', function () {
    win = new BrowserWindow({ width: 800, height: 600, show: false });
    win.on('closed', function() {
        win = null;
    });

    win.loadUrl('file://' + __dirname + '/index.html');
    win.show();
});
