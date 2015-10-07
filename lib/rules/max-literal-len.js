/**
 * @fileoverview Rule to limit line lengths of literal arrays/objects
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Rule Definition

module.exports = function( context ) {
    var maxLiteralLineLength = context.options[ 0 ];

    function checkLength( node ) {
        if (
            node.loc.start.line === node.loc.end.line &&
            node.loc.end.column > maxLiteralLineLength
        ) {
            context.report( node, 'Literal line length exceeds ' + maxLiteralLineLength );
        }
    }

    return {
        'ArrayExpression': checkLength,
        'ObjectExpression': checkLength
    };
};

module.exports.schema = [
    {
        type: 'number'
    }
];
