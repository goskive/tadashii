import * as validators from './validators';

function extractFunctionAndArguments(modelValue, attribute, model, options) {
  const isCustom = typeof options[0] === "function";
  const func = isCustom ? options[0] : validators[options[0]];
  /*
   * [validatorFunction, argumentsToValidator, errorMessage]
   */
  const args = options.slice(1, -1);
  const validatorArguments = [
    modelValue,
    attribute,
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
        .filter(options => {
          const [func, validatorArguments] =
            extractFunctionAndArguments(modelValue, attribute, model, options);

          return func(...validatorArguments) === false;
        })
        .map(options => {
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
  return !Object
    .keys(schema)
    .find(attribute => {
      const validations = schema[attribute];
      const modelValue = model[attribute];

      return !!validations.find(options => {
        const [func, validatorArguments] =
          extractFunctionAndArguments(modelValue, attribute, model, options);

        return func(...validatorArguments) === false;
      });
    });
}

/*
 * Return first error for model, or null if there is no error
 */
export function firstError(schema, model) {
  const firstFailedValidation = Object
    .keys(schema)
    .reduce((result, attribute) =>
      result.concat(
        schema[attribute].map(v => [attribute, v])
      )
    , [])
    .find(([attribute, validation]) => {
      const modelValue = model[attribute];
      const [func, validatorArguments] = extractFunctionAndArguments(modelValue,
                                                                     attribute,
                                                                     model,
                                                                     validation);

      return func(...validatorArguments) === false;
    });

  if (firstFailedValidation) {
    const [attribute, validation] = firstFailedValidation;

    return [attribute, validation[validation.length - 1]];
  } else {
    return null;
  }
}

/*
 * Returns an object with each attribute that is invalid and its first error
 */
export function firstErrors(schema, model) {
  return Object
    .keys(schema)
    .map(attribute => {
      const validations = schema[attribute];
      const modelValue = model[attribute];

      const error = validations.map(validation => {
        const [func, validatorArguments] = extractFunctionAndArguments(modelValue,
                                                                       attribute,
                                                                       model,
                                                                       validation);

        return func(...validatorArguments) ? null : validation[validation.length - 1];
      }).find(e => e !== null);

      return [attribute, error];
    })
    .filter(([attribute, error]) => error !== undefined)
    .reduce((result, [attribute, error]) => {
      result[attribute] = error;

      return result;
    }, {});
}

export function firstErrorForAttribute(schema, model, attribute) {
  const modelValue = model[attribute];
  const firstFailingValidation = schema[attribute]
    .find(validation => {
      const [func, validatorArguments] = extractFunctionAndArguments(modelValue,
                                                                     attribute,
                                                                     model,
                                                                     validation);

      return func(...validatorArguments) === false;
    });

  return !!firstFailingValidation ?
    firstFailingValidation[firstFailingValidation.length - 1] : null;
}

export function isAttributeValid(schema, model, attribute) {
  const validations = schema[attribute];

  return validations.find(validation => {
    const modelValue = model[attribute];
    const [func, validatorArguments] = extractFunctionAndArguments(modelValue,
                                                                   attribute,
                                                                   model,
                                                                   validation);

    return func(...validatorArguments) === false;
  }) === undefined;
}
