<template>
  <div class="flex justify-center space-x-2 uppercase">
    <div v-if="currentPage === 1" :class="disabledStyle">
      <font-awesome-icon :icon="faAngleDoubleLeft" class="sm:mr-2" />
      <span class="hidden sm:inline">First</span>
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: 1 } }"
      :class="buttonStyles"
    >
      <font-awesome-icon :icon="faAngleDoubleLeft" class="sm:mr-2" />
      <span class="hidden sm:inline">First</span>
    </nuxt-link>

    <div v-if="currentPage === 1" :class="disabledStyle">
      <font-awesome-icon :icon="faAngleLeft" class="sm:mr-2" />
      <span class="hidden sm:inline">Prev</span>
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: prevPage } }"
      :class="buttonStyles"
    >
      <font-awesome-icon :icon="faAngleLeft" class="sm:mr-2" />
      <span class="hidden sm:inline">Prev</span>
    </nuxt-link>

    <div v-if="currentPage === totalPages" :class="disabledStyle">
      <span class="hidden sm:inline">Next</span>
      <font-awesome-icon :icon="faAngleRight" class="sm:ml-2" />
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: nextPage } }"
      :class="buttonStyles"
    >
      <span class="hidden sm:inline">Next</span>
      <font-awesome-icon :icon="faAngleRight" class="sm:ml-2" />
    </nuxt-link>

    <div v-if="currentPage === totalPages" :class="disabledStyle">
      <span class="hidden sm:inline">Last</span>
      <font-awesome-icon :icon="faAngleDoubleRight" class="sm:ml-2" />
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: totalPages } }"
      :class="buttonStyles"
    >
      <span class="hidden sm:inline">Last</span>
      <font-awesome-icon :icon="faAngleDoubleRight" class="sm:ml-2" />
    </nuxt-link>
  </div>
</template>

<script>
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'Pagination',
  data() {
    return {
      faAngleLeft,
      faAngleRight,
      faAngleDoubleLeft,
      faAngleDoubleRight,
    };
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    buttonStyles() {
      return 'border rounded flex justify-center place-items-center px-4 py-1 text-sm bg-white hover:bg-black hover:text-white transform duration-400 ease-in-out';
    },
    disabledStyle() {
      return 'border rounded flex justify-center place-items-center px-4 py-1 text-sm bg-white text-gray-300';
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1;
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1;
    },
    nextPage() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages;
    },
  },
};
</script>
