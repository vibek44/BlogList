const mongoose=require('mongoose')
const  uniqueValidator=require('mongoose-unique-validator')

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    length:3
  },
  name:String,
  passwordHash:{ 
    type:String,
    required:true,
    length:3
  },
  blogs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Blog'
  }]

})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.passwordHash
    
  }
})


module.exports=mongoose.model('User',userSchema)