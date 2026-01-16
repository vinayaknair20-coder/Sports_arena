import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { MessageSquare, Heart, Send, ImageIcon, MoreHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const SocialFeedPage = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/api/social/posts/');
            setPosts(res.data);
        } catch (err) {
            toast.error('Failed to load community feed');
        } finally {
            setLoading(false);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        try {
            const res = await api.post('/api/social/posts/', { content });
            setPosts([res.data, ...posts]);
            setContent('');
            toast.success('Post shared!');
        } catch (err) {
            toast.error('Login to share your thoughts');
        }
    };

    return (
        <div className="pt-32 pb-16 px-4 container max-w-3xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-black mb-2">COMMUNITY HUB</h1>
                <p className="text-text-muted">Connect, share, and inspire fellow athletes</p>
            </div>

            {/* Create Post */}
            <div className="glass-card p-6 rounded-3xl mb-8">
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        className="w-full bg-background border border-border rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-4"
                        placeholder="What's on your mind? Share your sports highlights..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                        <button type="button" className="text-text-muted hover:text-white flex items-center gap-2">
                            <ImageIcon size={20} /> <span className="text-sm font-medium">Add Image</span>
                        </button>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                        >
                            <Send size={18} /> POST
                        </button>
                    </div>
                </form>
            </div>

            {/* Feed */}
            {loading ? (
                <div className="text-center py-10 font-bold">Connecting to community...</div>
            ) : (
                <div className="flex flex-col gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="glass-card rounded-3xl overflow-hidden animate-fade-in">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center font-black text-xl">
                                        {post.user.username[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{post.user.username}</h4>
                                        <p className="text-xs text-text-muted">{new Date(post.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <MoreHorizontal className="text-text-muted cursor-pointer" />
                            </div>

                            <div className="p-6">
                                <p className="text-lg leading-relaxed">{post.content}</p>
                                {post.image && (
                                    <img src={post.image} alt="post" className="w-full h-auto rounded-2xl mt-4 border border-white/10" />
                                )}
                            </div>

                            <div className="p-4 bg-white/5 flex items-center gap-6">
                                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Heart size={20} /> <span className="font-bold">{post.likes_count}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-accent transition-colors">
                                    <MessageSquare size={20} /> <span className="font-bold">{post.comments.length}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SocialFeedPage;
