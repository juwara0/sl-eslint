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

    function startOnSameLine( node, items ) {
        return items.some( function( arg, index, args ) {
            return (
                index > 0 &&
                args[ index - 1 ].loc.start.line === arg.loc.start.line
            ) ||
            arg.loc.start.line === node.loc.start.line;
        });
    }

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

            if (
                node.loc.start.line !== node.loc.end.line &&
                node.elements && node.elements.length > 0 &&
                startOnSameLine( node, node.elements )
            ) {
                var name = 'Array';

                if ( node.parent.id && node.parent.id.name ) {
                    name += ' `' + node.parent.id.name + '`';
                }

                context.report( node, name + ' must have its items delimited by newlines' );
            }
        },

        'MemberExpression': function( node ) {
            var objectName = ( node.object && node.object.name ) || null;
            var propertyName = ( node.property && node.property.name ) || null;
            var methodName = [ objectName, propertyName ].join( '.' );

            if (
                methods.indexOf( methodName ) > -1 &&
                node.parent.arguments && node.parent.arguments.length > 0 &&
                startOnSameLine( node, node.parent.arguments )
            ) {
                context.report( node, methodName + ' must have its arguments on newlines' );
            }
        },

        'ObjectExpression': function( node ) {
            if (
                node.loc.start.line !== node.loc.end.line &&
                node.properties && node.properties.length > 0 &&
                startOnSameLine( node, node.properties )
            ) {
                var name = 'Object';

                if ( node.parent.id && node.parent.id.name ) {
                    name += ' `' + node.parent.id.name + '`';
                }

                context.report( node, name + ' must have its properties delimited by newlines' );
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
