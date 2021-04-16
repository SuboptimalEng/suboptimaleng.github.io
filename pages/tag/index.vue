<script>
export default {
  middleware({ redirect }) {
    return redirect('301', '/blog/2021-01-about');
  },
};
</script>
