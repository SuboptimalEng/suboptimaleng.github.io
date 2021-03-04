<template>
  <Layout>
    <div v-for="post in $page.posts.edges" :key="post.id" class="flex flex-col">
      <g-link :to="post.node.path" rel="bookmark" class="font-medium">
        {{ post.node.title }}
      </g-link>
      <div class="flex flex-row justify-between text-xs font-extralight">
        <div class="flex flex-row space-x-2">
          <div
            v-for="tag in post.node.tags"
            class="bg-gray-600 px-1 text-white rounded-sm"
          >
            {{ tag.title }}
          </div>
        </div>
        <time :datetime="post.node.date">
          {{ post.node.date }}
        </time>
      </div>
    </div>

    <Pager :info="$page.posts.pageInfo" class="text-center text-xl" />
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 20, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMM D, Y")
        summary
        path
        tags {
          title
        }
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome';

export default {
  components: {
    Pager,
  },
  metaInfo: {
    title: 'blog',
  },
};
</script>
