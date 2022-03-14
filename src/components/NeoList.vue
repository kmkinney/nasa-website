<template>
  <div class="neo-list">
    <div v-for="neo in neos" :key="neo.id" class="neo">
      <img class="icon" src="@/assets/meteorite.svg" />
      <router-link :to="'/details/'+neo.id">
        <button :id="neo.id" class="details-btn">Show Details</button>
      </router-link>
      <h3 class="neo-header" :class="{ danger: neo.danger }">
        {{ neo.name }}
        <span v-show="neo.danger"> Potentially Hazardous</span>
      </h3>
      <p class="fact">
        Diameter: {{ Math.round(neo.min_size) }}-{{
          Math.round(neo.max_size)
        }}
        km
      </p>
      <p class="fact">Speed: {{ Math.round(neo.approach_speed) }} km/h</p>
      <p class="fact">Approach Distance: {{ Math.round(neo.dist) }} km</p>
      <p class="fact">
        Lunar Distance: {{ Number(neo.moon_dist).toPrecision(3) }}
      </p>
      <p class="fact">Approach Date: {{neo.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeoList",
  props: {
    neos: Array,
  },
};
</script>

<style scoped>
.neo {
  margin: 10px 0;
  color: var(--light);
  font-weight: 100;
}

.neo-header {
  margin-top: 5px;
}

.icon {
  width: 40px;
  margin-right: 20px;
}

.danger {
  color: red;
}

.fact {
  color: var(--light);
  font-weight: 100;
}

.details-btn {
  background-color: var(--primary);
  color: var(--black);
  border: none;
  border-radius: 3px;
  padding: 4px;
}
</style>