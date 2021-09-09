const { address } = require("./variables")
const { createFromTemplate } = require("./templates")

/**
 * Gets data from the request context and
 * creates an object that represents an email.
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request payload.
 * @param {string} req.body.name The name of the person who is greeting.
 * @param {string} req.body.email The email address of the person who is greeting.
 */
exports.getEmail = (req) => {
  const { name } = req.body
  const subject = `${name} says hi`
  const { html, text } = createFromTemplate(parameters)
  return {
    from: address,
    to: address,
    subject,
    html,
    text,
  }
}
