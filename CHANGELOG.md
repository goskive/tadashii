# 2.3.0
Adds the `firstErrorForAttribute` function:
```
Tadashii.firstErrorForAttribute(schema, invalidModel, attribute); // => "some_value"
Tadashii.firstErrorForAttribute(schema, validModel, attribute); // => null
```

# 2.2.0
Adds the `firstErrors` function:

```
Tadashii.firstErrors(schema, model) // => {someAttribute: "error", otherAttribute: "error"};
```

# 2.1.0
Adds the `isAttributeValid` function:

```
Tadashii.isAttributeValid(schema, model, attribute); // => true or false
```

# 2.0.0

## Exports
Functions are now exported like:

```js
export function validate()
export function isValid
```

which means you will have to change your `requires` and `imports`:

```js
// old
var Tadashii = require('tadashii');
import Tadashii from 'tadashii';
// new
var Tadashii = require('tadashii').default;
import * as Tadashii from 'tadashii';
// or just import functions individually
const { validate, isValid } = require('tadashii');
import { validate, isValid } from 'tadashii';
```

## firstError
It's often necessary to get the first error of a model. 2.0.0 adds the `firstError` function:

```js
Tadashii.firstError(schema, invalidModel); // => ["attributeName", "some.error.string"]
Tadashii.firstError(schema, validModel); // => null
```
