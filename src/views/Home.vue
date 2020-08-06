<template>
  <b-container>
    <b-row align-v="center">
      <job-card v-for="job in displayJobs" :key="job.id" :name="job.name" :id="job.id"></job-card>
    </b-row>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="pagenate(currentPage)"
    ></b-pagination>
  </b-container>
</template>

<script>
import JobCard from "@/components/JobCard.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    "job-card": JobCard
  },
  computed: {
    ...mapGetters(["jobs", "displayJobs", "rows"])
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      currentPage: 1,
      perPage: 3
    };
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchJobs");
      console.log("test", this.$store.getters.jobs);
    },
    pagenate(currentPage) {
      this.$store.dispatch("paginate", { currentPage, perPage: this.perPage });
    }
  }
};
</script>
