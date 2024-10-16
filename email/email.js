import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { client, sender } from "./mailtrap.config.js";

let sendingVerificationEmail = async (email, verificationToken) => {
    let recipient = [{ email }]
    try {
        let emailVerification = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Email",
        })
        console.log("Verification email sent successfully:", emailVerification)
    } catch (e) {
        console.log(e)
    }
}

let sendWelcomeEmail = async (email, name) => {
    let recipient = [{ email }]
    try {
        let welcomeEmailVerification = await client.send({
            from: sender,
            to: recipient,
            template_uuid: "a872a191-9319-409d-bf87-b552a38619f7",
            template_variables: {
                "company_info_name": "Rehman Official",
                "name": name
            }
        })
        console.log("Verification email sent successfully:", welcomeEmailVerification)
    } catch (e) {
        console.log(e)
    }
}

let sendResetPasswordEmail = async (email, resetToken) => {
    let recipient = [{ email }]
    try {
        let resetPasswordEmail = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken),
            category: "Reset Password"
        })
        console.log("Reset Password email sent successfully:", resetPasswordEmail)
    } catch (e) {
        console.log(e)
    }

}

let sendResetPasswordEmailSuccess = async (email) => {
    let recipient = [{ email }]
    try {
        let resetPasswordEmailSuccess = await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Password Success"
        })
        console.log("Reset Password email success sent successfully:", resetPasswordEmailSuccess)
    } catch (e) {
        console.log(e)
    }

}

export {
    sendingVerificationEmail,
    sendWelcomeEmail,
    sendResetPasswordEmail,
    sendResetPasswordEmailSuccess
}