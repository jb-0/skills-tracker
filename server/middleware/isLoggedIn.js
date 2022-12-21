const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/user/loginfailure');
  }
};

module.exports = isLoggedIn;
