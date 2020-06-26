const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require('fs');
const path = require("path");
require("dotenv").config();
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        type: "login", // default
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
console.log("Email transport initialized.")

// HTML Email Templates
// Four types of emails:
// 1. The project owner receives a request.
const requestFilepath = path.join(__dirname, 'templates/teamRequest.html');
const requestSource = fs.readFileSync(requestFilepath, 'utf-8').toString();
const requestTemplate = handlebars.compile(requestSource);
// 2. Verification of project join request.
const verificationFilepath = path.join(__dirname, "templates/teamRequestConfirm.html");
const verificationSource = fs.readFileSync(verificationFilepath, "utf-8").toString();
const verificationTemplate = handlebars.compile(verificationSource);

// 3. The mentor receives a mentorship request.
const mentorshipRequestFilepath = path.join(__dirname, 'templates/mentorRequest.html');
const mentorshipRequestSource = fs.readFileSync(mentorshipRequestFilepath, 'utf-8').toString();
const mentorshipRequestTemplate = handlebars.compile(mentorshipRequestSource);
// 4. Verification that your mentorship request was received.
const mentorshipVerificationFilepath = path.join(__dirname, "templates/mentorRequestConfirm.html");
const mentorshipVerificationSource = fs.readFileSync(mentorshipVerificationFilepath, 'utf-8').toString();
const mentorshipVerificationTemplate = handlebars.compile(mentorshipVerificationSource);
// 5. Verification that a project was submitted.
const projectSubmissionFilepath = path.join(__dirname, "templates/projectSubmitConfirm.html");
const projectSubmissionSource = fs.readFileSync(projectSubmissionFilepath, 'utf-8').toString();
const projectSubmissionTemplate = handlebars.compile(projectSubmissionSource);


const BUILD_CONNECT_EMAIL = "buildconnectteam@gmail.com";

/**
 * Sends an email to both the user making the join request and 
 * the project owner.
 * @param {object} user user making the request
 * @param {String} message personalized message the user wrote.
 * @param {String} ownerEmail the email of the project owner
 */
const sendJoinRequestEmails = async (user, message, proj, ownerEmail, cb) => {
    
    // User -> Owner message
    const replacements = {
        studentEmail: user.email,
        studentName: user.name,
        message: message,
        projectName: proj.projectName,
    };
    const joinHtmlToSend = requestTemplate(replacements);
    const joinMailOptions = {
        from: "Build Connect <buildconnectteam@gmail.com>",
        to: ownerEmail,
        bcc: BUILD_CONNECT_EMAIL,
        subject: "Team Member Join Request",
        html: joinHtmlToSend,
    };
    await transporter.sendMail(joinMailOptions);

    // User automated message
    const verificationHtmlToSend = verificationTemplate({userName:user.name});
    const verificationEmailOptions = {
        from: "Build Connect <buildconnectteam@gmail.com",
        to: user.email,
        subject: "Team Join Request Verification",
        html: verificationHtmlToSend,
    }

    transporter.sendMail(verificationEmailOptions, (err, info) => {
        console.log(nodemailer.getTestMessageUrl(info));
        cb({})
    });
};

const sendMentorshipRequest = async (user, message, mentorName, mentorEmail, cb) => {
    let firstName = mentorName.split(" ").slice(0, -1).join(' ')

    const replacements = {
        mentorFirstName: firstName,
        studentEmail: user.email,
        studentName: user.name,
        message: message,
    };
    console.log("Replacements: ");
    console.log(replacements);

    const requestHtmlToSend = mentorshipRequestTemplate(replacements);
    const mentorshipMailOptions = {
        from: "Build Connect <buildconnectteam@gmail.com>",
        to: "jccamacho19992@gmail.com",
        bcc: BUILD_CONNECT_EMAIL,
        subject: "Mentorship Request",
        html: requestHtmlToSend,
    };
    await transporter.sendMail(mentorshipMailOptions);
    // User automated message
    let verificationReplacements = {
        studentName: user.name,
    }
    const verificationHtmlToSend = mentorshipVerificationTemplate(verificationReplacements);
    const verificationEmailOptions = {
        from: "Build Connect <buildconnectteam@gmail.com",
        to: user.email,
        subject: "Mentorship Request Verification",
        html: verificationHtmlToSend,
    }

    transporter.sendMail(verificationEmailOptions, (err, info) => {
        console.log("Email sent!");
        cb({});
    });
}

const sendProjectSubmittedEmail = async (user, project, cb) => {
    const replacements = {
        studentName: user.name,
        projectName: project.projectName,
    };
    const projectHtmlToSend = projectSubmissionTemplate(replacements);
    const projectMailOptions = {
        from: "Build Connect <buildconnectteam@gmail.com>",
        to: user.email,
        bcc: BUILD_CONNECT_EMAIL,
        subject: "BuildConnect Project Submission Confirmation",
        html: projectHtmlToSend,
    };
    await transporter.sendMail(projectMailOptions, (err, info) => {
        console.log("Email sent!");
        cb({})
    });
}

module.exports = {
    sendJoinRequestEmails: sendJoinRequestEmails,
    sendMentorshipRequest: sendMentorshipRequest,
    sendProjectSubmittedEmail
}