import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { sendEmail } from "./mailtrap.config.js";

let sendingVerificationEmail = async (email, verificationToken) => {
    sendEmail(email, "Verify Your Email", VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken))
}

let sendWelcomeEmail = async (email, name) => {
    sendEmail(email, "Welcome to our website", WELCOME_EMAIL_TEMPLATE.replace("{name}", name))
}

let sendResetPasswordEmail = async (email, resetToken) => {
    sendEmail(email, "Reset Password", PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken))
}

let sendResetPasswordEmailSuccess = async (email) => {
    sendEmail(email, "Password Reset Success", PASSWORD_RESET_SUCCESS_TEMPLATE)
}

export {
    sendingVerificationEmail,
    sendWelcomeEmail,
    sendResetPasswordEmail,
    sendResetPasswordEmailSuccess
}