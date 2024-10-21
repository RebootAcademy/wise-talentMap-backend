const isAuth = (req, res, next) => {
    if (
      !req.headers.authorization ||
      req.headers.authorization !== process.env.TOKEN
    ) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    } else {
        next()
    }
}

module.exports = isAuth