#!/usr/bin/env node

var CLIEngine = require( 'eslint' ).CLIEngine;
var fs = require( 'fs' );
var path = require( 'path' );

function exists( filePath ) {
    try {
        fs.statSync( filePath );
    } catch ( error ) {
        return false;
    }

    return filePath;
}

var lintConfig;
if ( lintConfig = (
    exists( path.resolve( process.cwd(), 'node_modules', 'sl-eslint', '.eslintrc' ) ) ||
    exists( path.resolve( process.cwd(), '.eslintrc' ) )
)) {
    var cli = new CLIEngine( fs.readFileSync( lintConfig ) );
    var report = cli.executeOnFiles( process.argv.slice( 2 ) );
    var formatter = cli.getFormatter();

    console.log( formatter( report.results ) );

    process.exit( report.errorCount > 0 ? 1 : 0 );
} else {
    console.error( 'No valid .eslintrc found' );
    process.exit( 1 );
}
