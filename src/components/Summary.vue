<template>
  <div class="page-layout animated fadeIn">
    <div class="page-contents">
      <table>
        <tr>
          <th>vendorName</th>
          <th>vendorID</th>
          <th>reviewPeriod</th>
          <th>questionsComplete</th>
        </tr>
        <template v-for="(reviewGroup) in allReviews">
          <template v-for="(review) in reviewGroup.reviews">
            <tr v-bind:key="`summary${review.reviewPeriod}`">
              <td>{{allVendors.find(v => v.vendorID === reviewGroup.vendorID).vendorName }}</td>
              <td>{{reviewGroup.vendorID}}</td>
              <td>{{review.reviewPeriod}}</td>
              <td>{{review.answers.length}}</td>
            </tr>
          </template>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allReviews: this.$store.getters.getAllReviews,
      allVendors: [],
    };
  },
  async mounted() {
    await this.$store.dispatch('populateAllVendors');
    this.allVendors = this.$store.getters.getAllVendors;
  },
};
</script>

