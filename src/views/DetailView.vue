<template>
  <div class="page">
    <LoadingSpinner v-show="loading" />
    <div class="neo">
        <h1>
          {{ neo.name }}
          <span v-show="neo.danger" class="danger">POTENTIALLY HAZARDOUS</span>
        </h1>
        <h3 class="fact">
          Diameter: {{ Math.round(neo.min_size) }}-{{ Math.round(neo.max_size) }} meters
        </h3>
        <h3 class="fact">Speed: {{ Math.round(neo.approach_speed) }} km/h</h3>
        <h3 class="fact">
          Minimum Lunar Distance: {{ Number(neo.min_moon_dist).toPrecision(3) }}
        </h3>
        <h3>
          Date of closest known approach: {{neo.closest_date}}
        </h3>
        <span class="earth">&#9679;&lt;-EARTH</span>
        <span class="moon">&#9679;&lt;-MOON</span>
        <span class="asteroid">&#9679;&lt;-ASTEROID</span>
        <canvas id="map"></canvas>
    </div>
  </div>
</template>

<script>
import { getNeoById } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "DetailView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      error: false,
      loading: false,
      neoId: this.$route.params.id,
      neo: {},
    };
  },
  methods: {
    async getNeoData() {
      try {
        this.loading = true;
        const neoData = await getNeoById(this.neoId);
        this.loading = false;
        this.neo = neoData;
        this.drawMap();
      } catch (err) {
        this.loading = false;
        this.error = true;
      }
    },
    drawMap() {
      const canvas = document.getElementById("map");
      canvas.style.width = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      const moonDist = this.neo.min_moon_dist
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h)
      if (moonDist > 1) {
        const scale = (w - 50) / moonDist;
        this.drawCircle(ctx, 25, h / 2, Math.min(25, scale / 2), "blue");
        this.drawCircle(ctx, 25 + scale, h / 2, Math.min(12, scale / 4), "grey");
        this.drawCircle(ctx, w - 25, h / 2, 2, "brown");
      } else {
        const scale = (w - 50) * moonDist;
        this.drawCircle(ctx, 25, h / 2, 10, "blue");
        this.drawCircle(ctx, w - 25, h / 2, 5, "grey");
        this.drawCircle(ctx, 25 + scale, h / 2, 2, "brown");
      }
    },
    drawCircle(ctx, x, y, r, color) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();
    },
  },
  computed: {
    ctx() {
      const canvas = document.getElementById("map");
      return canvas.getContext("2d");
    },
  },
  created() {
    if(this.neoId !== '') this.getNeoData();
  },
};
</script>

<style scoped>
.danger {
    color: red;
}
.earth {
  color: blue;
  margin-right: 1em;
}

.moon {
  margin-right: 1em;
  color: grey;
}

.asteroid {
  color: brown;
}
</style>