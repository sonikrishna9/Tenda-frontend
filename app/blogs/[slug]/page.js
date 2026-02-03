"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = process.env.VITE_LOCAL_API || "http://localhost:8080/api";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${API_URL}/blog/single/${slug}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data?.success) {
          setBlog(data.data);
        } else {
          setError("Blog not found or data format invalid");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <section className="max-w-3xl mx-auto py-16 px-6 text-center">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-6 shadow-sm">
          <div className="text-orange-500 text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-orange-800 mb-2">
            {error ? "Error Loading Blog" : "Blog Not Found"}
          </h2>
          <p className="text-orange-600">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
        </div>
        <a
          href="/blog"
          className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium border border-orange-200 hover:border-orange-300 px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all blogs
        </a>
      </section>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      {/* Hero Section with Orange Theme */}
      <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="space-y-6">
            {/* Category Badge */}
            {blog.category && (
              <div className="inline-block">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {blog.category}
                </span>
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm">
              {blog.title}
            </h1>
            
            {/* Author & Date */}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-300 text-orange-800 rounded-full font-bold text-lg">
                {blog.author?.name?.charAt(0) || "A"}
              </div>
              <div>
                <p className="font-medium text-lg">{blog.author?.name || "Anonymous"}</p>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {Math.ceil(blog.content.split(' ').length / 200)} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage?.url && (
        <div className="max-w-4xl mx-auto px-6 -mt-8 md:-mt-12 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src={blog.featuredImage.url}
              alt={blog.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/800/400";
              }}
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        {/* Excerpt */}
        {blog.excerpt && (
          <div className="mb-8">
            <p className="text-xl text-gray-700 italic border-l-4 border-orange-400 pl-4 py-2 bg-orange-50/50 rounded-r-lg">
              {blog.excerpt}
            </p>
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="prose-headings:text-gray-800 prose-h2:text-orange-700 prose-h3:text-orange-600
                       prose-p:text-gray-700 prose-li:text-gray-600 prose-strong:text-gray-900
                       prose-a:text-orange-600 hover:prose-a:text-orange-800 prose-a:font-medium
                       prose-blockquote:border-l-4 prose-blockquote:border-orange-400
                       prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-orange-50/30
                       prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                       prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Gallery Section */}
        {blog.gallery?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-orange-200">
            <h3 className="text-2xl font-semibold text-orange-800 mb-6">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blog.gallery.map((image, index) => (
                <div key={image._id || index} className="group cursor-pointer">
                  <img
                    src={image.url}
                    alt={`${blog.title} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags Section */}
        {blog.tags?.length > 0 && (
          <div className="mt-8 pt-8 border-t border-orange-200">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Published: {new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Status: <span className="font-medium text-green-600 capitalize">{blog.status}</span></span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Author: <span className="font-medium text-orange-700">{blog.author?.name}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-3xl mx-auto px-6 py-8 border-t border-orange-200 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <a
            href="/blog"
            className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium px-4 py-2 rounded-lg border border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </a>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center text-gray-600 hover:text-orange-700 font-medium px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-300 transition-all"
            >
              Scroll to top
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
            
            <button
              onClick={() => window.print()}
              className="inline-flex items-center text-gray-600 hover:text-orange-700 font-medium px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-300 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}