<template>
    <div id="map-div"></div>
</template>
<script>
import Mapbox from "mapbox-gl";

export default {
    components:{},
    data(){
        return {
            accessToken:'pk.eyJ1Ijoiam9haGVycmVyYW1hIiwiYSI6ImNsM2ZsOXZuejBibmYzam4wbGtra3h4Y2EifQ.vBdQwpdDOBPUu6muBho6jQ'
        }
    }
    ,
    async mounted() {
        Mapbox.accessToken = this.accessToken;
        const map = new Mapbox.Map({
        container: "map-div",
        hash: false,
        //style: 'mapbox://styles/waltech2020/cl1cfotp000bl14o33021k93f',
        //style: "mapbox://styles/mapbox/dark-v10",
        center: [10.4515, 51.1657],
        zoom: 6,
        maxZoom: 17,
        });
        map.setStyle("mapbox://styles/mapbox/dark-v11");
        map.on("load", () => {
        this.map = map;
        });
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