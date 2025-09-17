import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DefaultFooter from "../../components/footer/DefaultFooter";
import DefaultHeader from "../../components/home-page/home/footer/header/DefaultHeader";
import Wrapper from "../../layout/wrapper";
import Head from "next/head";
import { getPostContent } from "../../wordpress/api";

interface BlogPostProps {
  postData: {
    title: string;
    content: string;
    author: string;
    datePublished: string;
    imageUrl: string;
    url: string;
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

  const { title, content, author, datePublished, imageUrl, url } = postData;

  let description =
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
      image: imageUrl || "https://rahn.co.za/default-image.jpg",
      articleSection: description,
      articleBody: content.replace(/<[^>]*>/g, ""),
      url: url || "https://rahn.co.za/blog/default-url",
      publisher: {
        "@type": "Organization",
        name: "Rahn Consolidated Pty Ltd",
      },
    };
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={imageUrl || "https://rahn.co.za/default-image.jpg"}
        />
        <meta
          property="og:url"
          content={url || "https://rahn.co.za/blog/default-url"}
        />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
        />
      </Head>
      <DefaultHeader />
      <div className="blog-section-three mt-140 mb-120 lg-mt-100 lg-mb-100">
        <div className="container">
          <div className="row">
            <h1>{title}</h1>
          </div>
          <div
            className="row"
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
      const result = await getPostContent(id);
      postData = result[0]?.node || null;
    } catch (error) {
      return {
        redirect: {
          destination: "/blogs",
          permanent: false,
        },
      };
    }
  }

  return { props: { postData } };
};

export default MainRoot;
