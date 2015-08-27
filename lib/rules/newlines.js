/**
 * @fileoverview Rule to enforce situations where items should be delimited by
 *               the newline character
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Rule Definition

module.exports = function( context ) {
    var methods = context.options && context.options.length > 0 ?
        context.options[ 0 ].methods || [] :
        [];

    var properties = context.options && context.options.length > 0 ?
        context.options[ 0 ].properties || [] :
        [];

    function checkItems( node, items, message ) {
        items.forEach( function( item, index, items ) {
            if (
                ( index > 0 && (
                    items[ index - 1 ].loc.start.line === item.loc.start.line ||
                    items[ index - 1 ].loc.end.line === item.loc.start.line
                )) ||
                node.loc.start.line === item.loc.start.line ||
                node.loc.end.line === item.loc.start.line
            ) {
                context.report( item, message );
            }
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
                node.elements && node.elements.length > 0
            ) {
                checkItems( node, node.elements, 'Array item must be delimited by newline' );
            }
        },

        'MemberExpression': function( node ) {
            var objectName = ( node.object && node.object.name ) || null;
            var propertyName = ( node.property && node.property.name ) || null;
            var methodName = [ objectName, propertyName ].join( '.' );

            if (
                methods.indexOf( methodName ) > -1 &&
                node.parent.arguments && node.parent.arguments.length > 0
            ) {
                checkItems(
                    node,
                    node.parent.arguments,
                    'Argument to `' + methodName + '` must be delimited by newline'
                );
            }
        },

        'ObjectExpression': function( node ) {
            if (
                node.loc.start.line !== node.loc.end.line &&
                node.properties && node.properties.length > 0
            ) {
                checkItems( node, node.properties, 'Object property must be delimited by newline' );
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
