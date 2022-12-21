const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getUser = require('../middlewares/getUser')


//ROUTE 1 -  creating a user using POST request ('api/auth/createuser'), No login required
router.post('/createuser', [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // check if the request is valid or not else return it as a bad request 
    if (!errors.isEmpty()) {
        res.status(400).json({ success,errors: errors.array() })
    }

    try {
        // check if user with this email already exists or not
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({success,message:"User with this email already exists"})
        }

        // creating a hashed password to make it more secure
        const salt = await bcrypt.genSalt(10);
        const password = req.body.password;
        const hashPass = await bcrypt.hash(password, salt);

        // creating a user and saving the hashed password in database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPass
        })

        // sending an jwt token only, not the whole user information
        const data = {
            user: {
                id: user.id
            }
        }

        // with the help of this token, we can get the "data" that we have used and also can find if anyone has made any changes(tempering) in it or not
        const jwtToken = jwt.sign(data, process.env.JWT_TOKEN);
        success = true;
        return res.json({success, jwtToken })
        // return res.send(hashPass);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Some error occured");
    }

})




// ROUTE 2 - authenticating a user using POST request '/api/auth/login/', No login required
router.post('/login', [
    body('email').isEmail()
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }

    // using destructuring we will take email and passward out of the body as 
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({success, error: "Please enter correct credentials to login" })
        }

        const arePasswordMatching = await bcrypt.compare(password, user.password);
        if (arePasswordMatching == false) {
            res.status(400).json({ success,error: "Please enter correct credentials to login" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const jwtToken = jwt.sign(data, process.env.JWT_TOKEN);
        success = true;
        return res.json({ success,jwtToken })


    } catch (err) {
        res.status(500).send(err.message);

    }
})




// ROUTE-3 -- Get details of logged in user using POST 'api/auth/getUser', login required
router.post('/getuser',getUser,async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password') 
        res.send({user});
        

    } catch (error) {
        res.status(500).send("Internal Server Error!!!")
        
    }
})


module.exports = router