import express from 'express';

const isLoggedIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/api/user/loginfailure');
  }
};

export default isLoggedIn;
