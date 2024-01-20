const jwt=require('jsonwebtoken')
const config=require('./utils/config')

const tokenExtractor = (req,res,next) => {
  const authorization=req.get('authorization')
  if (authorization && authorization.startsWith('bearer')){
    req.token=(authorization.replace('bearer ','')) 
  }
  next() 
}

const userExtractor= async(req,res,next) => {
  req.user=jwt.verify(req.token,config.SECRET)
  
  next()
}

const unknownEndPoint=(req,res) => {
  return res.status(404).send({ error:'unknown endpoint' })
}

const errorHandler=(error,req,res,next) => {
  if(error.name==='CastError'){
    return res.status(400).send({ error:'malformatted id:' })
  }else if(error.name==='ValidationError'){
    return res.status(400).json({ error:error.message })
  }else if(error.name==='JsonWebTokenError'){
    return res.status(401).json({ error:'invalid token' })
  }
  else if(error.name==='TokenExpiredError'){
    return res.status(401).json({ error:'token expired' })
  }
  next(error)
}



module.exports={ tokenExtractor,userExtractor,unknownEndPoint,errorHandler }

