var express = require('express')
var app = express()
var fs = require('fs')
var escape = require('shell-escape')
var Cli = require('./cli-runner.js').Cli

var ledgerBinary = 'ledger'
var ledgerCli = new Cli(ledgerBinary)

function execAndPipe(cli, args, stdoutDest, onError) {
  var proc = cli.exec(args)
  proc.stdout.pipe(stdoutDest)
  proc.stderr.on('error', onError)
}

var wrapInArray = (s) => [s]

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app
.get('/', (req, res) => {
  console.log('GET /')
  execAndPipe(
    new Cli(ledgerBinary),
    ['--version'],
    res.type('text/plain'),
    (error) => res.setStatus(500).send(error)
  )
})
.get('/sample/bal', (req, res) => {
  console.log('GET /sample/bal')
  execAndPipe(
    new Cli(ledgerBinary),
    ['-f','sample.dat','bal'],
    res.type('text/plain'),
    (error) => res.setStatus(500).send(error)
  )
})
.get('/sample/ad-hoc', (req, res) => {
  console.log('GET /sample/ad-hoc')
  execAndPipe(
    new Cli(ledgerBinary),
    ['-f','sample.dat'].concat(req.query.q.map(wrapInArray).map(escape)),
    res.type('text/plain'),
    (error) => res.setStatus(500).send(error)
  )
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
