const getHtml = ({ email, name }) => {
  return `
  <p>Good day 👋</p>
  <p>${name} (<a href="mailto:${email}">${email}</a>) says hi!</p>
  `
}

const getText = ({ email, name }) => {
  return `
  Good day,\n\n
  ${name} (${email}) says hi!
  `
}

/**
 * Generates and merges the data into the html and text email templates defined here.
 *
 * @param {object} params The parameters to merge that are required by this template.
 * @param {string} params.name The name of the person who is greeting.
 * @param {string} params.email The email address of the person who is greeting.
 * @returns The html and text from the generated email template.
 */
exports.createFromTemplate = (params) => {
  return {
    html: getHtml(params),
    text: getText(params),
  }
}
