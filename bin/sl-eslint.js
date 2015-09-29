#!/usr/bin/env node

var packageName = "sl-eslint";

var path = require('path');
var child_process = require('child_process');

var args = process.argv.slice(2);

// this is where it was called from and not a good way of doing it (but no worse than before)
var root = process.cwd();

// lint configuration file
var lintConfig = path.resolve(root, 'node_modules', packageName, '.eslintrc');
// lint rules directory
var lintRulesDir = path.resolve(root, 'node_modules', packageName, 'lib', 'rules');

var eslintPath = path.resolve('node_modules', 'sl-eslint', 'node_modules', '.bin', 'eslint');

var execPath = eslintPath + " --config " + lintConfig + " --rulesdir " + lintRulesDir + " " + args.join(" ");
console.log( execPath );

var cp = child_process.exec(execPath);
cp.stdout.pipe(process.stdout);
cp.stderr.pipe(process.stderr);
process.stdin.pipe(cp.stdin);

cp.on('error', function (err) {
  console.error('Error executing eslint at', eslintPath);
  console.error(err.stack);
});

cp.on('exit', function(code){
  // Wait few ms for error to be printed.
  setTimeout( function() {
    process.exit(code);
  }, 20);
});

process.on('SIGTERM', function() {
  cp.kill('SIGTERM');
  process.exit(1);
});



      /*
ARGS="$*"

run_linter () {
    $ROOT_DIR/node_modules/.bin/eslint \
        --config $ROOT_DIR/.eslintrc \
        --rulesdir $ROOT_DIR/lib/rules \
        $ARGS

    exit $?
}

PKG_NAME="sl-eslint"

ROOT_DIR="`npm root`/$PKG_NAME"
if [ -d $ROOT_DIR ]; then
    run_linter
fi

ROOT_DIR="`npm root -g`/$PKG_NAME"
if [ -d $ROOT_DIR ]; then
    run_linter
fi

exit 1
     */