import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Layout from "@/components/Layout";
import { usePosts } from "@/hooks/usePosts";
import { useToast } from "@/hooks/use-toast";

// Import cover images
import technologyCover from "@/assets/cover-technology.jpg";
import lifestyleCover from "@/assets/cover-lifestyle.jpg";
import travelCover from "@/assets/cover-travel.jpg";
import businessCover from "@/assets/cover-business.jpg";
import cybersecurityCover from "@/assets/cover-cybersecurity.jpg";
import designCover from "@/assets/cover-design.jpg";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = usePosts();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map cover images based on tags
  const getCoverImage = (tags: string[] | null) => {
    if (!tags || tags.length === 0) return lifestyleCover;
    
    const tagString = tags.join(" ").toLowerCase();
    
    if (tagString.includes("technology") || tagString.includes("web-development") || tagString.includes("javascript") || tagString.includes("blockchain") || tagString.includes("artificial-intelligence") || tagString.includes("no-code")) {
      return technologyCover;
    }
    if (tagString.includes("lifestyle") || tagString.includes("wellness") || tagString.includes("minimalism") || tagString.includes("mindfulness") || tagString.includes("nutrition") || tagString.includes("gardening") || tagString.includes("resilience")) {
      return lifestyleCover;
    }
    if (tagString.includes("travel") || tagString.includes("culture") || tagString.includes("history") || tagString.includes("archaeology")) {
      return travelCover;
    }
    if (tagString.includes("business") || tagString.includes("finance") || tagString.includes("career") || tagString.includes("communication") || tagString.includes("freelancing")) {
      return businessCover;
    }
    if (tagString.includes("cybersecurity") || tagString.includes("security")) {
      return cybersecurityCover;
    }
    if (tagString.includes("design") || tagString.includes("photography") || tagString.includes("creative") || tagString.includes("user-experience")) {
      return designCover;
    }
    
    return lifestyleCover;
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const postData = await getPostById(id);
        setPost(postData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load post";
        setError(errorMessage);
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, getPostById, navigate]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Post link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading story...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">
            {error ? "Error Loading Story" : "Story Not Found"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {error || "The story you're looking for doesn't exist or has been removed."}
          </p>
          <Link to="/" className="btn-warm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  const coverImage = getCoverImage(post.tags);

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-[var(--transition-smooth)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Stories</span>
          </Link>
        </div>

        {/* Cover image */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <img
            src={coverImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover blog-image"
          />
        </div>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{post.author_name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 hover:text-foreground transition-[var(--transition-smooth)]"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Post footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-muted-foreground">
                Written by <span className="font-medium text-foreground">{post.author_name}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Published {formattedDate}
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="btn-accent">
                More Stories
              </Link>
              <Link to="/create" className="btn-warm">
                Write Your Own
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </Layout>
  );
};

export default PostDetail;