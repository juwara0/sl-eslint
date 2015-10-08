/**
 * @fileoverview Tests for quote-attribute-value rule
 * @author Aziz Punjani
 */
'use strict';

// -----------------------------------------------------------------------------
// Requirements

var rule = require( '../../../rules/quote-attribute-value' );
var RuleTester = require( 'eslint' ).RuleTester;

// -----------------------------------------------------------------------------
// Tests

var ruleTester = new RuleTester();

ruleTester.run( 'quote-attribute-value ', rule, {
    valid: [
        { code: 'hbs`{{#sl-test-component someAttr="someVal"}}`', ecmaFeatures: { templateStrings: true } },
        { code: 'hbs`{{#sl-test-component someAttr=someVal}}`', ecmaFeatures: { templateStrings: true } },
        { code: "`{{ someAttr='someVal' }}`", ecmaFeatures: { templateStrings: true } }
    ],

    invalid: [
        {
            code: "hbs`{{#sl-test-component someAttr='someVal'}}`",
            ecmaFeatures: { templateStrings: true },
            errors: [
                'Use double quotes for attribute values'
            ]
        }
    ]
});
