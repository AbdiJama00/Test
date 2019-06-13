import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"


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
class BlogChapters extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const chapters = data.allContentfulChapter.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        
        {chapters.map(({ node }) => {
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
                <Link style={{ boxShadow: `none` }} to="/chapter">
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

export default BlogChapters

export const staticQuery = graphql`
{
  site {
    siteMetadata {
      title
    }
  }
  allContentfulChapter(sort: {fields: name}) {
    edges {
      node {
        name
        image{
        fluid{
          ...GatsbyContentfulFluid
        }
      }
      }
    }
  }
}
`
