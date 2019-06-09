const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)
  const blogChapter = path.resolve(`./src/templates/middle.js`)
  return graphql(
    `
      {
        allContentfulPost{
          edges{
            node{
              slug
              activity

            }
          }
        }
      }
      allContentfulChapter{
            edges{
              node{
                slug
                name
              }
            }
          }
        }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const chapters = result.data.allContentfulChapter.edges

    chapters.forEach((post, index) => {
      const previous = index === chapters.length - 1 ? null : chapters[index + 1].node
      const next = index === 0 ? null : chapters[index - 1].node

      createPage({
        path: post.node.slug,
        component: blogChapter,
        context: {
          slug: chapter.node.slug,
          previous,
          next,
        },
      })
    })

    // Create blog chapter pages.
    const posts = result.data.allContentfulPost.edges /// allcontentful == allMarkdwonRemark

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
