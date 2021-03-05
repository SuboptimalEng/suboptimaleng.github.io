<template>
  <Layout>
    <div v-for="(post, idx) in $page.posts.edges" :key="post.id" class="py-1">
      <g-link
        :to="post.node.path"
        class="font-semibold text-2xl hover:underline"
      >
        {{ post.node.title }}
      </g-link>
      <div class="flex flex-row text-sm font-light">
        <time :datetime="post.node.date">
          {{ post.node.date }}
        </time>
        <div class="mx-1 font-black">·</div>
        <div class="italic">{{ post.node.ttr }} min read</div>
      </div>
    </div>

    <Pager
      :info="$page.posts.pageInfo"
      class="text-center text-xl font-medium space-x-1"
    />
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (
    filter: { path: { ne: "/blog/about/" } },
    sortBy: "date",
    order: DESC,
    perPage: 10,
    page: $page
  ) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        ttr
        date (format: "MMM D, Y")
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
    title: 'Blog',
  },
};
</script>

<style scoped>
.active {
  background-color: lightgray;
  border-radius: 2px;
  padding: 2px;
}
</style>
