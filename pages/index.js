import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import PreviewPost from '../components/PreviewPost';
import Template from '../layouts/index';

export default function Index(props) {
  const { edges: posts } = props.data.allMarkdownRemark;

  return (
    <Template {...props}>
      <div>
        <div id="main">
        <section className="posts">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              return (
                <PreviewPost key={post.id} post={post} />
              );
            })}
          </section>
        </div>
      </div>
    </Template>
  );
}

export const pageQuery = graphql`
  query MassivelyIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
