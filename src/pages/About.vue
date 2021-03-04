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
