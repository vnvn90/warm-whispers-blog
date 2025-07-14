import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
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

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, updatePost } = usePosts();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author_name: "",
    tags: "",
    cover_image_url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map cover images based on tags
  const getCoverImage = (tags: string[]) => {
    if (tags.length === 0) return lifestyleCover;
    
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
        const post = await getPostById(id);
        
        // Check if user can edit this post
        const savedAuthor = localStorage.getItem("quickblog-author");
        if (!savedAuthor || savedAuthor.toLowerCase() !== post.author_name.toLowerCase()) {
          toast({
            title: "Access Denied",
            description: "You can only edit posts you've written.",
            variant: "destructive",
          });
          navigate("/author");
          return;
        }

        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          author_name: post.author_name,
          tags: post.tags ? post.tags.join(", ") : "",
          cover_image_url: post.cover_image_url || "",
        });
      } catch (error) {
        navigate("/author");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, getPostById, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim() || !formData.author_name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const tags = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Auto-assign cover image based on tags if none provided
      const coverImage = formData.cover_image_url.trim() || getCoverImage(tags);

      const updates = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        author_name: formData.author_name.trim(),
        tags,
        cover_image_url: coverImage,
      };

      await updatePost(id!, updates);
      navigate(`/post/${id}`);
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewTags = formData.tags
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/author")}
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-[var(--transition-smooth)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Posts</span>
          </button>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Edit Story
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover Image Preview */}
          {previewTags.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Cover Image Preview
              </label>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={formData.cover_image_url.trim() || getCoverImage(previewTags)}
                  alt="Cover preview"
                  className="w-full h-48 object-cover blog-image"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your story title..."
              className="input-warm w-full text-xl font-serif"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Write a brief description of your story..."
              rows={3}
              className="input-warm w-full resize-none"
              required
            />
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-foreground mb-2">
              Author Name *
            </label>
            <input
              type="text"
              id="author_name"
              name="author_name"
              value={formData.author_name}
              onChange={handleInputChange}
              placeholder="Your name..."
              className="input-warm w-full"
              required
              disabled
            />
            <p className="text-xs text-muted-foreground mt-1">
              Author name cannot be changed when editing.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="technology, web-development, javascript (separate with commas)"
              className="input-warm w-full"
            />
            {previewTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {previewTags.map((tag) => (
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

          {/* Custom Cover Image */}
          <div>
            <label htmlFor="cover_image_url" className="block text-sm font-medium text-foreground mb-2">
              Custom Cover Image URL (Optional)
            </label>
            <input
              type="url"
              id="cover_image_url"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="input-warm w-full"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your story here..."
              rows={20}
              className="input-warm w-full resize-y font-serif text-lg leading-relaxed"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/author")}
              className="btn-accent"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-warm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Update Story</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;