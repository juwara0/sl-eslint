'use strict';

module.exports = function( context ) {
    return {
        'TaggedTemplateExpression': function( node ) {
            if ( node.tag.name === 'hbs') {
                var source = context.getSource( node );
                var startLine = node.tag.loc.start.line;
                var regex = /\w+='[^']*'/g;
                var lines = source.split( "\n" );

                lines.forEach( function( line, index ) {
                    var match;

                    while ( match = regex.exec( line ) ) {
                        context.report( node, {
                            'line': startLine + index,
                            'column': match.index
                        }, 'Use double quotes for attribute values' );
                    }
                });
            }
        }
    };
};
