var assert = require('assert');
var Tadashii = require('../src/index.js');
var fixtures = require('./fixtures.js');

describe('#firstErrorForAttribute', function() {
  it("returns null when attribute is valid", function() {
    var firstError = Tadashii.firstErrorForAttribute(
                      fixtures.simpleNameSchema,
                      fixtures.simpleNamePassingModel, 'first_name');

    assert.equal(firstError, null);
  });

  it("returns error when attribute is invalid", function() {
    var firstError = Tadashii.firstErrorForAttribute(
                      fixtures.simpleNameSchema,
                      fixtures.simpleNameFailingModel,
                      'first_name');


    assert.equal(firstError, 'minLength.fail');
  });
});
