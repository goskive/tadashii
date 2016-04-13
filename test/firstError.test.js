var assert = require('assert');
var Tadashii = require('../src/index.js');
var fixtures = require('./fixtures.js');

describe('#firstError', function() {
  it("returns null when model is valid", function() {
    var firstError = Tadashii.firstError(fixtures.simpleNameSchema, fixtures.simpleNamePassingModel);

    assert.equal(firstError, null);
  });

  it("returns error when model is invalid", function() {
    var firstError = Tadashii.firstError(fixtures.simpleNameSchema, fixtures.simpleNameFailingModel);

    assert.equal(firstError[0], 'first_name');
    assert.equal(firstError[1], 'minLength.fail');
  });
});
