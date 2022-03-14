<template>
  <div class="date">
    <img class="logo" src="@/assets/meteorite.svg" />
    <LoadingSpinner v-show="loading"/>
    <!-- <button @click.prevent="toggleLoading">Loading</button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "DateView",
  components: {
    LoadingSpinner,
  },
  data() {
      return {
        loading: true
      }
  },
  methods: {
      toggleLoading(){
          this.loading = !this.loading;
      }
  }
};
</script>

<style scoped>
.logo {
  width: 50px;
  height: auto;
}
</style>