<template>
<div style="margin:20px;height:300px;position:relative;">
  <it-button type="primary" v-on:click="() => {get_location();}" round class="refresh">
          <it-icon name="refresh" style="font-size:30px;" outlined/>
  </it-button>
  <it-button type="primary" v-on:click="() => {refreshMap_line()}" round class="refresh" style="margin-left:70px">
          <it-icon name="refresh" style="font-size:30px;" outlined/>
  </it-button>
  <div
  v-if="selectedpointTime&&selectedpointLocation"
  v-on:click="() => {selectedpointTime = null;selectedpointLocation = null;}"
  style="position:absolute;background-color: #f7faff; border-radius:20px; padding:15px; z-index:40; bottom:0; right:0; margin-bottom:10px; margin-right:10px;font-size:20px;"
  >
  <p>{{selectedpointTime}}</p>
  {{selectedpointLocation[1]}}
  {{selectedpointLocation[0]}}
  </div>
<div id="map" style="border-radius:20px;position:absolute;"></div>
</div>
</template>

<script>
import { dateTimetoString } from "../usedateTimetoString";
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_AT;
import axios from 'axios';
export default {
name: 'Map',
data(){
  return {
    map: null,
    selectedpointTime: null,
    selectedpointLocation: null,
  line_json:{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {"type": "LineString",'coordinates': []}
        }
    ]
  },
  point_json: {
    type: 'FeatureCollection',
    features: []
  }
  }
},

methods:{
  async get_location(){
    const res = await axios.get('http://localhost/api/location');
    this.point_json.features = res.data.point;
    console.log("after added:",this.point_json.features);
    this.refreshMap_Point()
  },

  refreshMap_line(){
    var coordinatelist = [];
    this.point_json.features.forEach(function(feature){
    coordinatelist.push(feature["geometry"]["coordinates"]);
    });
    this.line_json.features[0].geometry.coordinates = coordinatelist;
    console.log("after linerefresh:",this.line_json);
    this.map.getSource('route').setData(this.line_json);
  },  

  mountMap(){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      //style: 'mapbox://styles/mapbox/light-v10',
      center: [parseFloat(process.env.VUE_APP_MAP_CENTER_LONGITUDE), parseFloat(process.env.VUE_APP_MAP_CENTER_LATITUDE)],
      zoom: 15
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new MapboxLanguage({
      defaultLanguage: 'ja'
    }));
    this.map.on('load', () => {
        this.map.addSource('route', {
          type: 'geojson',
          data: this.line_json,
          lineMetrics: true
        });
      this.map.addSource('point', {
        'type': 'geojson',
        'data': this.point_json
      });
      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        paint: {
          'line-color': 'red',
          'line-width': 14,
          // 'line-gradient' must be specified using an expression
          // with the special 'line-progress' property
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'blue',
            0.1,
            'royalblue',
            0.3,
            'cyan',
            0.5,
            'lime',
            0.7,
            'yellow',
            1,
            'red'
          ]
        },
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
    });
    this.refreshMap_Point();
    
    this.map.addLayer({
      'id': 'points',
      'type': 'circle',
      'source': 'point', // reference the data source
        'paint': {
          'circle-color': '#4264fb',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
          }
    });
    this.map.on('click', 'points', (e) => {
        this.map.flyTo({
        center: e.features[0].geometry.coordinates
      });
      this.selectedpointTime = dateTimetoString(e.features[0].properties.description);
      this.selectedpointLocation = e.features[0].geometry.coordinates;
      console.log(this.selectedpointTime);
    });

    this.map.on('mouseenter', 'points', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
 
    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'points', () => {
      this.map.getCanvas().style.cursor = '';
    });

    });
  },
refreshMap_Point(){
      const dataSource = this.map.getSource('point');
      dataSource.setData(this.point_json);
  },
},

mounted() {
  this.mountMap();
}
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
.refresh {
  position:absolute;
  height:34px;
  width:60px;
  z-index:300;
}
</style>
<style>
.marker {
  background-color:red;
  background-size: cover;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
  border-radius: 20px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
</style>