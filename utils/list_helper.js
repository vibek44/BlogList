const _ =require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (bloglist) => {
  const reducer=(sum,el) => {
    return sum+el.likes
  }

  return bloglist.length === 0
    ? 0
    : bloglist.reduce(reducer,0)

}

const favouriteBlog =(blogs) => {
  let blog = blogs[0]
  blogs.forEach(element => {
    if (element.likes>=blog.likes){
      blog=element 
    } 
  })
  
  return {
    title:blog.title,
    author:blog.author,
    likes:blog.likes
  }

}

const mostBlogs=(blogs) => {
  let max=0
  let obj=undefined
  const other= _.countBy(blogs, function(o) { return o.author })
  const other2=_.toPairs(other) 
  _.forEach(other2,function(key) {
    if (key[1]>max) {
      max=key[1]
      obj=key
    } 
  })
  return {
    author:obj[0],
    blogs:obj[1]
  }
}

const mostlikes=(blogs) => {
  let authormaxlikes=_.maxBy(blogs, function(o) {
    return o.likes
  })
  const authoralllikes=_.filter(blogs,function(o){
    return o.author===authormaxlikes.author
  })
  let totalLikes=_.reduce(authoralllikes,function(sum,el){return sum+el.likes},0)
  console.log(totalLikes)

  return {
    author:authormaxlikes.author,
    likes:totalLikes
  }
  
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostlikes
}

