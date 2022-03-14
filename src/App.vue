<template>
  <div id="app">
    <NavComponent/>
    <!-- <div class="top-bar">
      <span>Made by Kevin Kinney</span>
      <a href="http://github.com/kmkinney/nasa-website"
        >See the code on Github!</a>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
import NavComponent from "@/components/NavComponent.vue"
export default {
    name: 'App',
    components: {
        NavComponent
    }
}
</script>


<style>
/*FONT*/
@import url("https://fonts.googleapis.com/css2?family=Space+Mono&display=swap");

/*THEME COLORS*/
:root {
  --black: #000;
  --dark: #14213d;
  --primary: #fca311;
  --light: #e5e5e5;
  --white: #fff;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  background-color: var(--dark);
  color: var(--primary);
  font-family: "Space Mono", monospace;
}
</style>
