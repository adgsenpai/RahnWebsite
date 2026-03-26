import Wrapper from "../layout/wrapper";
import DefaultHeader from "../components/home-page/home/footer/header/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  metaKeywords?: string;
  createdAt: string;
}

const BlogsPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // Read keyword from query string on mount
  useEffect(() => {
    if (router.query.keyword && typeof router.query.keyword === "string") {
      setActiveKeyword(router.query.keyword);
    }
    if (router.query.q && typeof router.query.q === "string") {
      setSearch(router.query.q);
    }
  }, [router.query]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // Collect all unique keywords from all posts
  const allKeywords = useMemo(() => {
    const kws = new Set();
    posts.forEach((post) => {
      if (post.metaKeywords) {
        post.metaKeywords.split(",").forEach((kw) => {
          const trimmed = kw.trim();
          if (trimmed) kws.add(trimmed);
        });
      }
    });
    return Array.from(kws).sort() as string[];
  }, [posts]);

  // Filter posts based on search and active keyword
  const filtered = useMemo(() => {
    let result = posts;
    if (activeKeyword) {
      result = result.filter(
        (p) =>
          p.metaKeywords &&
          p.metaKeywords
            .toLowerCase()
            .split(",")
            .map((k) => k.trim())
            .includes(activeKeyword.toLowerCase())
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.metaKeywords && p.metaKeywords.toLowerCase().includes(q)) ||
          (p.author && p.author.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, search, activeKeyword]);

  const handleKeywordClick = (kw: string) => {
    if (activeKeyword === kw) {
      setActiveKeyword("");
      router.replace("/blogs", undefined, { shallow: true });
    } else {
      setActiveKeyword(kw);
      router.replace(`/blogs?keyword=${encodeURIComponent(kw)}`, undefined, {
        shallow: true,
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <NextSeo
        title="Blogs - RAHN Consolidated (PTY) Ltd"
        description="RAHN Consolidated (PTY) Ltd Blogs — insights on compliance, technology, AI, and South African business."
        openGraph={{
          url: "https://rahn.co.za/blogs",
          title: "Blogs - RAHN Consolidated (PTY) Ltd",
          description:
            "RAHN Consolidated (PTY) Ltd Blogs — insights on compliance, technology, AI, and South African business.",
          images: [
            {
              url: "https://rahn.co.za/images/logo/RahnProfilelogo.png",
              width: 800,
              height: 600,
              alt: "RAHN Consolidated (PTY) Ltd",
            },
          ],
          site_name: "RAHN Consolidated (PTY) Ltd",
        }}
      />

      <DefaultHeader />

      <div className="blog-section-three mt-140 mb-120 lg-mt-100 lg-mb-100">
        <div className="container">
          {/* Page heading */}
          <div className="row mb-40">
            <div className="col-12 text-center">
              <h2 className="fw-bold tx-dark mb-10">RAHN Insights</h2>
              <p className="text-muted" style={{ maxWidth: 600, margin: "0 auto" }}>
                Explore our latest articles on compliance, technology, AI, and
                business strategy in South Africa and beyond.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="row mb-30">
            <div className="col-lg-8 col-md-10 mx-auto">
              <form onSubmit={handleSearchSubmit}>
                <div
                  className="input-group"
                  style={{
                    borderRadius: 50,
                    overflow: "hidden",
                    boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <span
                    className="input-group-text bg-white border-0"
                    style={{ paddingLeft: 20 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 py-3"
                    placeholder="Search articles by title, topic, keyword, or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ fontSize: "1rem" }}
                  />
                  {(search || activeKeyword) && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary border-0"
                      onClick={() => {
                        setSearch("");
                        setActiveKeyword("");
                        router.replace("/blogs", undefined, { shallow: true });
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Keyword pills */}
          {allKeywords.length > 0 && (
            <div className="row mb-40">
              <div className="col-12 text-center">
                <div
                  className="d-flex flex-wrap justify-content-center gap-2"
                  style={{ maxWidth: 900, margin: "0 auto" }}
                >
                  {allKeywords.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      className={`btn btn-sm ${
                        activeKeyword === kw
                          ? "btn-dark"
                          : "btn-outline-secondary"
                      }`}
                      style={{
                        borderRadius: 20,
                        fontSize: "0.8rem",
                        padding: "4px 14px",
                        transition: "all 0.2s",
                      }}
                      onClick={() => handleKeywordClick(kw)}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active filter indicator */}
          {activeKeyword && (
            <div className="row mb-20">
              <div className="col-12 text-center">
                <span
                  className="badge bg-dark"
                  style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                >
                  Filtering by: {activeKeyword}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    style={{ fontSize: "0.6rem" }}
                    onClick={() => {
                      setActiveKeyword("");
                      router.replace("/blogs", undefined, { shallow: true });
                    }}
                  />
                </span>
              </div>
            </div>
          )}

          {/* Results count */}
          {!loading && (
            <div className="row mb-20">
              <div className="col-12 text-center">
                <p className="text-muted small">
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                  {search ? ` for "${search}"` : ""}
                </p>
              </div>
            </div>
          )}

          {/* Blog grid */}
          <div className="row">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted mb-3">No articles found</h5>
                <p className="text-muted">
                  Try adjusting your search or clearing the keyword filter.
                </p>
                <button
                  className="btn btn-outline-dark mt-10"
                  onClick={() => {
                    setSearch("");
                    setActiveKeyword("");
                    router.replace("/blogs", undefined, { shallow: true });
                  }}
                >
                  Show All Articles
                </button>
              </div>
            ) : (
              filtered.map((post) => {
                const postKeywords = post.metaKeywords
                  ? post.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
                  : [];
                return (
                  <div
                    key={post.id}
                    className="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                  >
                    <article className="blog-meta-three mt-40 wow fadeInUp">
                      <figure className="post-img m0">
                        {post.featuredImage && (
                          <img
                            src={post.featuredImage}
                            alt={post.title || "Blog Post Image"}
                            style={{
                              width: "100%",
                              height: 220,
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="w-100 d-block"
                        />
                      </figure>
                      <div className="post-data mt-30">
                        <div className="d-flex align-items-center gap-2 mb-10">
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-ZA",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                          {post.author && (
                            <>
                              <span className="text-muted">·</span>
                              <span
                                className="text-muted"
                                style={{ fontSize: "0.8rem" }}
                              >
                                {post.author}
                              </span>
                            </>
                          )}
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-5 mb-15"
                        >
                          <h4 className="tran3s blog-title fw-normal tx-dark">
                            {post.title}
                          </h4>
                        </Link>

                        {post.excerpt && (
                          <p
                            className="text-muted mb-15"
                            style={{ fontSize: "0.88rem", lineHeight: 1.6 }}
                          >
                            {post.excerpt.length > 160
                              ? post.excerpt.substring(0, 160) + "..."
                              : post.excerpt}
                          </p>
                        )}

                        {/* Clickable keywords */}
                        {postKeywords.length > 0 && (
                          <div className="d-flex flex-wrap gap-1 mb-15">
                            {postKeywords.slice(0, 4).map((kw) => (
                              <button
                                key={kw}
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                style={{
                                  borderRadius: 15,
                                  fontSize: "0.7rem",
                                  padding: "2px 10px",
                                  lineHeight: 1.5,
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleKeywordClick(kw);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                              >
                                {kw}
                              </button>
                            ))}
                          </div>
                        )}

                        <Link
                          href={`/blog/${post.slug}`}
                          className="read-btn-two fw-500 tran3s"
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <DefaultFooter />
    </Wrapper>
  );
};

export default BlogsPage;
