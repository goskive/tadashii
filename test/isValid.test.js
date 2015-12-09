var assert = require('assert');
var Tadashii = require('../src/index.js').default;
var fixtures = require('./fixtures.js');

describe('#isValid', function() {
  it("returns true when model is valid", function() {
    var isValid = Tadashii.isValid(fixtures.simpleNameSchema, fixtures.simpleNamePassingModel);

    assert.equal(isValid, true);
  });

  it("returns false when model is invalid", function() {
    var isValid = Tadashii.isValid(fixtures.simpleNameSchema, fixtures.simpleNameFailingModel);

    assert.equal(isValid, false);
  });
});
