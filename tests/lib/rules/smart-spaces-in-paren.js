/**
 * @fileoverview Tests for smart-spaces-in-paren rule
 * @author Josh Forisha
 */
'use strict';

// -----------------------------------------------------------------------------
// Requirements

var rule = require( '../../../lib/rules/smart-spaces-in-paren' );
var RuleTester = require( 'eslint' ).RuleTester;

// -----------------------------------------------------------------------------
// Tests

var ruleTester = new RuleTester();
ruleTester.run( 'smart-spaces-in-paren', rule, {
    valid: [
        "console.log( 'okay', 'good' )"
    ],

    invalid: [
        {
            code: "console.log( 'okay', 'bad')",
            errors: [
                { message: 'There must be a space inside this paren.' }
            ]
        },
        {
            code: "console.log('okay', 'bad' )",
            errors: [
                { message: 'There must be a space inside this paren.' }
            ]
        },
        {
            code: "console.log('okay', 'bad')",
            errors: [
                { message: 'There must be a space inside this paren.' },
                { message: 'There must be a space inside this paren.' }
            ]
        }
    ]
});
