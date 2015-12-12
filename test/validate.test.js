var assert = require('assert');
var Tadashii = require('../src/index.js');
var fixtures = require('./fixtures.js');

describe('#validate', function() {
  it("returns errors on failure", function() {
    var errors = Tadashii.validate(fixtures.simpleNameSchema, fixtures.simpleNameFailingModel);

    assert.equal(errors.first_name.length, 1);
    assert.equal(errors.email.length, 1);
    assert.equal(errors.custom_validator.length, 1);
    assert.equal(errors.custom_validator_with_args.length, 1);

    assert.equal(errors.first_name[0], 'minLength.fail');
    assert.equal(errors.email[0], 'isEmail.fail');
    assert.equal(errors.custom_validator[0], 'customValidator.fail');
    assert.equal(errors.custom_validator_with_args[0], 'customValidatorWithArgs.fail');
  });

  it("returns an empty array for valid fields", function() {
    var errors = Tadashii.validate(fixtures.simpleNameSchema, fixtures.simpleNamePassingModel);

    assert.equal(errors.first_name.length, 0);
    assert.equal(errors.email.length, 0);
    assert.equal(errors.custom_validator.length, 0);
    assert.equal(errors.custom_validator_with_args.length, 0);
  });
});
