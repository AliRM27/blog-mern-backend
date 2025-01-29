import PostModel from "../models/Post.js"

export const getAll = async(req, res) => {
    try{
        const posts = await PostModel.find().populate("user").exec() // to get full information about the user

        res.json(posts)
    } catch (err){
        console.log(err)
        res.status(505).json({
            message: "Could not find posts",
        })
    }
}

export const getOne = async(req, res) => {
    try{
        const postId = await req.params.id // get the dynamic parametar

        PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewNumber: 1 } },
            { returnDocument: "after" } // or new: true
        )
        .then(doc => {
            if(!doc){
                return res.status(404).json({ 
                    message: "Could not find the post" 
                })
            }
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json({ 
                message: "Could not return the post" 
            })
        })
    } catch (err){
        console.log(err)
        res.status(505).json({
            message: "Could not get posts",
        })
    }
}

export const remove = async(req, res) => {
    try{
        const postId = await req.params.id // get the dynamic parametar

        PostModel.findOneAndDelete({
            _id: postId
        })
        .then(doc => {
            if(!doc){
                return res.status(404).json({
                    message: "Could not find the post",
                })
            }

            res.json({
                message: "Post deleted"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(505).json({
                message: "Could not delete the post",
            })
        })

    } catch (err){
        console.log(err)
        res.status(505).json({
            message: "Could not get posts",
        })
    }
}

export const create = async(req, res) => {
    try{
        const doc = new PostModel({
            title:  req.body.title,
            text:  req.body.text,
            tags:  req.body.tags,
            imageUrl:  req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch(err){
        console.log(err)
        res.status(505).json({
            message: "Could not create post",
        })
    }
}

export const update = async(req, res) => {
    try{
        const postId = await req.params.id

        await PostModel.updateOne({
            _id: postId
        }, {
            title:  req.body.title,
            text:  req.body.text,
            tags:  req.body.tags,
            imageUrl:  req.body.imageUrl,
            user: req.userId
        })

        res.json({
            message: "Chnaged the post"
        })
    } catch(err){
        console.log(err)
        res.status(505).json({
            message: "Could not update post",
        })
    }
}