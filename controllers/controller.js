import user from "../model/UserModel.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import generateTokensetCookie from "../utils/generateToken.js"
import {
    sendingVerificationEmail,
    sendResetPasswordEmail,
    sendResetPasswordEmailSuccess,
    sendWelcomeEmail
} from "../email/email.js"
let signUp = async (req, res) => {
    let { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    } else {
        let checkAlreadyEmail = await user.findOne({ email })
        if (checkAlreadyEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        } else {
            let verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
            let passwordHash = await bcrypt.hash(password, 10)
            let newUser = new user({
                name,
                email,
                password: passwordHash,
                verificationToken,
                verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000
            })
            await newUser.save()
            generateTokensetCookie(res, newUser._id)
            await sendingVerificationEmail(newUser.email, verificationToken)
            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: {
                    ...newUser._doc,
                    password: "********"
                }
            })


        }
    }
}
let login = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    } else {
        let users = await user.findOne({ email })
        if (!users) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        let isMatch = await bcrypt.compare(password, users.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }
        generateTokensetCookie(res, users._id)
        users.lastLogin = Date.now()
        await users.save()
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                ...users._doc,
                password: "********"
            }
        })

    }
}

let emailVerify = async (req, res) => {
    let { code } = req.body
    if (!code) {
        return res.status(400).json({
            success: false,
            message: "Please provide verification code"
        })
    }
    let users = await user.findOne({ verificationToken: code, verificationTokenExpire: { $gt: Date.now() } })

    if (!users) {
        return res.status(400).json({
            success: false,
            message: "Invalid verification code"
        })
    }
    users.isVerified = true
    users.verificationToken = undefined
    users.verificationTokenExpire = undefined
    await users.save()
    await sendWelcomeEmail(users.email, users.name)
    return res.status(200).json({
        success: true,
        message: "Email verified successfully",
        data: {
            ...users._doc,
            password: "********"
        }
    })


}

let logout = async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}
let forgotPassword = async (req, res) => {
    let { email } = req.body
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Please provide email"
        })
    }
    let users = await user.findOne({ email })
    if (!users) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
    let resetPasswordToken = crypto.randomBytes(20).toString("hex")
    users.resetPasswordToken = resetPasswordToken
    users.resetPasswordExpire = Date.now() + 1 * 60 * 60 * 1000
    await users.save()
    await sendResetPasswordEmail(users.email, `${process.env.CLIENT_URL}/rest-password/${resetPasswordToken}`)
    return res.status(200).json({
        success: true,
        message: "Reset password link sent to your email"
    })

}

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await user.findOne({
			resetPasswordToken: token,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetPasswordEmailSuccess(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

let check_Token = async (req, res) => {
	try {
		const users = await user.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, users });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export {
    signUp, login, emailVerify, logout, forgotPassword, resetPassword, check_Token
}