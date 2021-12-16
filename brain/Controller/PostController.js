import PostSchema from "../schems/PostSchema.js"

class PostController {
    async create(req,res) {
        try {
            const {author, content, picture} = req.body
            const Post = await PostSchema.create({author, content, picture})
            res.json(Post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll (req, res) {
        try {
            const posts = await PostSchema.find();
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update (req, res) {
        try {
            const posts = req.body     
            if(!posts._id) {
                res.status(400).json('Не указан ID')
            }
            const updatedPosts = await PostSchema.findByIdAndUpdate(posts._id, posts, {new: true})
            return res.json(updatedPosts);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete (req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json('Не указан ID')
            }
            const posts = await PostSchema.findByIdAndDelete(id);
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController();