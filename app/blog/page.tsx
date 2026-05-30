"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, Calendar, ArrowRight, User } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Sleep", "Nutrition", "Fitness", "Mental Health"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-slate-950 min-h-screen text-slate-300">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-800/30 text-emerald-400 mb-4">
          <BookOpen className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
          Wellness & Science Library
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Access evidence-based articles detailing biological hacks, nutrition protocols, and mindfulness techniques for a higher healthspan.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, topics, authors..."
            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Categories Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 scrollbar-none overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-xl px-4 py-2.5 text-xs font-bold border transition-all shrink-0",
                activeCategory === cat
                  ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                  : "bg-slate-900/50 text-slate-450 border-slate-900 hover:border-slate-800 hover:text-slate-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-3xl bg-slate-900/50 border border-slate-900 overflow-hidden hover:border-slate-800 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Cover Image mock overlay */}
              <div className="relative h-56 bg-slate-900 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest bg-emerald-950/90 text-emerald-400 border border-emerald-800/30 rounded-md px-2.5 py-1 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold tracking-wide uppercase mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-450 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-slate-400 text-xs border border-slate-850">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-350">{post.author.name}</p>
                      <p className="text-[9px] text-slate-500">{post.author.role}</p>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform"
                  >
                    Read Post
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="h-64 border border-dashed border-slate-850 rounded-3xl flex flex-col items-center justify-center p-6 text-center text-slate-500">
          <BookOpen className="h-10 w-10 mb-2 text-slate-700 animate-pulse" />
          <p className="text-xs">No articles found matching the search criteria or category filter.</p>
        </div>
      )}
    </div>
  );
}
