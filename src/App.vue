<template>
  <div id="app">
    <main>
      <h2 class="title">Weather App</h2>
      <div class="search-box">
        <input
          type="text"
          placeholder="Write the City Name and Press Enter"
          class="search-bar"
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>
      <!-- List Pagination -->
      <div>
        <div class="overflow-auto" v-if="items.length != 0">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>

          <p class="c-page">Page: {{ currentPage }}</p>

          <b-table
            class="table"
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            large
          ></b-table>
        </div>
        <div>
          <b-button size="lg" variant="primary" v-on:click="fetchInformation"
            >Show My Saved List</b-button
          >
          <b-button
            v-on:click="cancelList"
            v-if="items.length != 0"
            variant="danger"
            size="lg"
            class="cancel-btn"
            >Cancel</b-button
          >
        </div>
      </div>
      <!--Searched City Weather  -->
      <div class="weather-cont" v-if="typeof weather.main != 'undefined'">
        <div class="location-cont">
          <div class="location">{{ weather.name }}</div>
          <div class="date">{{ dateBuilder() }}</div>
          <div class="weather-box">
            <div class="temp">
              <div>Temp: {{ Math.round(weather.main.temp) }}°C</div>
              <div>Feel Likes: {{ Math.round(weather.main.feels_like) }}°C</div>
              <div>Wind-Speed: {{ weather.wind.speed }} Km/Hr</div>
              <div>
                Visibility: {{ (weather.visibility / 1000).toFixed(2) }} Km
              </div>
            </div>
            <div class="weather-status">{{ weather.weather[0].main }}</div>
            <b-button
              v-on:click="post"
              @click="$bvModal.show('save Data')"
              size="lg"
              variant="primary"
              >Save To List</b-button
            >
            <b-modal id="save Data" hide-footer>
              <template v-slot:modal-title>
                Saving Data ...
              </template>
              <div class="d-block text-center">
                <h3>Weather Data Saved Correctly</h3>
              </div>
              <b-button class="mt-3" block @click="$bvModal.hide('save Data')"
                >Close Me</b-button
              >
            </b-modal>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  //  Public Api from weather home site 'https://home.openweathermap.org/api_keys'
  data() {
    return {
      api_key: "b0718ef887ec231d56c4dcbf4436821d",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
      perPage: 2,
      currentPage: 1,
      items: []
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then(res => {
            return res.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },

    fetchInformation() {
      fetch(`http://localhost:3000/`)
        .then(res => {
          return res.json();
        })
        .then(this.setValues);
    },

    setValues(data) {
      this.items = data;
    },

    cancelList: function() {
      this.items = [];
    },
    post: function() {
      this.$http.post("http://localhost:3000/profile", {
        name: this.weather.name,
        temp: `${Math.round(this.weather.main.temp)}°C`,
        feellike: `${Math.round(this.weather.main.feels_like)}°C`,
        windspeed: `${this.weather.wind.speed} Km/Hr`,
        visibility: `${this.weather.visibility / 1000} Km`,
        status: this.weather.weather[0].main,
        date: this.dateBuilder()
      });
    },

    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "montserrat", sans-serif;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/banff.png");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to top,
    rgba(73, 90, 97, 0.25),
    rgba(47, 57, 65, 0.75)
  );
}

.search-box .search-bar {
  display: block;
  width: 380px;
  padding: 15px;
  color: #050205;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(74, 245, 88, 0.25);
  background-color: rgba(173, 253, 99, 0.5);
  border-radius: 16px 0px 16px;
  transition: 0.4s;
  margin-bottom: 2%;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(37, 36, 32, 0.25);
  background-color: rgba(248, 250, 127, 0.75);
  border-radius: 0px 16px 0px 16px;
}

.location-cont .location {
  color: #fff;
  font-size: 60px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  margin-top: 0;
}

.location-cont .date {
  color: #fff;
  text-shadow: 3px 6px rgba(26, 63, 9, 0.25);
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: rgb(14, 17, 14);
  font-size: 40px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(146, 131, 131, 0.25);
  background-color: rgba(21, 150, 155, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather-status {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.c-page {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 30px;
  color: rgb(253, 253, 253);
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  font-size: larger;
  color: floralwhite;
}

.title {
  color: #fff;
}

.cancel-btn {
  margin: 5px;
}
</style>
