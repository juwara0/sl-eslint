/**
 * @fileoverview Tests for newlines rule
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Requirements

var rule = require( '../../../lib/rules/newlines' );
var RuleTester = require( 'eslint' ).RuleTester;

// -----------------------------------------------------------------------------
// Tests

var ruleTester = new RuleTester();
ruleTester.run(
    'newlines',
    rule,
    {
        valid: [
            "[ 'okay', 'good' ]",
            "[\n    'okay',\n    'good'\n]",
            "var test = { okay: true }",
            "var test = {\n    okay: true\n}",
            "[\n    'okay',\n    { okay: true }\n]"
        ],

        invalid: [
            {
                code: "[ 'okay', 'nope'\n]",
                errors: [
                    'Array item must be delimited by newline',
                    'Array item must be delimited by newline'
                ]
            },
            {
                code: "[\n    'okay', { okay: false }\n]",
                errors: [
                    'Array item must be delimited by newline'
                ]
            },
            {
                code: "var test = { okay: false\n}",
                errors: [
                    'Object property must be delimited by newline'
                ]
            }
        ]
    }
);
