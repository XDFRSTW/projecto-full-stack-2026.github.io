// Winston
var winston = require ('winston');

// Si ocurre un error inesperado el serviodor enviará este error.

const internalServerError = (err, req, res, next) => {
    winston.error(err);
    res.status(500).json({error: "Internal Server Error", message: "An inexpected error ocurred"});
    
};

module.exports = internalServerError;