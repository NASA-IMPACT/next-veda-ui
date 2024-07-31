import { BlogPosts } from 'app/components/posts'
import { getDatasets } from 'app/blog/utils/mdx'

import Layout from 'app/layout'
import NestedLayout from 'app/components/nested-layout'

export default function Page() {
  const posts = getDatasets();
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Datasets</h1>
      <BlogPosts postType="dataset" posts={posts} />
    </section>
  )
}

