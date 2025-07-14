import { Link } from "react-router-dom";
import { Heart, Users, Globe, PenTool, Sparkles, Share2 } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-accent rounded-full mb-6">
            <Heart className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            About QuickBlog
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A beautiful, minimal platform designed for sharing stories, ideas, and experiences 
            with the world. No barriers, no complexity—just pure, authentic storytelling.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-[var(--shadow-card)]">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              We believe that everyone has a story worth telling. QuickBlog removes the barriers 
              between your thoughts and the world, creating a space where authentic voices can 
              be heard and meaningful connections can be made.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
            Why Choose QuickBlog?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent rounded-2xl mb-4">
                <Globe className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                Open Access
              </h3>
              <p className="text-muted-foreground">
                No accounts required. Anyone can read, and anyone can publish. 
                We believe in democratizing content creation.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent rounded-2xl mb-4">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                Beautiful Design
              </h3>
              <p className="text-muted-foreground">
                Clean, minimal interface that puts your content first. 
                No distractions, just your words beautifully presented.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent rounded-2xl mb-4">
                <PenTool className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                Simple Publishing
              </h3>
              <p className="text-muted-foreground">
                Write, preview, publish. Our streamlined editor focuses on 
                what matters: your story and your voice.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent rounded-2xl mb-4">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Built by writers, for writers. Every feature is designed 
                to enhance the storytelling experience.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent rounded-2xl mb-4">
                <Share2 className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                Easy Sharing
              </h3>
              <p className="text-muted-foreground">
                Share your stories with the world. Every post gets a 
                beautiful, shareable link that looks great everywhere.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-accent rounded-2xl mb-4">
                <Heart className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                Made with Love
              </h3>
              <p className="text-muted-foreground">
                Every pixel crafted with care. We're passionate about 
                creating tools that inspire creativity and connection.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-card to-accent/10 p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  🌟 Authenticity
                </h3>
                <p className="text-muted-foreground">
                  We celebrate genuine voices and unique perspectives. Your story, 
                  told in your own words, is what makes this platform special.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  🌿 Simplicity
                </h3>
                <p className="text-muted-foreground">
                  Complexity is the enemy of creativity. We keep things simple 
                  so you can focus on what matters: your message.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  🤝 Accessibility
                </h3>
                <p className="text-muted-foreground">
                  Everyone deserves to be heard. We're committed to making 
                  publishing accessible to all, regardless of technical skill.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  ✨ Quality
                </h3>
                <p className="text-muted-foreground">
                  Beautiful design and thoughtful user experience create an 
                  environment where great content can shine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-[var(--shadow-card)]">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of storytellers. Whether you're sharing personal experiences, 
              professional insights, or creative expressions, your voice matters here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create" className="btn-warm">
                <PenTool className="h-5 w-5 mr-2" />
                Start Writing
              </Link>
              <Link to="/" className="btn-accent">
                Explore Stories
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;