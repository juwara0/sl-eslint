/**
 * @fileoverview Rule to enforce situations where items should be delimited by
 *               the newline character
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Rule Definition

module.exports = function( context ) {
    var methods = context.options[ 0 ].methods || [];
    var properties = context.options[ 0 ].properties || [];

    return {
        'ArrayExpression': function( node ) {
            var parentName = ( node.parent && node.parent.key && node.parent.key.name ) || '';

            if (
                properties.indexOf( parentName ) > -1 &&
                node.elements.length > 0 &&
                node.loc.start.line === node.loc.end.line
            ) {
                context.report(
                    node,
                    '`' + node.parent.key.name + '` must be delimited by newlines'
                );
            }
        },

        'MemberExpression': function( node ) {
            var objectName = ( node.object && node.object.name ) || null;
            var propertyName = ( node.property && node.property.name ) || null;
            var methodName = [ objectName, propertyName ].join( '.' );

            if (
                'Ember' === objectName && methods.indexOf( methodName ) > -1 &&
                node.parent.arguments.some( function( arg, index, args ) {
                    return (
                        index > 0 &&
                        args[ index - 1 ].loc.start.line === arg.loc.start.line
                    ) ||
                    arg.loc.start.line === node.loc.start.line;
                })
            ) {
                context.report(
                    node,
                    'Ember.' + node.property.name +
                        ' must have its arguments on newlines'
                );
            }
        }
    };
};

module.exports.schema = [
    {
        'type': 'object',
        'properties': {
            'methods': { 'type': 'array' },
            'properties': { 'type': 'array' }
        }
    }
];
