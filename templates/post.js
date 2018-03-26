import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post';
import Template from '../layouts/index';

export default function PostTemplate(props) {
  const { markdownRemark: post } = props.data;
  const { next, prev } = props.pathContext;
  return (
    <Template {...props}>
      <Post post={post} next={next} prev={prev} />
    </Template>
  );
}

export const pageQuery = graphql`
  query MassivelyBlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
