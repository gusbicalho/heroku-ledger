var express = require('express')
var app = express()

var ledgerBinary = 'ledger'
var LedgerCli = require('./node_modules/ledger-cli/lib/cli-runner.js').Cli
var cli = new LedgerCli(ledgerBinary, {debug: false})
//var Ledger = require('ledger-cli').Ledger

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  /*
  var ledger = new Ledger({
    binary: 'ledger',
    file: 'temp.dat'
  })
  ledger.version((err, version) => response.send(err || version))
  */
  var buffer = '';
  cli.exec(['--version']).stdout.pipe(response.type('txt'));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
