<template>
  <div class="picture">
    <h1>Astronomy Picture of the Day</h1>
    <img :src="pictureURL" />
    <p class="description" v-text="pictureDescription"></p>
  </div>
</template>

<script>
import { getPictureOfTheDay } from "../api";

export default {
  name: "PictureView",
  data() {
    return {
      pictureURL: "",
      pictureDescription: ""
    };
  },
  methods: {
    async fetchPicture() {
      const data = await getPictureOfTheDay();
      this.pictureURL = data.url;
      this.pictureDescription = data.explanation
    },
  },
  created() {
    this.fetchPicture();
  },
};
</script>

<style scoped>
.picture {
    margin-top: 30px;
    text-align: center;
}
.description {
    margin: 0 auto;
    max-width: 700px;
    margin-bottom: 30px;
}
img {
  display: block;
  width: 70%;
  height: auto;
  margin: 30px auto;
}
</style>