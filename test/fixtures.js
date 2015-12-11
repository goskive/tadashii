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
    ]
  },

  simpleNameFailingModel: {
    first_name: 'Kasper',
    email: 'woof@me',
    custom_validator: false,
  },

  simpleNamePassingModel: {
    first_name: 'Kasper Janebrink',
    email: 'woofatme@example.org',
    custom_validator: true,
  },
};
