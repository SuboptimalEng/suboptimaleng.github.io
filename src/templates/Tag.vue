<template>
  <Layout :tag="$page.tag.title">
    <div v-for="post in $page.tag.belongsTo.edges" :key="post.id" class="py-1">
      <g-link
        :to="post.node.path"
        class="font-semibold text-2xl sm:text-4xl hover:underline"
      >
        {{ post.node.title }}
      </g-link>
      <div class="flex space-x-1 text-sm sm:text-lg font-light">
        <time :datetime="post.node.date">
          {{ post.node.date }}
        </time>
        <div class="font-black">·</div>
        <div class="italic">{{ post.node.ttr }} min read</div>
      </div>
    </div>

    <Pager
      :info="$page.tag.belongsTo.pageInfo"
      class="text-center text-xl sm:text-3xl font-medium space-x-1"
    />
  </Layout>
</template>

<page-query>
query ($id: ID!, $page: Int) {
  tag: tag(id: $id) {
    id
    title
    belongsTo(
      sortBy: "date",
      order: DESC,
      perPage: 8,
      page: $page
    ) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on Post {
            id
            title
            ttr
            date (format: "MMM D, Y")
            path
          }
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
  metaInfo() {
    const title = this.$page.tag.id;
    return {
      title: title.charAt(0).toUpperCase() + title.slice(1),
    };
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
