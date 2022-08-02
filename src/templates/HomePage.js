import React from 'react'
import { graphql } from 'gatsby'

import Content from '../components/Content'
import Layout from '../components/Layout'
import PageSlider from '../components/PageSlider'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, gallery, body }) => (
  <main className="Home">
    <PageSlider
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
      gallery={gallery}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        gallery {
          image
        }
      }
    }
  }
`
