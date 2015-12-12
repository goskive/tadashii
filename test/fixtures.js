module.exports = {
  simpleNameSchema: {
    first_name: [
      ['minLength', 8, 'minLength.fail'],
    ],

    email: [
      ['isEmail', 'isEmail.fail'],
    ],

    custom_validator: [
      [v => !!v, 'customValidator.fail'],
    ],

    custom_validator_with_args: [
      [
        (value, attribute, model, v1, v2) => v1 + value === v2,
        1,
        2,
        'customValidatorWithArgs.fail'
      ],
    ],
  },

  simpleNameFailingModel: {
    first_name: 'Kasper',
    email: 'woof@me',
    custom_validator: false,
    custom_validator_with_args: 2,
  },

  simpleNamePassingModel: {
    first_name: 'Kasper Janebrink',
    email: 'woofatme@example.org',
    custom_validator: true,
    custom_validator_with_args: 1,
  },
};
