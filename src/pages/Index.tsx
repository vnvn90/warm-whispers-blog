import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PenTool, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import { usePosts } from "@/hooks/usePosts";

// Import cover images
import technologyCover from "@/assets/cover-technology.jpg";
import lifestyleCover from "@/assets/cover-lifestyle.jpg";
import travelCover from "@/assets/cover-travel.jpg";
import businessCover from "@/assets/cover-business.jpg";
import cybersecurityCover from "@/assets/cover-cybersecurity.jpg";
import designCover from "@/assets/cover-design.jpg";

const Index = () => {
  const { posts, loading, searchPosts } = usePosts();
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);

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
    if (posts.length > 0) {
      setFeaturedPosts(posts.slice(0, 3));
    }
  }, [posts]);

  const handleSearch = (query: string) => {
    searchPosts(query);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading stories...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Share Your Stories
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A beautiful, minimal platform for sharing ideas, experiences, and insights
            with the world. No account required – just write and publish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/create" className="btn-warm">
              <PenTool className="h-5 w-5 mr-2" />
              Start Writing
            </Link>
            <Link to="/about" className="btn-accent">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="mb-12">
        <div className="max-w-2xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search stories by title, content, or tags..."
          />
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              Featured Stories
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author_name}
                publishedAt={post.created_at}
                tags={post.tags || []}
                coverImage={getCoverImage(post.tags)}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-8">
          Latest Stories
        </h2>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.slice(3).map((post, index) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author_name}
                publishedAt={post.created_at}
                tags={post.tags || []}
                coverImage={getCoverImage(post.tags)}
                layout={index % 3 === 0 ? "horizontal" : "vertical"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No stories found.</p>
            <Link to="/create" className="btn-warm">
              <PenTool className="h-4 w-4 mr-2" />
              Write the First Story
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
