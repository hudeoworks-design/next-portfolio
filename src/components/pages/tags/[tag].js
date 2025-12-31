// pages/tags/[tag].js (Dynamic Route for a specific tag search)
import { getSortedPostsData } from '../../../lib/posts';

export async function getStaticProps({ params }) {
  const allPosts = getSortedPostsData();
  const postsForTag = allPosts.filter(post => 
    post.tags && post.tags.includes(params.tag)
  );

  return {
    props: {
      posts: postsForTag,
      tag: params.tag
    },
  };
}

// You would also need getStaticPaths for this dynamic route
export async function getStaticPaths() {
    // logic to get all unique tags to pre-render paths
}

const TagPage = ({ posts, tag }) => {
  // Render your list of posts for the specific tag
  return (
    <div>
      <h1>Posts tagged: {tag}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagPage;
