import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author_name: string;
  tags: string[] | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch posts";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: {
    title: string;
    content: string;
    excerpt: string;
    author_name: string;
    tags: string[];
    cover_image_url?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      setPosts((prev) => [data, ...prev]);
      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create post";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setPosts((prev) => 
        prev.map((post) => (post.id === id ? data : post))
      );
      
      toast({
        title: "Success",
        description: "Post updated successfully!",
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update post";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setPosts((prev) => prev.filter((post) => post.id !== id));
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete post";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const getPostById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we're online
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network and try again.");
      }
      
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      let errorMessage = "Failed to fetch post";
      
      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
        } else if (err.message.includes("No internet connection")) {
          errorMessage = err.message;
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query: string) => {
    try {
      setLoading(true);
      
      if (!query.trim()) {
        await fetchPosts();
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to search posts";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    searchPosts,
    refetch: fetchPosts,
  };
};

export type { Post };