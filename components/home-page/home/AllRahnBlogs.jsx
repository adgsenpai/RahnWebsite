import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

const AllRahnBlogs = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/blogs');
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    className="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                >
                    <article className="blog-meta-three mt-40 wow fadeInUp">
                        <figure className="post-img m0">
                            {post.featuredImage && (
                                <img src={post.featuredImage} alt={post.title || "Blog image"} />
                            )}
                            <Link href={`/blog/${post.slug}`} className="w-100 d-block">
                            </Link>
                        </figure>
                        <div className="post-data mt-40">
                            <div className="post-date opacity-75 text-uppercase">
                                {new Date(post.createdAt).toLocaleDateString('en-ZA', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </div>
                            <Link href={`/blog/${post.slug}`} className="mt-5 mb-35 lg-mb-20">
                                <h4 className="tran3s blog-title fw-normal tx-dark">
                                    {post.title}
                                </h4>
                            </Link>
                            {post.excerpt && (
                                <p className="text-muted mb-20" style={{ fontSize: '0.9rem' }}>
                                    {post.excerpt.substring(0, 150)}...
                                </p>
                            )}
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

export default AllRahnBlogs;
