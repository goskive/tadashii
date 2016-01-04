var Tadashii = require("tadashii").default;

var customValidator = function(value, attribute, model, arg) {
  return value === arg;
};

var schema = {
  first_name: [
    ["isRequired", "Please provide a first name"],
    ["minLength", 1, "Please provide a name longer than one character"],
  ],
  email: [
    ["isEmail", "Please provide a valid email"],
  ],
  custom: [
    [customValidator, "mustbethisstring", "Please set to 'mustbethisstring'"],
  ],
};

var model = {
  first_name: null,
  email: "myemail@example.org",
  custom: "notthisstring",
};

var errors = Tadashii.validate(schema, model);

console.log(errors);
