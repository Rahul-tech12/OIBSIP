import jwt from 'jsonwebtoken';

export const authMiddleware=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        res.status(401).send({
            message:'Token missing'
        })
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).send({message:'SOMETHING WENT WRONG'})
    }
}

export const adminOnly=(req,res,next)=>{
    if(req.user?.role!=='admin'){
        return res.status(403).send({message:'Only admin allowed to access.'})
    }
    next();
}

