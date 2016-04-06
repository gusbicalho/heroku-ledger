var express = require('express')
var app = express()
var fs = require('fs')

var ledgerBinary = 'ledger'
var LedgerCli = require('./cli-runner.js').Cli
var cli = new LedgerCli(ledgerBinary)
//var Ledger = require('ledger-cli').Ledger

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app
.get('/', function(request, response) {
  cli.exec(['--version']).stdout
  .pipe(response.type('txt'));
})
.get('/sample/bal', (req, res) => {
  cli.exec(['-f','sample.dat','bal']).stdout
  .pipe(res.type('txt'));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
