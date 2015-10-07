/**
 * @fileoverview Enforces JS spacing rules from softlayer/ember-style-guide
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Rule Definition

module.exports = function( context ) {
    var missingSpaceRegExp = /\([^ \)\r\n\{]|[^ \(\r\n\}]\)/mg;
    var rejectedSpaceRegExp = /\(( \{})|(\} )\)/mg;

    // -------------------------------------------------------------------------
    // Helpers

    var skipRanges = [];

    /**
     * Adds the range of a node to the set to be skipped when checking parens
     *
     * @private
     * @function
     * @param {ASTNode} node - The node to skip
     * @returns {undefined}
     */
    function addSkipRange( node ) {
        skipRanges.push( node.range );
    }

    /**
     * Sorts the skipRanges array. Must be called before shouldSkip
     *
     * @private
     * @function
     * @returns {undefined}
     */
    function sortSkipRanges() {
        skipRanges.sort( function( a, b ) {
            return a[ 0 ] - b[ 0 ];
        });
    }

    /**
     * Checks if a certain position in the source should be skipped
     *
     * @private
     * @function
     * @param {Number} position - The 0-based index in the source
     * @returns {Boolean} - Whether the position should be skipped
     */
    function shouldSkip( position ) {
        var i;
        var length;
        var range;

        for ( i = 0, length = skipRanges.length; i < length; i++ ) {
            range = skipRanges[ i ];

            if ( position < range[ 0 ] ) {
                break;
            }

            if ( position < range[ 1 ] ) {
                return true;
            }
        }

        return false;
    }

    // -------------------------------------------------------------------------
    // Public

    return {
        'Program:exit': function checkParenSpaces( node ) {
            var column;
            var line = 1;
            var match;
            var missingRegExp = /\([^\s\{\[\)]|[^\s\]\}\(]\)/mg;
            var nextLine;
            var position = 0;
            var source = context.getSource();

            function checkMatch( match, message ) {
                if ( '(' !== source.charAt( match.index ) ) {
                    // Matched a closing parenthesis pattern
                    match.index += 1;
                }

                if ( !shouldSkip( match.index ) ) {
                    while (
                        -1 !== ( nextLine = source.indexOf( '\n', position ) ) &&
                        nextLine < match.index
                    ) {
                        position = nextLine + 1;
                        line += 1;
                    }
                    column = match.index - position;

                    context.report( node, {
                        'line': line,
                        'column': column
                    }, message );
                }
            }

            sortSkipRanges();

            while ( null !== ( match = missingRegExp.exec( source ) ) ) {
                checkMatch( match, 'There must be a space inside this paren.' );
            }
        },

        // These nodes can contain parentheses that this rule doesn't care about

        LineComment: addSkipRange,

        BlockComment: addSkipRange,

        Literal: addSkipRange
    };
};
