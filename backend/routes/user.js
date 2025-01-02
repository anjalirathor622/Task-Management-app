const User = require("../models/user")
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Sign In
router.post("/signin", async (req, res) => {
	try {
		const { username } = req.body
		const { email } = req.body
		const existingUser = await User.findOne({ username: username })
		const existingEmail = await User.findOne({ email: email })

		if (existingUser) {
			return res.status(400).json({ message: "username already exist" })
		} else if (username.length < 3) {
			return res
				.status(400)
				.json({ message: "username atleast have four characters" })
		}
		if (existingEmail) {
			return res.status(400).json({ message: "Email already exist" })
		}

		const hashPasswowrd = await bcrypt.hash(req.body.password, 10)
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashPasswowrd
		})
		await newUser.save()
		return res
			.status(200)
			.json({ message: "Sign in successfully", newUser })
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: "Internal Server Error" })
	}
})

//Login
router.get("/login", async (req, res) => {
	try {
		const { username, password } = req.body
		const existingUser = await User.findOne({ username: username })
		if (!existingUser) {
			return res.status(400).json({ message: "Invalid Credentials" })
		}
		bcrypt.compare(password, existingUser.password, (err, data) => {
			if (data) {
				const authclaims = [
					{ name: username },
					{ jti: jwt.sign({}, `${process.env.JWT_SECRET}`) }
				]
				const token = jwt.sign(
					{ authclaims },
					`${process.env.JWT_SECRET}`,
					{ expiresIn: "2d" }
				)
				res.status(200).json({ id: existingUser._id, token: token })
			} else {
				return res.status(400).json({ message: "Invalid Credentials" })
			}
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: "Internal Server Error" })
	}
})
module.exports = router
