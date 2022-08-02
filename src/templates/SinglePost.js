import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft, ChevronRight } from 'react-feather'
import Image from '../components/Image'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Gallery from '../components/Gallery'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  featuredImage,
  gallery,
  excerpt,
  rightHandNotes,
  rightHandReeds,
  rightHandRegisters,
  cassotto,
  leftHandBass,
  leftHandReeds,
  leftHandRegisters,
  specialFeatures,
  weight,
  dimensions,
  //   body,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container">
        {/* <Link className="SinglePost--BackButton" to="/products/">
          <ChevronLeft /> ΠΙΣΩ
        </Link> */}
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {/* {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )} */}
            {categories && (
              <Fragment>
                {/* <span>|</span> */}
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          {featuredImage && (
            <div className="SinglePost--FeaturedImage relative">
              <Image
                background
                resolutions="large"
                src={featuredImage}
                alt={title}
                backgroundSize="contain"
              />
            </div>
          )}

          <div className="SinglePost--InnerContent taCenter">
            <Content source={excerpt} />
          </div>

          <div className="SinglePost--Characteristics taCenter">
            {(rightHandNotes || rightHandReeds || rightHandRegisters) && (
              <div className="SinglePost--Characteristics--Column taLeft">
                <h5>Δεξί χέρι</h5>
                {rightHandNotes && (<div>Νότες: <strong>{rightHandNotes}</strong></div>)}
                {rightHandReeds && (<div>Φωνές: <strong>{rightHandReeds}</strong></div>)}
                {rightHandRegisters && (<div>Ρετζίστρα: <strong>{rightHandRegisters}</strong></div>)}
              </div>
            )}
            {(leftHandBass || leftHandReeds || leftHandRegisters) && (
              <div className="SinglePost--Characteristics--Column taLeft">
                <h5>Αριστερό χέρι</h5>
                {leftHandBass && (<div>Μπάσα: <strong>{leftHandBass}</strong></div>)}
                {leftHandReeds && (<div>Φωνές: <strong>{leftHandReeds}</strong></div>)}
                {leftHandRegisters && (<div>Ρετζίστρα: <strong>{leftHandRegisters}</strong></div>)}
              </div>
            )}
            <br />
            {cassotto && (<div>Cassotto: <strong>{cassotto}</strong></div>)}
            {weight && (
              <div className="SinglePost--Characteristics--Column taLeft">
                <div>Βάρος: <strong>{weight} (kg)</strong></div>
              </div>
            )}
            {dimensions && (
              <div className="SinglePost--Characteristics--Column taLeft">
                <div>Διαστάσεις: <strong>{dimensions} (cm)</strong></div>
              </div>
            )}
            {specialFeatures && (<div className="SinglePost--Characteristics--SpecialFeatures">{specialFeatures}</div>)}
          </div>


          <section className="section">
            <div className="container">
              <Gallery images={gallery} />
            </div>
          </section>

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                <ChevronLeft />
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                <ChevronRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        //body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      id
      frontmatter {
        title
        template
        date(formatString: "MMMM Do, YYYY")
        featuredImage
        excerpt
        rightHandNotes
        rightHandReeds
        rightHandRegisters
        cassotto
        leftHandBass
        leftHandReeds
        leftHandRegisters
        specialFeatures
        weight
        dimensions
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
