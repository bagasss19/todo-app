'use strict';

const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account, email) => {
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            service: 'gmail',
             auth: {
      user: 'rahmathacep@gmail.com',
      pass: '123menang'
    }
        },
        {
            // default message fields

            // sender info
            from: 'Bagas Ganteng <example@nodemailer.com>',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    );

    // Message object
    let message = {
        // Comma separated list of recipients
        to: `${email}`,

        // Subject of the message
        subject: 'Selamat Datang di Aplikasi Todo!',

        // HTML body
        html: `<p><b>Selamat Datang</b></p>
        <p>Terima Kasih sudah mendaftar!</p>`,

        // AMP4EMAIL
        amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
          <p>Terima Kasih sudah mendaftar!</p>
          </body>
        </html>`
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
});

module.exports = nodemailer

