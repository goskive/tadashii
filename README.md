# tadashii

```js
import { validated, isValid } from 'tadashii';
```

## Introduction
The API is quite trivial. There are two concepts: schemas and models.

### Models
A model is just a plain javascript object with your data to be validated.

```js
const user = {
    first_name: "Kasper",
    last_name: "Janebrink",
};
```

### Schema
A schema quite simply describes the structure of your model and how its validated. Additionally for each validator an error message for when a validation failed should be supplied. We do not provide standard error messages.

```js
const userSchema = {
    first_name: [
        ["isRequired", "Please provide a first name"],
        ["minLength", 1, "Please provide a name longer than one character"],
    ],
    email: [
        ["isEmail", "Please provide a valid email"],
    ],
};
```


### Schema + model
Combining your schema and model we're able to get answers to these questions:

1. Is your model valid according to the schema?
2. What are the error messages for each attribute?

## Example

```js
import { validate, isValid } from 'tadashi';

const schema = {
    first_name: [
        ["minLength", 2, "First name must be at least two characters long"]
    ],
    email: [
        ["isEmail", "Email is not in a valid format"]
    ],
};

const model = {
    first_name:  "K",
    email: "kasper@woof"
};

isValid(schema, model); # => false
validate(schema model); # =>
/*
    {
        first_name: ["First name must be at least two characters long"],
        email: ["Email is not in a valid format"],
    }
 */
```

## Custom validators
To provide maximum flexibility you can pass a function instead of a named validation. The validators signature looks like this:

```js
function validator(value, attribute, model, additionalArgument) {
    return true || false;
}
```

Any additional arguments in the schema is passed to the validator:

```js
// This function gets two additional arguments
function customValidator(value, attribute, model, additional, argument) {
    console.log(additional + argument);
    return false;
}

const schema = {
    first_name: [
        [customValidator, "first", "second", "Custom validator error message"]
    ]
};

const model = {first_name: "Hopla"};

isValid(schema, model) # => false;
// console output: "first second"
```

## Default error messages
I am reluctant to include any default error messages, as I've never experienced default ones that fits all bills. Rather than including defaults that 1) are not localised and 2) don't fit all UIs, I've chosen to leave them out.
