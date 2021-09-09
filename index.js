"use strict"

const mailer = require("nodemailer")
const { client } = require("./variables")
const { getEmail } = require("./data")
const {
  validateClientConfiguration,
  validateRequestMethod,
  validateData,
} = require("./validation")

/**
 * Responds to an HTTP POST request from Cloud Tasks and sends an email using data
 * from the request body.
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request payload.
 * @param {string} req.body.email Email address of contact person.
 * @param {string} req.body.name Name of the contact person.
 * @param {string} req.body.enquiry The enquiry.
 * @param {object} res Cloud Function response context.
 */
exports.sendEmail = async (req, res) => {
  try {
    // A valid transport client configuration is required so that
    // nodemailer can do its thing.
    validateClientConfiguration(client)

    // Guard clause to verify that this request is a POST.
    validateRequestMethod(req)

    // Guard clause to validate that the required data has been provided.
    validateData(req)

    // Generates an email data object that will be used as the
    // nodemailer e-data description to send the email.
    const data = getEmail(req)

    // https://nodemailer.com/usage/
    // To send emails you need one instance of a transporter object.
    // It is the object that is able to send mail
    // and its configuration object contains the connection url
    // or a transport plugin instance. In our case, it is the client
    // data configured from the ENV VARs in our config file.
    const transporter = mailer.createTransport(client)
    transporter.sendMail(data, (err, info) => {
      if (err) {
        const error = new Error(err)
        error.code = 500
        throw error
      }

      // Send OK to Cloud Task queue to delete task.
      res.status(200).send(info)
    })
  } catch (error) {
    // Any status code other than 2xx or 503 will trigger the task to retry.
    res.status(error.code).send(error.message)
  }
}
