import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Post = styled.div`
  display: flex;
`
const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
`
const PostText = styled.div`
  flex: 75%;
`
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulChapter.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.name || node.slug
          return (
            <Post key={node.slug}>
            <PostImage>
              <Image fluid={node.image.fluid} />
            </PostImage>
            <PostText>
              <h3
                style={{
                  marginTop:0,
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>


            </PostText>

            </Post>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
{
  site {
    siteMetadata {
      title
    }
  }
  allContentfulChapter {
    edges {
      node {
        name
        image{
        fluid{
          ...GatsbyContentfulFluid
        }
      }
        post {
          activity

        }
      }
    }
  }
}
`
