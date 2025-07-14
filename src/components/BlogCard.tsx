import { Link } from "react-router-dom";
import { Calendar, User, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  layout?: "horizontal" | "vertical";
}

const BlogCard = ({
  id,
  title,
  excerpt,
  author,
  publishedAt,
  tags,
  coverImage,
  layout = "vertical"
}: BlogCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });

  if (layout === "horizontal") {
    return (
      <Link to={`/post/${id}`} className="block">
        <article className="blog-card group cursor-pointer">
          <div className="flex gap-6">
            {coverImage && (
              <div className="flex-shrink-0 w-48 h-32 overflow-hidden rounded-lg">
                <img
                  src={coverImage}
                  alt={title}
                  className="blog-image w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-[var(--transition-smooth)] line-clamp-2 mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </span>
                </div>
                {tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {tags.slice(0, 2).join(", ")}
                      {tags.length > 2 && `+${tags.length - 2}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/post/${id}`} className="block">
      <article className="blog-card group cursor-pointer">
        {coverImage && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={coverImage}
              alt={title}
              className="blog-image w-full h-48 object-cover"
            />
          </div>
        )}
        <div className="space-y-3">
          <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-[var(--transition-smooth)] line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </span>
            </div>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;