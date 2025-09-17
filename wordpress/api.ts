/* ADGSTUDIOS 2023
   WP GraphQL API
    https://rahn.co.za/graphql
*/

const API_URL = "https://wpddev.rahn.co.za/graphql";

interface Post {
  title: string;
  date: string;
  categories: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
}

interface PostNode {
  node: Post;
}

interface PostResponse {
  posts: {
    edges: PostNode[];
  };
}


async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export default async function getPosts(): Promise<PostNode[]> {
  const data = await fetchAPI(
    `query AllPosts {
      posts(first:10000) {
        edges {
          node {
            title
            date      
            uri
            content

            
          }
        }
      }
    }`,
    {
      variables: {},
    }
  );
  return data?.posts?.edges || [];
}



export async function getPostContent(search: any) {
  const data = await fetchAPI(
    `query fetchPostContent {
      posts(first: 1, where: { name: "${search}" }) {
        edges {
          node {
            title
            content
            slug
          }
        }
      }
    }`,
    {
      variables: {}, // You can add variables if needed.
    }
  );
  return data?.posts?.edges || [];
}

/* SAMPLE USAGE
// Call the function and log the result.
getPostContent("chatgpt-4").then((result) => {
  console.log(result);
});
*/

export async function returnAllPosts(): Promise<PostNode[]> {
  const data = await fetchAPI(
    `query AllPosts {
      posts(first: 10000) {
        edges {
          node {
            title
            date      
            uri
            content
            
          }
        }
      }
    }`,
    {
      variables: {},
    }
  );
  return data?.posts?.edges || [];
}