module.exports = {
  // The email address the emails will be sent from and to
  address: process.env.EMAIL_ADDRESS,

  // The transport configuration for nodemailer
  // https://nodemailer.com/smtp/#examples
  client: {
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    authMethod: "LOGIN",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
}
