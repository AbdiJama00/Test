import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {rhythm} from "../utils/typography"

class BlogPostContentfulTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.activity} description={post.subtitle}/>
        <Image fluid={post.image.fluid}/>
        <h1>{post.activity}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.content.childContentfulRichText.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio/>

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulPost( slug: {eq: $slug}){
      activity
      subtitle
      author
      image{
        fluid{
          ...GatsbyContentfulFluid
        }
      }
      content{
        childContentfulRichText{
          html
        }
      }
    }
  }
`
