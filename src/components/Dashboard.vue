<template>
  <div class="page-layout animated fadeIn">
    <div class="page-contents">
      <h2 v-if="pieData.length === 0">Click some answers on the review and return to dashboard.</h2>
      <div class="pie-chart"></div>
      <table>
        <tr>
          <th>vendorID</th>
          <th>reviewID</th>
          <th>questionID</th>
          <th>answer</th>
          <th>commentEnglish</th>
        </tr>
        <template v-for="(vendor) in vendors">
          <template v-for="(review) in vendor.reviews">
            <tr
              v-for="(answer) in review.reviewContents.answers"
              v-bind:key="`${review.reviewID}${answer.questionID}`"
            >
              <td>{{vendor.vendorID}}</td>
              <td>{{review.reviewID}}</td>
              <td>{{answer.questionID}}</td>
              <td>{{answer.answer}}</td>
              <td>{{answer.commentEnglish}}</td>
            </tr>
          </template>
        </template>
      </table>
      <button v-on:click="saveToDatabase()">Save</button>
      <h2>{{responseFromServer}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pieData: [],
      vendors: this.$store.getters.getVendors,
      responseFromServer: '',
    };
  },
  methods: {
    async saveToDatabase() {
      this.responseFromServer = await this.$store.dispatch('saveToDatabase');
    },
  },
  mounted() {
    var width = 400;
    var height = 400;
    var radius = 200;
    var colors = d3.scale.category20();

    const yesReducer = (accumulator, currentValue) => (currentValue.answer === 'yes' ? accumulator + 1 : accumulator);
    const somewhatReducer = (accumulator, currentValue) =>
      currentValue.answer === 'somewhat' ? accumulator + 1 : accumulator;
    const noReducer = (accumulator, currentValue) => (currentValue.answer === 'no' ? accumulator + 1 : accumulator);

    this.pieData = [
      { option: 'yes', numResponses: this.vendors[0].reviews[0].reviewContents.answers.reduce(yesReducer, 0) },
      {
        option: 'somewhat',
        numResponses: this.vendors[0].reviews[0].reviewContents.answers.reduce(somewhatReducer, 0),
      },
      { option: 'no', numResponses: this.vendors[0].reviews[0].reviewContents.answers.reduce(noReducer, 0) },
    ];
    this.pieData = this.pieData.filter(data => data.numResponses > 0);

    var pie = d3.layout.pie().value(function(d) {
      return d.numResponses;
    });

    var arc = d3.svg.arc().outerRadius(radius);
    var chart = d3
      .select('.pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width - radius) + ',' + (height - radius) + ')')
      .selectAll('path')
      .data(pie(this.pieData))
      .enter()
      .append('g')
      .attr('class', 'slice');
    var slices = d3
      .selectAll('g.slice')
      .append('path')
      .attr('fill', function(d, i) {
        return colors(i);
      })
      .attr('d', arc);
    var text = d3
      .selectAll('g.slice')
      .append('text')
      .text(function(d, i) {
        return d.data.option;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return 'translate(' + arc.centroid(d) + ')';
      });
  },
  destroyed() {
    const pieGraph = document.getElementsByTagName('svg')[0];
    if (pieGraph) pieGraph.parentNode.removeChild(pieGraph);
  },
};
</script>

<style scoped>
</style>