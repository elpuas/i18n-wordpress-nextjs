import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import { getSpanishOnlyPost } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts: { edges }, preview, esPost  }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)
  const spanishHeroPost = esPost.edges[0]?.node.translation

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {console.log(esPost)}
          {esPost && (
            <HeroPost
              title={spanishHeroPost.title}
              // coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              // author={heroPost.author?.node}
              slug={spanishHeroPost.uri}
              excerpt={spanishHeroPost.content}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  const esPost = await getSpanishOnlyPost()
  return {
    props: { allPosts, preview, esPost },
  }
}
