const jwt = require('jsonwebtoken');


const getUser = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (token == null) {
        res.status(401).send("Unauthenticated User");
    }

    try {
        // Get the user from the jwt token and append id to the req object
        const data = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send("Unauthenticated User");
    }
}

module.exports = getUser;