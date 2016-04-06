var pty = require('pty.js'),
    command = process.argv[2],
    args = process.argv.slice(3);

var term = pty.spawn(command, args, {
  name: 'xterm-color',
  cwd: process.cwd(),
  env: process.env
})

term.pipe(process.stdout);
