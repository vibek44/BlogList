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

module.exports={ tokenExtractor,userExtractor }

