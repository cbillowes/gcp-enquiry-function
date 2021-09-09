<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Cloud Functions - HTTP functions sample

See:

* [HTTP functions documentation][docs]
* [HTTP functions tutorial][tutorial]
* [HTTP functions sample source code][code]

[docs]: https://cloud.google.com/functions/docs/writing/http
[tutorial]: https://cloud.google.com/functions/docs/tutorials/http
[code]: index.js

## Deploy and run the sample

See the [HTTP functions tutorial][tutorial].

## Run the tests

1. Read and follow the [prerequisites](../../#how-to-run-the-tests).

1. Install dependencies:

        npm install

1. Run the tests:

        npm test


## About

This function makes use of nodemailer. The env vars declared are below. You can configure them as part of the function.

## Deploy

```
gcloud functions deploy enquiry \
  --region europe-west2 \
  --entry-point sendEmail \
  --runtime nodejs14 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars=^,^EMAIL_ADDRESS=<email>,EMAIL_PORT=587,EMAIL_HOST=mail.privateemail.com,EMAIL_USERNAME=<email>,EMAIL_PASSWORD=<password>
```
