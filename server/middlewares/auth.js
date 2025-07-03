import jwt from 'jsonwebtoken';

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const requiredRoles = roles;
        const isValid = decoded.roles.map(role => requiredRoles.includes(role)).find(result => result === true);

      if (roles.length && !isValid) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
