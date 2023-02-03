<template>
    <div id="map-div"></div>
</template>
<script>
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
// import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage'
import {
  transform
} from 'ol/proj.js';


export default {
    components:{},
    data(){
        return {
            accessToken:'pk.eyJ1Ijoiam9haGVycmVyYW1hIiwiYSI6ImNsM2ZsOXZuejBibmYzam4wbGtra3h4Y2EifQ.vBdQwpdDOBPUu6muBho6jQ'
        }
    }
    ,
    async mounted() {
        const osm = new TileLayer({
            title:"OSM",
            baseLayer: true,
            source: new OSM(),
        });
        const map = new Map({
            target: 'map-div',
            layers: [osm],
            view: new View({
                center: transform([7.62571, 51.96236], 'EPSG:4326', 'EPSG:3857'),
                zoom: 10,
            }),
        });
        const source = new GeoTIFF({
            title:"Primary Source",
            sources: [
                {
                url: 'https://joaherrerama.github.io/OpenEO-processes-js/assets/sample_data/sentinel_muenster_30.tif',
                // overviews: ['https://openlayers.org/data/raster/no-overviews.tif.ovr'],
                bands: [4,2,3]
                },
            ],
        });
        const layerGeotiff = new TileLayer({
            title: "Münster 100",
            source: source,
            visible: false
        });
        map.addLayer(layerGeotiff);
        map.addControl (new LayerSwitcherImage());
    },
}
</script>
<style>
#map-div{
    width: 100%;
    height: 100vh;
}
.mapboxgl-control-container{
    display: none;
}
</style>