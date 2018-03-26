const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const indexTemplate = path.resolve(`${__dirname}/pages/index.js`);
  createPage({
    path: '/',
    component: indexTemplate,
  });

  const notFoundTemplate = path.resolve(`${__dirname}/pages/404.js`);
  createPage({
    path: '/404',
    component: notFoundTemplate,
  });

  const aboutTemplate = path.resolve(`${__dirname}/pages/about.js`);
  createPage({
    path: '/about',
    component: aboutTemplate,
  });

  const contactTemplate = path.resolve(`${__dirname}/pages/contact.js`);
  createPage({
    path: '/contact',
    component: contactTemplate,
  });

  const blogPostTemplate = path.resolve(`${__dirname}/templates/post.js`);
  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }`)
  .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges;

    // Create pages for each markdown file.
    posts.forEach(({ node }, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
      });
    });

    return posts;
  })

};
