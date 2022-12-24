import express from 'express';

// After facing some challenges with facebook auth on Heroku, the following solution was identified
// which forces requests to be made as HTTPS
// https://stackoverflow.com/questions/8605720/how-to-force-ssl-https-in-express-js
const requireHTTPS = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.PROD) {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  next();
};

export default requireHTTPS;
