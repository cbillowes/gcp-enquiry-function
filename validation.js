/**
 * Generates an error with an associated code.
 * @param {string} message
 * @returns That generated error.
 */
const validationError = (message, code) => {
  const error = new Error(message)
  error.code = code
  return error
}

/**
 * Validates the transport client.
 * Throws an error and 401 if it's invalid.
 * @param {object} client The email client transport configuration object
 */
exports.validateClientConfiguration = (client) => {
  if (!client) {
    throw validationError(
      "The client config has not been configured correctly.",
      401,
    )
  }
  const params = ["port", "host", "authMethod", "auth"]
  params.forEach((param) => {
    if (!client[param]) throw validationError(`The client config is missing the "${param}" parameter.`)
  })
}

/**
 * Validates the method for the request.
 * Forbidden if anything other than POST.
 * @param {string} param.method
 */
exports.validateRequestMethod = ({ method }) => {
  if (method !== "POST") {
    throw validationError("That data needs to be posted.", 403)
  }
}

/**
 * Validates the data provided in the request.
 * @param {object} body
 * @param {string} body.name
 * @param {string} body.email
 * @param {string} body.enquiry
 */
exports.validateData = ({ body }) => {
  if (!body) throw validationError("No data has been provided.", 400)

  const { name, email, enquiry } = body
  if (!name) throw validationError("Name is required.", 400)
  if (!email) throw validationError("Email is required.", 400)
  if (!enquiry) throw validationError("Enquiry is required.", 400)
}
