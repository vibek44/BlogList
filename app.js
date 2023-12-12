const express=require('express')
const app=express()

app.get('/',(req,res) => {
  res.send('<h1>Homepage</h1>')
})
app.get('/api/blogs',(req,res) => {
   res.send('<h1>okei</h1>')
})

module.exports=app