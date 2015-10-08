'use strict';

module.exports = function( context ) {
    return {
        'TaggedTemplateExpression': function( node ) {
            const source = context.getSource( node );
            const startLine = node.tag.loc.start.line;
            const regex = /\w+='[^']*'/g;
            const lines = source.split( "\n" );

            lines.forEach( function( line, index ) {
                let match;

                while ( match = regex.exec( line ) ) {
                    context.report( node, {
                        'line': ( startLine + index ),
                        'column': match.index
                    }, 'Use double quotes for attribute values' );
                }
            });
        }
    };
};
