const express = require("express");
const Post = require("../models/Post");

const router = express.Router();


// ======================================
// GET ALL POSTS
// ======================================

router.get("/", async (req, res) => {

    try {

        const posts = await Post.find()
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch posts"
        });

    }

});

// ======================================
// GET ONE POST
// ======================================

router.get("/:id", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch post"
        });

    }

});
// ======================================
// UPDATE A POST
// ======================================

router.put("/:id", async (req, res) => {

    try {

        const { title, author, content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                author,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPost) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.json(updatedPost);

    } catch (error) {

        res.status(400).json({
            message: "Failed to update post"
        });

    }

});
// ======================================
// DELETE A POST
// ======================================

router.delete("/:id", async (req, res) => {

    try {

        const deletedPost = await Post.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPost) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete post"
        });

    }

});
// ======================================
// CREATE A POST
// ======================================

router.post("/", async (req, res) => {

    try {

        const { title, author, content } = req.body;

        const newPost = new Post({
            title,
            author,
            content
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);

    } catch (error) {

        res.status(400).json({
            message: "Failed to create post"
        });

    }

});


module.exports = router;