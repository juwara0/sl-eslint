#!/usr/bin/env node

var packageName = "sl-eslint";

var path = require( 'path' );
var child_process = require( 'child_process' );

var args = process.argv.slice( 2 );

// this is where it was called from and not a good way of doing it (but no worse than before)
var root = process.cwd();

// lint configuration file
var lintConfig = path.resolve( root, 'node_modules', packageName, '.eslintrc' );
// lint rules directory
var lintRulesDir = path.resolve( root, 'node_modules', packageName, 'lib', 'rules' );

var eslintPath = path.resolve( 'node_modules', 'sl-eslint', 'node_modules', '.bin', 'eslint' );
var execPath = eslintPath + " --config " + lintConfig + " --rulesdir " + lintRulesDir + " " + args.join( " " );

var cp = child_process.exec( execPath );
cp.stdout.pipe( process.stdout );
cp.stderr.pipe( process.stderr );
process.stdin.pipe( cp.stdin );

cp.on( 'error', function catchError( err ) {
  console.error( 'Error executing eslint at', eslintPath );
  console.error( err.stack );
});

cp.on( 'exit', function catchExit( code ) {
  // Wait few ms for error to be printed.
  setTimeout( function() {
    process.exit( code );
  }, 20 );
});

process.on( 'SIGTERM', function catchSigterm() {
  cp.kill( 'SIGTERM' );
  process.exit( 1 );
});
