<template>
  <div>
    <div class="top-bar">
      <span>Made by Kevin Kinney</span>
      <a href="http://github.com/kmkinney/nasa-website"
        >See the code on Github!</a>
    </div>
    <nav class="navbar">
      <router-link class="nav-link" active-class="active" to="/" exact>Search By Date</router-link> |
      <!-- <router-link class="nav-link" active-class="active" to="/details">Search By Asteroid ID</router-link> | -->
      <router-link class="nav-link" active-class="active" to="/pic">Picture of the Day</router-link>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'NavComponent'
}
</script>

<style scoped>
/* Header styles */
.top-bar {
    width: 100%;
    padding: 10px 20px;
    background-color: var(--black);
    color: var(--light);
    overflow: auto;
}
.top-bar a{
    float: right;
    text-decoration: none;
    color: var(--light);
}
.top-bar a:hover{
    text-decoration: none;
    color: var(--primary);
}

.navbar {
    margin: 0 auto;
    max-width: 700px;
    text-align: center;
    margin-top: 5px;
}

.nav-link {
    text-decoration: none;
    color: var(--primary);
    /* margin: 0 5px; */
}
.nav-link:hover {
    color: var(--white);
}

.active {
    text-decoration: underline;
}
</style>