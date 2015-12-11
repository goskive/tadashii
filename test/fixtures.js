module.exports = {
  simpleNameSchema: {
    first_name: [
      ['minLength', 8, 'minLength.fail'],
    ],

    email: [
      ['isEmail', 'isEmail.fail'],
    ],
  },

  simpleNameFailingModel: {
    first_name: 'Kasper',
    email: 'woof@me',
  },

  simpleNamePassingModel: {
    first_name: 'Kasper Janebrink',
    email: 'woofatme@example.org'
  },
};
