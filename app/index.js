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
  console.log('GET /')
  var proc = cli.exec(['--version'])
  proc.stdout.pipe(response.type('text/plain'));
  proc.stderr.on('error', (error) => {
    response.setStatus(500).send(error);
  })
})
.get('/sample/bal', (req, res) => {
  console.log('GET /sample/bal')
  cli.exec(['-f','sample.dat','bal']).stdout
  .pipe(res.type('txt'));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
