import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Edit, Trash2, Plus, Calendar, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Layout from "@/components/Layout";
import { usePosts, Post } from "@/hooks/usePosts";
import { useToast } from "@/hooks/use-toast";

const AuthorDashboard = () => {
  const { posts, loading, deletePost } = usePosts();
  const { toast } = useToast();
  const [authorName, setAuthorName] = useState("");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [showAuthorInput, setShowAuthorInput] = useState(true);

  useEffect(() => {
    const savedAuthor = localStorage.getItem("quickblog-author");
    if (savedAuthor) {
      setAuthorName(savedAuthor);
      setShowAuthorInput(false);
    }
  }, []);

  useEffect(() => {
    if (authorName && posts.length > 0) {
      const filtered = posts.filter(post => 
        post.author_name.toLowerCase() === authorName.toLowerCase()
      );
      setUserPosts(filtered);
    } else {
      setUserPosts([]);
    }
  }, [authorName, posts]);

  const handleAuthorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) return;
    
    localStorage.setItem("quickblog-author", authorName.trim());
    setShowAuthorInput(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("quickblog-author");
    setAuthorName("");
    setUserPosts([]);
    setShowAuthorInput(true);
  };

  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      try {
        await deletePost(postId);
      } catch (error) {
        // Error handled by hook
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your posts...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (showAuthorInput) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto mt-16">
          <div className="bg-card p-8 rounded-xl shadow-[var(--shadow-card)]">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
                Access Your Posts
              </h1>
              <p className="text-muted-foreground">
                Enter your author name to view and manage your published stories.
              </p>
            </div>
            
            <form onSubmit={handleAuthorSubmit}>
              <div className="mb-6">
                <label htmlFor="author" className="block text-sm font-medium text-foreground mb-2">
                  Your Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter the name you use when publishing..."
                  className="input-warm w-full"
                  required
                />
              </div>
              
              <button type="submit" className="btn-warm w-full">
                View My Posts
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Don't have any posts yet?
              </p>
              <Link to="/create" className="btn-accent">
                <Plus className="h-4 w-4 mr-2" />
                Write Your First Story
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              My Stories
            </h1>
            <p className="text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">{authorName}</span>
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link to="/create" className="btn-warm">
              <Plus className="h-4 w-4 mr-2" />
              New Story
            </Link>
            <button onClick={handleLogout} className="btn-accent">
              Switch Author
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)]">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent rounded-lg">
                <Edit className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{userPosts.length}</p>
                <p className="text-sm text-muted-foreground">Published Stories</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)]">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent rounded-lg">
                <Calendar className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {userPosts.length > 0 
                    ? formatDistanceToNow(new Date(userPosts[0].created_at), { addSuffix: false })
                    : "0 days"
                  }
                </p>
                <p className="text-sm text-muted-foreground">Since last post</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)]">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent rounded-lg">
                <User className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{authorName}</p>
                <p className="text-sm text-muted-foreground">Author Profile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        {userPosts.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
              Your Published Stories
            </h2>
            {userPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1 min-w-0 mb-4 lg:mb-0">
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Published {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                      </span>
                      {post.updated_at !== post.created_at && (
                        <span className="flex items-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Updated {formatDistanceToNow(new Date(post.updated_at), { addSuffix: true })}</span>
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="btn-accent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                    <Link
                      to={`/edit/${post.id}`}
                      className="btn-warm"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium transition-[var(--transition-smooth)] hover:bg-destructive/90 shadow-[var(--shadow-card)]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              No Stories Yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't published any stories yet. Start sharing your thoughts and experiences with the world!
            </p>
            <Link to="/create" className="btn-warm">
              <Plus className="h-4 w-4 mr-2" />
              Write Your First Story
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AuthorDashboard;