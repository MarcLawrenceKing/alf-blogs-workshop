const Post = require('../models/postModel')
const deleteFile = require('../utils/deleteFile')
//CREATE
//@desc    create a post
//@route   POST /posts
//access   Public

const createPost = async (req, res) =>{
    if (!req.body){
        res.status(400).json({error: 'No request body'})
    }

    const {title, author, content } = req.body //destructure

    //const {path} = req.file
    const path = req.file?.path ?? null //so cover photo is optional
    

    try {
        const post = new Post({
            title,
            author,
            content,
        })

        const newPost = await post.save()

        if (newPost){
            res.status(201).json(newPost)
        }
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
}
//READ
//@desc    Get all posts
//@route   Get /posts
//access   Public

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find() //no param will return everything

        res.json(posts)
    } catch (error) {
        console.log('error')
    }
}

//READ
//@desc    Get specified posts
//@route   Get /posts/:id
//access   Public

const showPost = async (req, res) => {
    try {
        const {id} = req.params

        const post = await Post.findById(id) //no param will return everything

        if (!post){
            res.status(404).json({error: 'post not found'})
        }

        res.json(post)
    } catch (error) {
        console.log('error')
    }
}

//UPDATE
//@desc    update a post
//@route   put/patch /posts/:id ==> patch = kung ano nilagay yun lng iibahin
//access   Public
const updatePost = async (req, res) =>{
    if (!req.body){
        res.status(400).json({error: 'No request body'})
    }

    const { id } = req.params
    const { title, author, content } = req.body //destructure

    //const {path} = req.file
    const path = req.file?.path ?? null //so cover photo is optional
    
    try {
        // find the post
        const originalPost = await Post.findById(id)
        // if no post, return
        if (!originalPost){
            return res.status(404).json({error: 'Original post not found'})
        }
        // ? handle deleting of previous photos
        // only delete previous photo if there is a new uploaded file
        if (originalPost.cover_photo && path){
            deleteFile(originalPost.cover_photo)
        }

        // update fields of original post
        originalPost.title = title
        originalPost.author = author
        originalPost.content = content
        originalPost.cover_photo = path

        // save post
        const updatedPost = await originalPost.save()

        // return
        res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
}
//DELETE
//@desc    delete a post
//@route   DEL /posts/:id
//access   Public
const deletePost = async (req, res) => {
    try {
        const {id} = req.params

        const post = await Post.findByIdAndDelete(id) //no param will return everything

        if (!post){
            res.status(404).json({error: 'post not found'})
        }

        if (post.cover_photo){
            deleteFile(post.cover_photo)
        }

        res.status(200).json({message: "Successfully deleted post"})

    } catch (error) {
        console.log('error')
    }
}
module.exports = {
    getAllPosts, //export the function
    createPost,
    updatePost,
    deletePost,
    showPost    
}