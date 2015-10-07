'use strict';

module.exports = function( context ) {
    return {
        'TaggedTemplateExpression': function( node ) {
            const source = context.getSource( node );
            const startLine = node.tag.loc.start.line;
            const regex = new RegExp( "\\w+='\\w+'", 'g' );
            const lines = source.split( "\n" );

            let currentLine = startLine;

            lines.forEach( function( line ) {
                let match;

                while (match = regex.exec( line ) ) {
                    context.report( node, {
                        'line': currentLine,
                        'column': match.index
                    }, 'Use double quotes for attribute value' );
                }

                currentLine++;
            });
        }
    };
};
