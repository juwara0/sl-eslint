'use strict';

module.exports = function( context ) {
    return {
        'TemplateLiteral': function( node ) {
            const source = context.getSource( node );
            const startLine = node.loc.start.line;
            const attributeRegex = /\w+='[^']*'/g;
            const doubleCurlyRegex = /{{.+}}/;
            const lines = source.split( "\n" );

            lines.forEach( function( line, index ) {
                let match;

                if( doubleCurlyRegex.test( line ) ) {
                    while ( match = attributeRegex.exec( line ) ) {
                        context.report( node, {
                            'line': ( startLine + index ),
                            'column': match.index
                        }, 'Use double quotes for attribute values' );
                    }
                }
            });
        }
    };
};
