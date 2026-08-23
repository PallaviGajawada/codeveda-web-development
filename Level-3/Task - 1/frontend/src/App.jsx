import { useEffect, useState } from "react";
import "./App.css";

function App() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingPost, setEditingPost] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: ""
    });


    // =================================
    // GET POSTS
    // =================================

    const fetchPosts = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts"
            );

            const data = await response.json();

            setPosts(data);

        } catch (error) {

            console.error("Error fetching posts:", error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchPosts();

    }, []);


    // =================================
    // HANDLE INPUT
    // =================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =================================
    // OPEN CREATE FORM
    // =================================

    const openCreateForm = () => {

        setEditingPost(null);

        setFormData({
            title: "",
            author: "",
            content: ""
        });

        setShowForm(true);

    };


    // =================================
    // OPEN EDIT FORM
    // =================================

    const openEditForm = (post) => {

        setEditingPost(post);

        setFormData({
            title: post.title,
            author: post.author,
            content: post.content
        });

        setShowForm(true);

    };


    // =================================
    // CREATE / UPDATE
    // =================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            let url = "http://localhost:5000/api/posts";

            let method = "POST";


            // If editing

            if (editingPost) {

                url = `http://localhost:5000/api/posts/${editingPost._id}`;

                method = "PUT";

            }


            const response = await fetch(
                url,
                {
                    method: method,

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to save post"
                );

            }


            // Reset form

            setFormData({
                title: "",
                author: "",
                content: ""
            });


            setEditingPost(null);

            setShowForm(false);


            // Refresh posts

            fetchPosts();


        } catch (error) {

            console.error(
                "Error saving post:",
                error
            );

        }

    };


    // =================================
    // DELETE POST
    // =================================

    const deletePost = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );


        if (!confirmed) {

            return;

        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/posts/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to delete post"
                );

            }


            fetchPosts();


        } catch (error) {

            console.error(
                "Error deleting post:",
                error
            );

        }

    };


    return (

        <div className="app">

            {/* =================================
                NAVBAR
            ================================= */}

            <header className="navbar">

                <h1>
                    Blog Manager
                </h1>

                <button
                    className="create-btn"
                    onClick={openCreateForm}
                >
                    + New Post
                </button>

            </header>


            <main className="container">

                {/* =================================
                    HERO
                ================================= */}

                <section className="hero">

                    <div>

                        <p className="eyebrow">
                            CONTENT DASHBOARD
                        </p>

                        <h2>
                            Manage your blog
                        </h2>

                        <p>
                            Create, edit and manage your blog
                            posts from one simple dashboard.
                        </p>

                    </div>

                </section>


                {/* =================================
                    FORM
                ================================= */}

                {showForm && (

                    <section className="form-card">

                        <div className="form-header">

                            <h3>
                                {editingPost
                                    ? "Edit Post"
                                    : "Create New Post"}
                            </h3>

                            <button
                                className="close-btn"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingPost(null);
                                }}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter post title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />


                            <label>
                                Author
                            </label>

                            <input
                                type="text"
                                name="author"
                                placeholder="Enter author name"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />


                            <label>
                                Content
                            </label>

                            <textarea
                                name="content"
                                placeholder="Write your post..."
                                value={formData.content}
                                onChange={handleChange}
                                rows="6"
                                required
                            />


                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingPost(null);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="create-btn"
                                >
                                    {editingPost
                                        ? "Update Post"
                                        : "Create Post"}
                                </button>

                            </div>

                        </form>

                    </section>

                )}


                {/* =================================
                    POSTS
                ================================= */}

                <section className="posts-section">

                    <div className="section-header">

                        <h3>
                            Recent Posts
                        </h3>

                        <span>
                            {posts.length}{" "}
                            {posts.length === 1
                                ? "post"
                                : "posts"}
                        </span>

                    </div>


                    {loading ? (

                        <div className="empty-state">

                            <p>
                                Loading posts...
                            </p>

                        </div>

                    ) : posts.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                📝
                            </div>

                            <h3>
                                No posts yet
                            </h3>

                            <p>
                                Create your first blog post
                                to get started.
                            </p>

                            <button
                                className="create-btn"
                                onClick={openCreateForm}
                            >
                                Create First Post
                            </button>

                        </div>

                    ) : (

                        <div className="posts-grid">

                            {posts.map((post) => (

                                <article
                                    className="post-card"
                                    key={post._id}
                                >

                                    <h3>
                                        {post.title}
                                    </h3>

                                    <p className="post-author">
                                        By {post.author}
                                    </p>

                                    <p className="post-content">
                                        {post.content}
                                    </p>


                                    <div className="post-actions">

                                        <button
                                            onClick={() =>
                                                openEditForm(post)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            onClick={() =>
                                                deletePost(post._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>

    );

}

export default App;