/**
 * @fileoverview Tests for max-literal-len rule
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Requirements

var rule = require( '../../../lib/rules/max-literal-len' );
var RuleTester = require( 'eslint' ).RuleTester;

// -----------------------------------------------------------------------------
// Tests

var ruleTester = new RuleTester();
var lineLength = 80;
ruleTester.run(
    'max-literal-len',
    rule,
    {
        valid: [
            {
                code: "[ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ]",
                options: [ lineLength ]
            },
            {
                code: "var test = { one: 'one', two: 'two', three: 'three', four: 'four' };",
                options: [ lineLength ]
            }
        ],

        invalid: [
            {
                code: "[ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven' ]",
                errors: [
                    'Literal line length exceeds ' + lineLength
                ],
                options: [ lineLength ]
            },
            {
                code: "var test = { one: 'one', two: 'two', three: 'three', four: 'four', five: 'five' }",
                errors: [
                    'Literal line length exceeds ' + lineLength
                ],
                options: [ lineLength ]
            }
        ]
    }
);
