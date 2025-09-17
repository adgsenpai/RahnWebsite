import Image from "next/image";
import Link from "next/link";
import getPosts from "../../wordpress/api";
import React, { useState, useEffect } from "react";

// Helper function to extract image URL from post content
const extractFirstImageUrl = (content) => {
  const regex = /<img.*?src=["'](.*?)["']/;
  const match = regex.exec(content);
  return match ? match[1].replace("http://", "https://") : null;
};

const RahnBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      {posts.slice(0, 6).map((post, index) => {
        const imageUrl = extractFirstImageUrl(post.node.content);
        const postTitle = post.node.title || "Blog Post Image";

        return (
          <div
            key={index}
            className="col-lg-4 col-sm-6"
            data-aos="fade-up"
            data-aos-delay={post.delay}
          >
            <article className="blog-meta-three mt-40 wow fadeInUp">
              <figure className="post-img m0">
                {imageUrl && <img src={imageUrl} alt={postTitle} />}
                <Link
                  href={`./${post.node.uri}`}
                  className="w-100 d-block"
                ></Link>
              </figure>
              <div className="post-data mt-40">
                <Link
                  href={`./${post.node.uri}`}
                  className="mt-5 mb-35 lg-mb-20"
                >
                  <h4 className="tran3s blog-title fw-normal tx-dark">
                    {post.node.title}
                  </h4>
                </Link>
                <div>
                  <Link
                    href={`./${post.node.uri}`}
                    className="read-btn-two fw-500 tran3s"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </>
  );
};

export default RahnBlog;
