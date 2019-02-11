<template>
  <div class="page-layout animated fadeIn">
    <div class="page-contents">
      <h2 v-if="pieData.length === 0">Click some answers on the review and return to dashboard.</h2>
      <h2 v-if="pieData.length > 0">Simple pie chart recap of your review:</h2>
      <div class="pie-chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answers: this.$store.getters.getAnswers,
      responses: this.$store.getters.getResponses,
      pieData: [],
    };
  },
  mounted() {
    var width = 400;
    var height = 400;
    var radius = 200;
    var colors = d3.scale.category20();

    this.pieData = this.responses.map(response => {
      return { option: `${response.option} (${response.numResponses})`, numResponses: response.numResponses };
    });

    this.pieData = this.pieData.filter(response => response.numResponses > 0);

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
  methods: {
  },
};
</script>

<style scoped>
</style>