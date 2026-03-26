import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DefaultFooter from "../../components/footer/DefaultFooter";
import DefaultHeader from "../../components/home-page/home/footer/header/DefaultHeader";
import Wrapper from "../../layout/wrapper";
import Head from "next/head";
import prisma from "../../lib/prisma";

interface BlogPostProps {
  postData: {
    title: string;
    content: string;
    author: string;
    datePublished: string;
    imageUrl: string;
    url: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    metaKeywords: string;
    metaDescription: string;
  };
}

//@ts-ignore
const RahnBlogPost = ({ postData }: BlogPostProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!postData) {
      router.push("/blogs");
    }
  }, [postData, router]);

  if (!postData) return null;

  const { title, content, author, datePublished, imageUrl, url, ogTitle, ogDescription, ogImage, metaKeywords, metaDescription } = postData;

  let description = metaDescription ||
    content
      .replace(/<[^>]*>/g, "")
      .replace(/\n/g, " ")
      .substring(0, 160)
      .replace(/\s+/g, " ") + "...";

  let fullDescription =
    content
      .replace(/<[^>]*>/g, "")
      .replace(/\n/g, " ")
      .substring(0, 1000)
      .replace(/\s+/g, " ") + "...";

  let modifiedContent = content
    .replace(/<img(?![^>]*alt=)/g, '<img alt="Rahn Blog Image"') // Adds missing alt attributes
    .replace(/<img/g, '<img class="img-fluid" width="400"') // Adds class & fixed width
    .replace(/http:\/\//g, "https://");

  modifiedContent = modifiedContent.replace(/http:\/\//g, "https://");

  // Generate JSON-LD schema
  const generateSchema = () => {
    return {
      "@context": "http://schema.org",
      "@type": "Article",
      name: title || "Default Title",
      author: {
        "@type": "Person",
        name: author || "Default Author",
      },
      datePublished: datePublished || new Date().toISOString(),
      image: imageUrl || "https://rahn.co.za/images/logo/RahnProfilelogo.png",
      articleSection: fullDescription,
      articleBody: content.replace(/<[^>]*>/g, ""),
      url: url || "https://rahn.co.za/blog/default-url",
      publisher: {
        "@type": "Organization",
        name: "Rahn Consolidated Pty Ltd",
        logo: {
          "@type": "ImageObject",
          url: "https://rahn.co.za/images/logo/RahnProfilelogo.png",
        },
      },
    };
  };

  return (
    <>
      <Head>
        <title>{ogTitle || title} - RAHN Consolidated (PTY) Ltd</title>
        <meta name="description" content={description} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        <meta
          property="og:image"
          content={ogImage || imageUrl || "https://rahn.co.za/images/logo/RahnProfilelogo.png"}
        />
        <meta
          property="og:url"
          content={url || "https://rahn.co.za/blog/default-url"}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="RAHN Consolidated (PTY) Ltd" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle || title} />
        <meta name="twitter:description" content={ogDescription || description} />
        <meta name="twitter:image" content={ogImage || imageUrl || "https://rahn.co.za/images/logo/RahnProfilelogo.png"} />
        <link rel="canonical" href={url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
        />
      </Head>
      <DefaultHeader />
      <div className="blog-section-three mt-140 mb-120 lg-mt-100 lg-mb-100">
        <div className="container">

          {/* Hero / featured image */}
          {imageUrl && (
            <div className="row mb-50">
              <div className="col-12">
                <img
                  src={imageUrl}
                  alt={title}
                  className="img-fluid rounded w-100"
                  style={{ maxHeight: '480px', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div className="row mb-20">
            <div className="col-12">
              <h1 className="fw-bold tx-dark">{title}</h1>
            </div>
          </div>

          {/* Author / Date meta bar */}
          <div className="row mb-40">
            <div className="col-12 d-flex flex-wrap align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center px-3 py-1 rounded-pill"
                style={{ backgroundColor: '#f0f4ff', fontSize: '0.9rem' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
                </svg>
                <strong>{author || 'RAHN Team'}</strong>
              </span>
              <span
                className="d-inline-flex align-items-center px-3 py-1 rounded-pill"
                style={{ backgroundColor: '#f0f4ff', fontSize: '0.9rem' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                {new Date(datePublished).toLocaleDateString('en-ZA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <hr className="mb-40" />

          {/* Article body */}
          <div
            className="row blog-content"
            dangerouslySetInnerHTML={{ __html: modifiedContent }}
          />
        </div>
      </div>
      <DefaultFooter />
    </>
  );
};

//@ts-ignore
const MainRoot = ({ postData }: BlogPostProps) => {
  return (
    <Wrapper>
      <RahnBlogPost postData={postData} />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let postData = null;

  if (id) {
    try {
      const blog = await prisma.blog.findUnique({
        where: { slug: id as string },
      });

      if (blog && blog.published) {
        // Serve the featured image via the image API to avoid huge SSR props
        const rawImage = blog.featuredImage || '';
        const imageUrl = rawImage
          ? rawImage.startsWith('data:')
            ? `/api/blog-image/${blog.slug}`
            : rawImage
          : '';

        postData = {
          title: blog.title,
          content: blog.content,
          author: blog.author || 'RAHN Team',
          datePublished: blog.createdAt.toISOString(),
          imageUrl,
          url: `https://rahn.co.za/blog/${blog.slug}`,
          ogTitle: blog.ogTitle || '',
          ogDescription: blog.ogDescription || '',
          ogImage: blog.ogImage || '',
          metaKeywords: blog.metaKeywords || '',
          metaDescription: blog.metaDescription || '',
        };
      }
    } catch (error) {
      return {
        redirect: {
          destination: "/blogs",
          permanent: false,
        },
      };
    }
  }

  if (!postData) {
    return {
      redirect: {
        destination: "/blogs",
        permanent: false,
      },
    };
  }

  return { props: { postData } };
};

export default MainRoot;
