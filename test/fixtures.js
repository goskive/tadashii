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

    required_min_length_combined: [
      ['isRequired', 'isRequired.fail'],
      ['minLength', 5, 'minLength.fail'],
    ]
  },

  simpleNameFailingModel: {
    first_name: 'Kasper', // Failing because of minLength 8
    email: 'woof@me',
    custom_validator: false,
    custom_validator_with_args: 2,
    required_min_length_combined: undefined,
  },

  simpleNamePassingModel: {
    first_name: 'Kasper Janebrink',
    email: 'woofatme@example.org',
    custom_validator: true,
    custom_validator_with_args: 1,
    required_min_length_combined: "blabla",
  },
};
