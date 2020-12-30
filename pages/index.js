import Head from 'next/head'
import Container from '../components/container'
// import MoreStories from '../components/more-stories'
// import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllPostsForHomeES } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts: { nodes }, preview  }) {

  console.log( nodes );
  const heroPost = nodes[0]?.node
  const morePosts = nodes.slice(1)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <div>
              <h2>{heroPost.title}</h2>
              <img src={heroPost.featuredImage?.node} />
              <small>{heroPost.date}</small>
              <author>{heroPost.author?.node}</author>
              <p>{heroPost.excerpt}</p>
            </div>
          )}
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {

  const language = 'ES'

  const allPosts = language === 'EN' ? await getAllPostsForHome(preview) : language === 'ES' ? await getAllPostsForHomeES(preview) : await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
  }
}
