<template>
  <div class="hello d-flex flex-nowrap">
    <MenuBar/>

    <div class="col d-flex flex-wrap">

      <div class="col-12 text-left px-0">
        <h1 class="text-red-1 text-uppercase font-weight-bold text-head">Statistiques</h1>
      </div>
      <div class="col-6 px-0 chart-block" id="secteurs">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title text-left px-3 py-4">Top Secteurs d'Activite (Parmi {{ count.activities }})
              <i v-on:click="expandFrame('secteurs')" ref="secteurs" class="fa fa-expand float-right"></i></h4>
            <div id="chart1"></div>
          </div>
        </div>
      </div>
      <div class="col-6 pl-0 chart-block" id="entreprises">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title text-left px-3 py-4">Top Entreprises (Parmi {{ count.industry }})
              <i v-on:click="expandFrame('entreprises')" ref="entreprises" class="fa fa-expand float-right"></i></h4>
            <div id="chart2"></div>
          </div>
        </div>
      </div>
      <div class="col-12 pl-0 mt-4 chart-block" id="studentMap">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title text-left px-3 py-4">Map ({{ count.students }} etudiants)
              <i v-on:click="expandFrame('studentMap')" ref="studentMap" class="fa fa-expand float-right"></i></h4>

            <l-map :zoom=3 :center="[47.413220, -1.219482]" :maxZoom="7"
                   style="position: relative;padding: 0;width: 100%;height: 600px;">

              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
              <l-circle v-for="point in points" :key="point.coo.lat" :lat-lng="point.coo" :radius="circle.radius"
                        color="green">
                <l-tooltip>{{ point.text }}</l-tooltip>
              </l-circle>

              <!--<l-marker :lat-lng="[47.313220, -1.319482]" pane="overlayPane">-->
              <!--<l-tooltip>France 20 etudiants</l-tooltip>-->
              <!--</l-marker>-->
            </l-map>
            <div id="chart5" style="height: 500px;display: none;"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import MenuBar from './MenuBar'
  import 'leaflet/dist/leaflet.css'
  import * as am4core from '@amcharts/amcharts4/core'
  import * as am4charts from '@amcharts/amcharts4/charts'
  import * as am4maps from '@amcharts/amcharts4/maps'
  import {LCircle, LMap, LTileLayer, LTooltip} from 'vue2-leaflet'

  let _ = require('lodash')

  require('./../api')
  require('./../assets/vendor/wordLow')

  export default {
    name: 'hello',
    components: {MenuBar, LMap, LTileLayer, LTooltip, LCircle},
    watch: {
      resources: function () {
        this.calculate()
        this.prepare()
      }
    },
    data () {
      return {
        circle: {
          center: {'lat': 47.41322, 'lng': -1.219482},
          radius: 70500
        },
        zoom: 13,
        center: {'lat': 47.41322, 'lng': -1.219482},
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        marker: {'lat': 47.41322, 'lng': -1.219482},
        count: {
          industry: 0,
          activities: 0,
          students: 0
        },
        points: [],
        charts: {},
        calculated: {},
        resources: {},
        responses: {}
      }
    },
    methods: {
      expandFrame: function (id) {
        let el = document.getElementById(id)
        if (el.classList.contains('fullscreen')) {
          _.forEach(document.getElementsByClassName('chart-block'), function (eel) {
            eel.classList.remove('d-none')
          })
          el.classList.remove('fullscreen')
        } else {
          _.forEach(document.getElementsByClassName('chart-block'), function (eel) {
            eel.classList.add('d-none')
          })
          el.classList.remove('d-none')
          el.classList.add('fullscreen')
        }

        this.charts.chart1.invalidateSize()
      },
      calculate: function () {
        this.calculated.industryChart = _.chain(this.resources.content).groupBy('industryName').map(function (el, industry) {
          return {
            'category': industry,
            'value': _.size(el)
          }
        }).orderBy('value', 'desc').value()

        this.calculated.activityChart = _.chain(this.resources.content).groupBy('headline').map(function (el, competence) {
          return {
            'competence': competence,
            'compteur': _.size(el)
          }
        }).orderBy('compteur', 'desc').value()

        this.calculated.mapDrawChart = _.chain(this.resources.content).groupBy('countryCode').map(function (el, country) {
          return {
            'country': country,
            'count': _.size(el)
          }
        }).orderBy('count', 'desc').value()

        let _this = this

        _.forEach(this.calculated.mapDrawChart, function (item) {
          _this.calculated.countryFetched = _.find(window.countryLatLong, {country_code: item.country.toUpperCase()})
          _this.points.push({
            text: _this.calculated.countryFetched.name + ' - ' + item.count + ' Etudiants',
            coo:
              {
                lat: _this.calculated.countryFetched.latlng[0],
                lng:
                  _this.calculated.countryFetched.latlng[1]
              }
          })
        })
      },
      prepare: function () {
        this.count.industry = this.calculated.industryChart.length
        this.count.activities = this.calculated.activityChart.length
        this.count.students = this.resources.content.length

        /**
         * ---------------------------------------
         * This charts was created using amCharts 4.
         *
         * For more information visit:
         * https://www.amcharts.com/
         *
         * Documentation is available at:
         * https://www.amcharts.com/docs/v4/
         * ---------------------------------------
         */

        this.charts.chart1 = am4core.create('chart1', am4charts.PieChart)
        this.charts.chart1.responsive.enabled = true

        this.charts.chart1.data = _.take(this.calculated.activityChart, 5)

        var pieSeries = this.charts.chart1.series.push(new am4charts.PieSeries())

        pieSeries.dataFields.value = 'compteur'
        pieSeries.dataFields.category = 'competence'

        /**
         * Chart 2: TOP Entreprises
         */
        this.charts.chart2 = am4core.create('chart2', am4charts.XYChart)
        this.charts.chart2.responsive.enabled = true
        this.charts.chart2.data = _.take(this.calculated.industryChart, 3)

        let categoryAxis = this.charts.chart2.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'category'

        this.charts.chart2.yAxes.push(new am4charts.ValueAxis())

        var series = this.charts.chart2.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = 'value'
        series.dataFields.categoryX = 'category'
        series.name = 'Secteurs'

        // Themes begin
        // am4core.useTheme(am4themes_dark)
        // am4core.useTheme(am4themes_animated)
        // Themes end

        /**
         * MAP
         * Define SVG path for target icon
         */
        var targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z'

        // Create map instance
        this.charts.mapChart = am4core.create('chart5', am4maps.MapChart)

        // Set map definition
        this.charts.mapChart.geodata = window.am4geodataWorldLow

        // Set projection
        this.charts.mapChart.projection = new am4maps.projections.Miller()

        // Create map polygon series
        var polygonSeries = this.charts.mapChart.series.push(new am4maps.MapPolygonSeries())

        // Exclude Antartica
        polygonSeries.exclude = ['AQ']

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.strokeOpacity = 0.5
        polygonTemplate.nonScalingStroke = true
        polygonTemplate.fill = this.charts.chart1.colors.getIndex(0).lighten(0.5)

        // create capital markers
        this.charts.imageSeries = this.charts.mapChart.series.push(new am4maps.MapImageSeries())

        // define template
        var imageSeriesTemplate = this.charts.imageSeries.mapImages.template
        var circle = imageSeriesTemplate.createChild(am4core.Sprite)
        circle.scale = 0.4
        circle.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground')
        circle.path = targetSVG
        // what about scale...

        // set propertyfields
        imageSeriesTemplate.propertyFields.latitude = 'latitude'
        imageSeriesTemplate.propertyFields.longitude = 'longitude'

        imageSeriesTemplate.horizontalCenter = 'middle'
        imageSeriesTemplate.verticalCenter = 'middle'
        imageSeriesTemplate.align = 'center'
        imageSeriesTemplate.valign = 'middle'
        imageSeriesTemplate.width = 8
        imageSeriesTemplate.height = 8
        imageSeriesTemplate.nonScaling = true
        imageSeriesTemplate.tooltipText = '{title}'
        imageSeriesTemplate.fill = am4core.color('#fffff')
        imageSeriesTemplate.background.fillOpacity = 0
        imageSeriesTemplate.background.fill = am4core.color('#e5e5e5')
        imageSeriesTemplate.setStateOnChildren = true
        imageSeriesTemplate.states.create('hover')

        let featureSearch = null
        let _this = this

        _.forEach(this.calculated.mapDrawChart, function (item) {
          featureSearch = _.find(window.countryLatLong, {'country_code': item.country.toUpperCase()})

          _this.charts.imageSeries.data.push({
            'zoomLevel': 5,
            'scale': 0.5,
            'title': featureSearch.name + ' (' + item.count + ')',
            'latitude': featureSearch.latlng[0],
            'longitude': featureSearch.latlng[1]
          })
        })
      }
    },
    mounted () {
      this.getProfiles()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }

  .fullscreen {
    height: 100%;
    max-width: 100%;
    width: 100%;
    flex: auto;
  }

  #chart5 {
    width: 100%;
    height: 500px;
    overflow: hidden;
  }

  .map-marker {
    /* adjusting for the marker dimensions
    so that it is centered on coordinates */
    margin-left: -8px;
    margin-top: -8px;
  }

  .map-marker.map-clickable {
    cursor: pointer;
  }

  .pulse {
    width: 10px;
    height: 10px;
    border: 5px solid #f7f14c;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    background-color: #716f42;
    z-index: 10;
    position: absolute;
  }

  .map-marker .dot {
    border: 10px solid #fff601;
    background: transparent;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    border-radius: 60px;
    height: 50px;
    width: 50px;
    -webkit-animation: pulse 3s ease-out;
    -moz-animation: pulse 3s ease-out;
    animation: pulse 3s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    position: absolute;
    top: -20px;
    left: -20px;
    z-index: 1;
    opacity: 0;
  }

  @-moz-keyframes pulse {
    0% {
      -moz-transform: scale(0);
      opacity: 0.0;
    }
    25% {
      -moz-transform: scale(0);
      opacity: 0.1;
    }
    50% {
      -moz-transform: scale(0.1);
      opacity: 0.3;
    }
    75% {
      -moz-transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      -moz-transform: scale(1);
      opacity: 0.0;
    }
  }

  @-webkit-keyframes "pulse" {
    0% {
      -webkit-transform: scale(0);
      opacity: 0.0;
    }
    25% {
      -webkit-transform: scale(0);
      opacity: 0.1;
    }
    50% {
      -webkit-transform: scale(0.1);
      opacity: 0.3;
    }
    75% {
      -webkit-transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0.0;
    }
  }
</style>
