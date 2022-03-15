<template>
  <div class="page">
    <div class="header">
      <img class="logo" src="@/assets/meteor-shower.svg" />
      <h1 class="title">Track Near Earth Objects!</h1>
    </div>
    <LoadingSpinner v-show="loading" />

    <h3>Learn about asteroids that make close approaches to Earth!</h3>

    <form>
      <span>Use Date Range</span>
      <label class="toggle">
          <input type="checkbox" v-model="isRange">
          <span class="slider"></span>
      </label>
      <div class="calendar-row">
        <div class="">
          <label for="start-date">Pick a Day:</label>
          <datepicker
            :inline="true"
            v-model="startDate"
            calendar-class="calendar"
            input-class="input"
            name="start-date"
          ></datepicker>
        </div>
        <div class="end-date" v-show="isRange">
          <label for="end-date">Pick an End Day:</label>
          <datepicker
            :inline="true"
            v-model="endDate"
            :disabled-dates="disabledDates"
            calendar-class="calendar"
            input-class="input"
            class="date-picker"
            name="end-date"
          ></datepicker>
        </div>
      </div>
      <button class="submit-button" @click.prevent="requestNeos">Search</button>
      <!-- <h3>{{date}}</h3> -->
      <!-- <h3>{{formattedDate}}</h3> -->
    </form>
    <NeoList :neos="neoData" />
    <h2 v-show="error">Something went wrong...</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NeoList from "@/components/NeoList.vue";
import Datepicker from "vuejs-datepicker";
import { getAllByDay, getAllInRange } from "@/api";

export default {
  name: "DateView",
  components: {
    LoadingSpinner,
    NeoList,
    Datepicker,
  },
  data() {
    return {
      format: "yyyy-MM-dd",
      loading: false,
      error: false,
      isRange: false,
      startDate: new Date().toString(),
      endDate: new Date().toString(),
      neoData: this.$root.$data.savedSearch,
    };
  },
  methods: {
    async requestNeos() {
      try {
        this.loading = true;
        console.log("called");
        let data = [];
        if (this.isRange) {
          data = await getAllInRange(
            this.formattedStartDate,
            this.formattedEndDate
          );
        } else {
          data = await getAllByDay(this.formattedStartDate);
        }
        console.log("recieved");
        this.loading = false;
        this.neoData = data;
        this.$root.$data.savedSearch = data;
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.error = true;
      }
    },
  },
  computed: {
    formattedStartDate() {
      return new Date(this.startDate).toISOString().split("T")[0];
    },
    formattedEndDate() {
      return new Date(this.endDate).toISOString().split("T")[0];
    },
    disabledDates() {
        console.log(this.startDate)
        let minDate = new Date(this.startDate)
        let maxDate = minDate.setDate(minDate.getDate() + 6)
        return {
            to: new Date(this.startDate),
            from: new Date(maxDate)
        }
    }
  },
};
</script>

<style>
.logo {
  width: 40px;
  height: auto;
  margin-right: 20px;
  transform: rotate(45deg);
}

/* Calendar styling */
.calendar-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.calendar {
  background-color: var(--black) !important;
  color: var(--primary) !important;
  border: none !important;
}
.selected {
  background-color: var(--primary) !important;
  color: var(--dark) !important;
}
.day:hover {
  border-color: var(--primary) !important;
}
.next:after {
  border-left: 10px solid var(--primary) !important;
}
.prev:after {
  border-right: 10px solid var(--primary) !important;
}
.end-date {
  margin-left: 15px;
}

/* Buttons */
.toggle {
    --width: 50px;
    --height: calc(var(--width) / 3);

    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: var(--height);
    cursor: pointer;
    background-color: var(--primary);
    margin-left: 10px;
    top: 3px;
}

/* hiding checkbox */
.toggle input {
    display: none;
}

/* Creating slider */
.toggle .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--height);
    background-color: #ccc;
    transition: all 0.4s ease-in-out;
}
.toggle .slider::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--height));
    height: calc(var(--height));
    border-radius: calc(var(--height) / 2);
    background-color: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.4s ease-in-out;
}

/* Adding slider effect */
.toggle input:checked + .slider {
    background-color: var(--primary);
}
.toggle input:checked + .slider::before {
    transform: translateX(calc(var(--width) - var(--height)));
}

.submit-button {
  padding: 5px 10px;
  display: block;
  border: none;
  background-color: var(--primary);
  color: var(--dark);
  border-radius: 5px;
  font-family: "Space Mono", monospace;
  margin-top: 15px;
}
</style>