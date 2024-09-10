import jwt from 'jsonwebtoken';

export const isUserAuthenticated = async (req, res, next)=>{
    
    const {auth_token} = req.cookies;

    if(!auth_token){
        return next(new Error('You need to login to access this resource'))
    }
    try {
        const decoded = jwt.verify(auth_token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        next(error)
    }
}

export const isAuthorizedUser = (...roles)=> {
    return (req, res, next)=>{
      if(!roles.includes(req.user.role)){
        return next(new Error('Unauthorized User'))
      }
      next()
    }
  }