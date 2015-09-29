#!/usr/bin/env node

var CLIEngine = require( 'eslint' ).CLIEngine;
var fs = require( 'fs' );
var path = require( 'path' );

var cli = new CLIEngine( fs.readFileSync( path.resolve( process.cwd(), 'node_modules', 'sl-eslint', '.eslintrc' ) ) );
var report = cli.executeOnFiles( process.argv.slice( 2 ) );
var formatter = cli.getFormatter();

console.log( formatter( report.results ) );

process.exit( report.errorCount > 0 ? 1 : 0 );
