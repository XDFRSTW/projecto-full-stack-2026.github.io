const notFound = (req, res, next) => {
    res.status(404);
    return res.json({error: "Not found", message: "The requested resource was not found"});
};

module.exports = notFound;