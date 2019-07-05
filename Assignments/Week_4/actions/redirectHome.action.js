const redirectHome = (req, res, next) => {
  if (req.session && req.session.token) {
    res.redirect('/home');
  } else {
    next();
  }
}

module.exports = redirectHome;