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
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const fetchPromise = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      let errorMessage = "Failed to fetch posts";
      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = "Connection timeout. Please check your internet connection.";
        } else if (err.message.includes('fetch')) {
          errorMessage = "Unable to connect to the server. Please try again later.";
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      console.error('Fetch posts error:', err);
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
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const createPromise = supabase
        .from("posts")
        .insert([postData])
        .select()
        .single();
      
      const { data, error } = await Promise.race([createPromise, timeoutPromise]) as any;
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
      let errorMessage = "Failed to create post";
      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = "Connection timeout. Please try again.";
        } else {
          errorMessage = err.message;
        }
      }
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
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const updatePromise = supabase
        .from("posts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      const { data, error } = await Promise.race([updatePromise, timeoutPromise]) as any;
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
      let errorMessage = "Failed to update post";
      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = "Connection timeout. Please try again.";
        } else {
          errorMessage = err.message;
        }
      }
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
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const deletePromise = supabase
        .from("posts")
        .delete()
        .eq("id", id);
      
      const { error } = await Promise.race([deletePromise, timeoutPromise]) as any;
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
      let errorMessage = "Failed to delete post";
      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = "Connection timeout. Please try again.";
        } else {
          errorMessage = err.message;
        }
      }
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
      setError(null);
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const fetchPromise = supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;
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
        if (err.message.includes('timeout')) {
          errorMessage = "Connection timeout. Please check your internet connection.";
        } else if (err.message.includes('fetch')) {
          errorMessage = "Unable to connect to the server. Please try again later.";
        } else {
          errorMessage = err.message;
        }
      }
      
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
      console.error('Get post by ID error:', err);
      throw err;
    }
  };

  const searchPosts = async (query: string) => {
    try {
      setLoading(true);
      
      if (!query.trim()) {
        await fetchPosts();
        return;
      }

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const searchPromise = supabase
        .from("posts")
        .select("*")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
        .order("created_at", { ascending: false });
      
      const { data, error } = await Promise.race([searchPromise, timeoutPromise]) as any;
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      let errorMessage = "Failed to search posts";
      if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          errorMessage = "Search timeout. Please try again.";
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      console.error('Search posts error:', err);
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