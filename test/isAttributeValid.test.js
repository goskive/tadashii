var assert = require('assert');
var Tadashii = require('../src/index.js');
var fixtures = require('./fixtures.js');

describe('#isAttributeValid', function() {
  it("returns true when attribute is valid", function() {
    var isValid = Tadashii.isAttributeValid(fixtures.simpleNameSchema, fixtures.simpleNamePassingModel, 'first_name');

    assert.equal(isValid, true);
  });

  it("returns false when attribute is invalid", function() {
    var isValid = Tadashii.isAttributeValid(fixtures.simpleNameSchema, fixtures.simpleNameFailingModel, 'first_name');

    assert.equal(isValid, false);
  });
});
