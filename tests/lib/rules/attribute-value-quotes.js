/**
 * @fileoverview Tests for attribute-value-quotes rule
 * @author Aziz Punjani
 */
'use strict';

// -----------------------------------------------------------------------------
// Requirements

var rule = require( '../../../lib/rules/attribute-value-quotes' );
var RuleTester = require( 'eslint' ).RuleTester;

// -----------------------------------------------------------------------------
// Tests

var ruleTester = new RuleTester();

ruleTester.run( 'attribute-value-quotes ', rule, {
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
