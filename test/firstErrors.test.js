var assert = require('assert');
var Tadashii = require('../src/index.js');
var fixtures = require('./fixtures.js');

describe('#firstErrors', function() {
  it("returns empty object when model is valid", function() {
    var errors = Tadashii.firstErrors(fixtures.simpleNameSchema, fixtures.simpleNamePassingModel);

    assert(Object.keys(errors).length === 0);
  });

  it("returns errors when model is invalid", function() {
    var errors = Tadashii.firstErrors(fixtures.simpleNameSchema, fixtures.simpleNameFailingModel);

    assert.equal(errors.first_name, 'minLength.fail');
    assert.equal(errors.email, 'isEmail.fail');
    assert.equal(errors.custom_validator, 'customValidator.fail');
    assert.equal(errors.required_min_length_combined, 'isRequired.fail');
  });
});
