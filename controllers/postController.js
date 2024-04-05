const logEvents = require('../middlewares/logEvents')
const database = require('../models/connection')
const {v4} = require('uuid')

const getUserPosts = (req, res)=>{ //get user posts
  database.query(`SELECT * FROM posts WHERE owner = '${req.user.payload}' ORDER BY post_timestamp DESC`)
  .then((result)=>{
    if(result.rows.length === 0) return res.json({posts: false})
    res.json({posts:result.rows})
  })
}

const createPost = (req, res)=>{ //creates a new post
  const {post_name, post_content} = req.body
  database.query(`INSERT INTO posts(id, post_name, post_content, owner) VALUES('${v4()}', '${post_name}', '${post_content}', '${req.user.payload}')`).then(()=>{
    res.status(301).redirect('../user/user-page')
  })
}

const deletePost = (req, res)=>{ //delete a post
  database.query(`DELETE FROM posts WHERE id = '${req.params.id}' AND owner = '${req.user.payload}'`)
}

const getFeedPosts = (req, res)=>{
  database.query(`SELECT * FROM posts INNER JOIN users ON posts.owner = users.id ORDER BY posts.post_timestamp DESC`)
  .then((result)=>{
    if(result.rows.length === 0) return res.json({posts: false})
    res.json({posts:result.rows})
  })
}

module.exports = { getUserPosts, createPost, deletePost, getFeedPosts }