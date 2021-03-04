<template>
  <Layout>
    <div>{{ $static.post.title }}</div>
  </Layout>
</template>

<static-query>
query {
  post(path: "/blog/about") {
    title
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: 'about',
  },
};
</script>
