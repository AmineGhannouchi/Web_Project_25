const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user.role) return res.sendStatus(401); //Unauthorized 
        const rolesArray = [...allowedRoles];

        const result = rolesArray.includes(req.user.role) //if user can have more than 1 role ://req.user.role.map(role => rolesArray.includes(role)).find(val => val === true); //true if at least one of the roles is in the rolesArray
        if (!result) return res.sendStatus(403); //Forbidden 
        next(); //proceed to the next middleware or route handler
    }
}


module.exports = verifyRoles;