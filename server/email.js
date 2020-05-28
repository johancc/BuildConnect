const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require('fs');
const path = require("path");

let transporter = undefined;
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });
    console.log("Email transport initialized.")
});

// HTML Email Templates

const requestFilepath = path.join(__dirname, 'templates/request.html');
const requestSource = fs.readFileSync(requestFilepath, 'utf-8').toString();
const requestTemplate = handlebars.compile(requestSource);

const verificationFilepath = path.join(__dirname, "templates/verification.html");
const verificationSource = fs.readFileSync(verificationFilepath, "utf-8").toString();
const verificationTemplate = handlebars.compile(verificationSource);


/**
 * Sends an email to both the user making the join request and 
 * the project owner.
 * @param {object} user user making the request
 * @param {String} message personalized message the user wrote.
 * @param {String} ownerEmail the email of the project owner
 */
const sendJoinRequestEmails = async (user, message, ownerEmail, cb) => {
    
    // User -> Owner message
    const replacements = {
        userEmail: user.email,
        userName: user.name,
        userEmail: message,
    };
    const joinHtmlToSend = requestTemplate(replacements);
    const joinMailOptions = {
        from: "Build Connect <buildconnect@gmail.com>",
        to: ownerEmail,
        subject: "Team Member Join Request",
        html: joinHtmlToSend,
    };
    await transporter.sendMail(joinMailOptions);

    // User automated message
    const verificationHtmlToSend = verificationTemplate({});
    const verificationEmailOptions = {
        from: "Build Connect <buildconnect@gmail.com",
        to: user.email,
        subject: "Team Join Request Verification",
        html: verificationHtmlToSend,
    }

    transporter.sendMail(verificationEmailOptions, (err, info) => {
        console.log("Sent!")
        console.log(err);
        console.log(info);
        console.log(nodemailer.getTestMessageUrl(info));
        cb({})
    });
};


module.exports = {
    sendJoinRequestEmails: sendJoinRequestEmails
}