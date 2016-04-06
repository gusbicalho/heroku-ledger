var _ = require('lodash'),
    pty = require('pty.js')
    raw_spawn = require('child_process').spawn
    spawn = function(command, args) {
      return raw_spawn('node', ['tty-run', command].concat(args));
    };

var Cli = (function() {
  function Cli(command, options) {
    this.command = command;
    this.options = _.defaults({}, options, { debug: false });
  }

  Cli.prototype.exec = function(args) {
    var process = this.spawn(args);

    if (this.options.debug) {
      this.logging(process);
    }

    return process;
  };

  Cli.prototype.spawn = function(args) {
    this.log(this.command + ' ' + args.join(' '));

    var process = spawn(this.command, args);

    process.stdout.setEncoding('utf8');
    process.stderr.setEncoding('utf8');

    return process;
  };

  Cli.prototype.logging = function(process) {
    var log = this.log.bind(this);

    process.stdout.on('data', function(data) { log('stdout: ' + data); });
    process.stderr.on('data', function(error) { log('stderr: '+ error); });
    process.once('close', function(code) { log('child process exited with code ' + code); });
  };

  Cli.prototype.log = function(msg) {
    if (this.options.debug) {
      console.log(msg);
    }
  };

  return Cli;
})();

module.exports.Cli = Cli;
