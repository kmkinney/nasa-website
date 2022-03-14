<template>
  <div id="app">
    <NavComponent/>
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
.page {
    max-width: 950px;
    margin: 0 auto;
    padding: 5px 10px;
}
</style>
