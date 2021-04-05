<template>
  <div class="flex justify-center space-x-2 text-base sm:text-2xl pt-2 pb-4">
    <!-- <div v-if="currentPage === 1" :class="disabledStyle">
      <font-awesome-icon :icon="faAngleDoubleLeft" />
      <font-awesome-icon :icon="faAngleDoubleLeft" class="sm:mr-1" />
      <span class="hidden sm:inline">First</span>
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: 1 } }"
      :class="buttonStyles"
    >
      <font-awesome-icon :icon="faAngleDoubleLeft" />
      <font-awesome-icon :icon="faAngleDoubleLeft" class="sm:mr-1" />
      <span class="hidden sm:inline">First</span>
    </nuxt-link> -->

    <div v-if="currentPage === 1" :class="disabledStyle">
      <font-awesome-icon :icon="faAngleLeft" class="text-2xl" />
      <!-- <font-awesome-icon :icon="faAngleLeft" class="sm:mr-1" />
      <span class="hidden sm:inline">Prev</span> -->
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: prevPage } }"
      :class="buttonStyles"
    >
      <font-awesome-icon :icon="faAngleLeft" />
      <!-- <font-awesome-icon :icon="faAngleLeft" class="sm:mr-1" />
      <span class="hidden sm:inline">Prev</span> -->
    </nuxt-link>

    <div v-for="i in totalPages" :key="i" class="py-1">
      <div v-if="i === currentPage" class="rounded-sm bg-black text-white px-1">
        {{ i }}
      </div>
      <div v-else>
        <nuxt-link :to="{ name: 'blog-page-page', params: { page: i } }">
          {{ i }}
        </nuxt-link>
      </div>
    </div>

    <div v-if="currentPage === totalPages" :class="disabledStyle">
      <!-- <span class="hidden sm:inline">Next</span>
      <font-awesome-icon :icon="faAngleRight" class="sm:ml-1" /> -->
      <font-awesome-icon :icon="faAngleRight" />
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: nextPage } }"
      :class="buttonStyles"
    >
      <!-- <span class="hidden sm:inline">Next</span>
      <font-awesome-icon :icon="faAngleRight" class="sm:ml-1" /> -->
      <font-awesome-icon :icon="faAngleRight" />
    </nuxt-link>

    <!-- <div v-if="currentPage === totalPages" :class="disabledStyle">
      <span class="hidden sm:inline">Last</span>
      <font-awesome-icon :icon="faAngleDoubleRight" class="sm:ml-2" />
      <font-awesome-icon :icon="faAngleDoubleRight" />
    </div>

    <nuxt-link
      v-else
      :to="{ name: 'blog-page-page', params: { page: totalPages } }"
      :class="buttonStyles"
    >
      <span class="hidden sm:inline">Last</span>
      <font-awesome-icon :icon="faAngleDoubleRight" class="sm:ml-2" />
      <font-awesome-icon :icon="faAngleDoubleRight" />
    </nuxt-link> -->
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
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      faAngleLeft,
      faAngleRight,
      faAngleDoubleLeft,
      faAngleDoubleRight,
    };
  },
  computed: {
    buttonStyles() {
      return 'border border-black rounded flex justify-center place-items-center text-base sm:text-2xl px-2 py-1 bg-white hover:bg-black hover:text-white transform duration-400 ease-in-out ';
    },
    disabledStyle() {
      return 'border rounded flex justify-center place-items-center px-2 py-1 text-base sm:text-2xl bg-white text-gray-300';
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
