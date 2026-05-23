import Ajv from 'ajv'

function createValidator(schema) {
  const ajv = new Ajv()
  return ajv.compile(schema)
}

export function getLoginRequestValidator() {
  const schema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 1
      },
      password: {
        type: 'string',
        minLength: 1
      }
    },
    required: ['username', 'password'],
    additionalProperties: false
  }
  return createValidator(schema)
}


export function formatAjvValidationErrors(errors) {
  const ajv = new Ajv()
  return ajv.errorsText(errors, { separator: '\n' })
}

export function getCartRequestValidator() {
  const schema = {
    type: 'object',
    properties: {
      productId: {
        type: 'number'
      }
    },
    required: ['productId'],
    additionalProperties: false
  }
  return createValidator(schema)
}
