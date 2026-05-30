"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, CheckCircle2, ChevronRight, User, Award } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/data";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const resolvedParams = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  // Checked habits state
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!post) {
    notFound();
  }

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Split content paragraphs
  const paragraphs = post.content.split("\n\n").filter(p => p.trim());

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 bg-slate-950 min-h-screen text-slate-350">
      
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Library
      </Link>

      <article className="space-y-8">
        {/* Banner Headers */}
        <div className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-900 rounded-md px-2.5 py-1">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-b border-slate-900 py-4">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-slate-850 text-slate-400 text-sm">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">{post.author.name}</p>
                <p className="text-[10px] text-slate-500">{post.author.role}</p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="relative h-64 sm:h-[400px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Dynamic Article Copywriter Content */}
        <div className="space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
          {paragraphs.map((p, idx) => {
            const cleanText = p.trim();
            if (cleanText.startsWith("###")) {
              return (
                <h3 key={idx} className="text-xl md:text-2xl font-bold text-slate-100 pt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {cleanText.replace("###", "").trim()}
                </h3>
              );
            }
            return <p key={idx}>{cleanText}</p>;
          })}
        </div>

        {/* Interactive Action Habits Checklist */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg md:text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-emerald-400" />
            Interactive Health Actions Checksheet
          </h3>
          <p className="text-xs text-slate-450 mb-6">
            Check off these habits as you read the research to commit them to your daily schedule!
          </p>

          <div className="space-y-3">
            {post.checklist.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <button
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    isChecked
                      ? "bg-emerald-950/20 border-emerald-500/40 text-slate-200"
                      : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                  }`}
                >
                  <CheckCircle2
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      isChecked ? "text-emerald-400 fill-emerald-950/50" : "text-slate-700"
                    }`}
                  />
                  <span className="text-sm font-medium leading-relaxed">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Related Posts */}
        <div className="border-t border-slate-900 pt-12 mt-16 space-y-6">
          <h4 className="text-lg font-bold text-slate-200">Related Articles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all flex justify-between items-center group"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[9px] font-black text-emerald-400 tracking-wider uppercase block">{r.category}</span>
                  <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {r.title}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 group-hover:translate-x-1 group-hover:text-slate-300 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
}
