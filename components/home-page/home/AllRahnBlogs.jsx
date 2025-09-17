import Image from "next/image";
import Link from "next/link";
import returnAllPosts from "../../../wordpress/api";
import React, { useState, useEffect } from 'react';

const extractFirstImageUrl = (content) => {
    // A regular expression to match the 'src' attribute within an 'img' tag.
    const regex = /<img.*?src=["'](.*?)["']/;
    const match = regex.exec(content);
    // change http to https
    const url = match ? match[1].replace('http://', 'https://') : null;
    return url;      
  };
  
  

const AllRahnBlogs = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const fetchedPosts = await returnAllPosts();
                setPosts(fetchedPosts);
                console.log(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
            {posts.slice(0, 1000).map((post, index) => (
                <div
                    key={index}
                    className="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                    data-aos-delay={post.delay}
                >
                    <article className="blog-meta-three mt-40 wow fadeInUp">
                        <figure className="post-img m0">
                            <img src={extractFirstImageUrl(post.node.content)} alt={post.node.title || "Blog image"} />

                            <Link href={`./${post.node.uri}`} className="w-100 d-block">

                            </Link>
                        </figure>
                        <div className="post-data mt-40">
                            <div className="post-date opacity-75 text-uppercase">
                                {post.node.date} {/* Update to the appropriate post date */}
                            </div>
                            <Link href={`./${post.node.uri}`} className="mt-5 mb-35 lg-mb-20">
                                <h4 className="tran3s blog-title fw-normal tx-dark">
                                    {post.node.title} {/* Update to the appropriate post title */}
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
            ))}
        </>
    );
};

export default AllRahnBlogs;
