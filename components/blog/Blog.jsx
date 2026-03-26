import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const RahnBlog = () => {
  const [posts, setPosts] = useState([]);

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
    }

    fetchPosts();
  }, []);

  return (
    <>
      {posts.slice(0, 6).map((post) => (
        <div
          key={post.id}
          className="col-lg-4 col-sm-6"
          data-aos="fade-up"
        >
          <article className="blog-meta-three mt-40 wow fadeInUp">
            <figure className="post-img m0">
              {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title || "Blog Post Image"} />
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="w-100 d-block"
              ></Link>
            </figure>
            <div className="post-data mt-40">
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 mb-35 lg-mb-20"
              >
                <h4 className="tran3s blog-title fw-normal tx-dark">
                  {post.title}
                </h4>
              </Link>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="read-btn-two fw-500 tran3s"
                >
                  Read More
                </Link>
              </div>
            </div>
          </article>
        </div>
      ))}
    </>
  );
};

export default RahnBlog;
