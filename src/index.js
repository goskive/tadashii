/*
 * Named validators. All validators gets the attribute, value & full model passed to them.
 */
const validators = {
  minLength:        (attribute, value, model, minLength) => value.length >= minLength,
  isRequired:       (attribute, value, model) => typeof value !== "undefined" && value !== null,
  isNotEmpty:       (attribute, value, model) => value.length > 0,
  isEmail:          (attribute, value, model) => true,
  matchesAttribute: (attribute, value, model, other_attribute) => model[attribute] === model[other_attribute],
};

function extractFunctionAndArguments(options) {
  const isCustom = typeof options[0] === "function";
  const func = isCustom ? options[0] : validators[options[0]];
  /*
   * [validatorFunction, argumentsToValidator, errorMessage]
   */
  const args = options.slice(1, options.length - 2); // get middle arguments
  const validatorArguments = [
    attribute,
    modelValue,
    model,
    ...args,
  ];

  return [func, validatorArguments];
}

/*
 * Map over each validator and return error messages for those that fail.
 */
export function validate(schema, model) {
  return Object
    .keys(schema)
    .reduce((result, attribute) => {
      const validations = schema[attribute];
      const modelValue = model[attribute];

      result[attribute] = validations
        .filter((options) => {
          const [func, validatorArguments] = extractFunctionAndArguments(options);

          return func.apply(null, validatorArguments);
        })
        .map((options) => {
          const errorMessage = options[options.length - 1];

          return typeof errorMessage === "function" ?
            errorMessage(modelValue) :
            errorMessage;
        });

        return result;
      }, 
      {}
    );
}





/*
 * Determine whether a model is valid according to its schema
 */
export function isValid(schema, model) {
  const validators = Object
    .keys(schema)
    .map(attribute => schema[attribute])
    .reduce((result, item) => result.concat(item), []);

  return validators.find(([func, args]) => func(args) === false);
}
