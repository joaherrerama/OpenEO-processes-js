<template>
  <div class="main">  
    <div class="row">
      <nav-bar></nav-bar>
    </div>
    <div class="row">
      <div class="col-6 text-center">
        <div class="container">
          <div class="title-head">
            <h4>Performance Analysis</h4>
          </div>
          <tabs
            v-model="selectedTab"
          >
            <tab
              class="tab"
              v-for="(tab, i) in tabs"
              :key="`t${i}`"
              :val="tab"
              :label="tab"
              :indicator="true"
            />
          </tabs>
          <tab-panels
            v-model="selectedTab"
            :animate="true"
          >
            <tab-panel
              v-for="(tab, i) in tabs"
              :key="`tp${i}`"
              :val="tab"
            >
            <div class="title">
              <h4>{{ usercases[tab]?.title }}</h4>
              <button class="btn btn-dark" type="button" :id="usercases[tab]?.id" @click="runUserCase(usercases[tab]?.id)">Run user case</button>
            </div>
            <div class="description">
              <p>{{ usercases[tab]?.description }}</p>
            </div>
            <div class="process">
              <h5>Code</h5>
              <div class="highlight">
                <pre class="chroma">
                  <code class="language-javascript" data-lang="javascript">
{{usercases[tab]?.code}}
                  </code>
                </pre>
              </div>
              <h5>Process ProcessGraph</h5>
              <div class="highlight">
                <pre class="chroma">
{{usercases[tab]?.json}}
                </pre>
              </div>
              <div>

              </div>
            </div>
            </tab-panel>
          </tab-panels>
        </div>
      </div>
      <div class="col-6">
        <div class="title-head"></div>
        <tabs
            v-model="selectedTabRight"
          >
            <tab
              class="tab"
              v-for="(tab, i) in tabsRight"
              :key="`t${i}`"
              :val="tab"
              :label="tab"
              :indicator="true"
            />
          </tabs>
          <tab-panels
            v-model="selectedTabRight"
            :animate="true"
          >
            <tab-panel
              v-for="(tab, i) in tabsRight"
              :key="`tp${i}`"
              :val="tab"
            >
            <div v-if="tab=='Graph'">
              <h5>Time</h5>
              <line-chart
              key="1"
              />
              <h5>Space</h5>
              <line-chart
              key="2"
              />
            </div>
            <MapView v-if="tab=='Map'"></MapView>
            </tab-panel>
          </tab-panels>
      </div>
    </div>
  </div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MapView from '@/components/MapView.vue';
import LineChart from '@/components/LineChart.vue'
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';
import { defineComponent, reactive, toRefs } from 'vue';

const tabs = ['User Case 1', 'User Case 2', 'User Case 3', 'User Case 4'];
const tabsRight = ['Graph', 'Map'];

export default {
  components: {
    NavBar,
    MapView,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    LineChart
  },
  setup() {
    const state = reactive({
      selectedTab: tabs[0]
    });
    const stateRight = reactive({
      selectedTabRight: tabsRight[0]
    });
    return {
      tabs,
      ...toRefs(state),
      tabsRight,
      ...toRefs(stateRight),
      usercases:{
        "User Case 1":{
          id: 'uc1',
          title: 'Loading an Image',
          description: 'This user case take an image in geotiff or Optimize Geotiff and creates an OERastercube.',
          code: "const OEProcessGraph = require('../src/processgraph/processgraph');\n const OEProcessRegistry = require('../src/processgraph/registry');\n /** Using ProcessGraph */\n const jsonProcess = require('../assets/userCases/UserCase1.json');\n const Utils = require('../src/processgraph/utils');\n const processGraph = JSON.parse(JSON.stringify(jsonProcess));\n const registry = Utils.getRegistry('./src/processes');\n const pg = new OEProcessGraph(processGraph, registry);\n exc(pg);\n async function exc(pg) {\n const exce = await pg.execute();\n console.log(exce.computedResult);\n }",
          json:'{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}'
        },
        "User Case 2":{
          id: 'uc2',
          title: 'Calculating an NDVI',
          description: 'This user case take an image in geotiff or Optimize Geotiff and creates an OERastercube, based on the bands given, the code computes an NDVI',
          code: "const OEProcessGraph = require('../src/processgraph/processgraph');\n const OEProcessRegistry = require('../src/processgraph/registry');\n /** Using ProcessGraph */\n const jsonProcess = require('../assets/userCases/UserCase1.json');\n const Utils = require('../src/processgraph/utils');\n const processGraph = JSON.parse(JSON.stringify(jsonProcess));\n const registry = Utils.getRegistry('./src/processes');\n const pg = new OEProcessGraph(processGraph, registry);\n exc(pg);\n async function exc(pg) {\n const exce = await pg.execute();\n console.log(exce.computedResult);\n }",
          json:'{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}'
        },
        "User Case 3":{
          id: 'uc3',
          title: 'Processing a Reducer + simple Apply',
          description: 'This user case take an image in geotiff or Optimize Geotiff and creates an OERastercube, then the raster cube is reduced temporarily and then applying a simple function trought the resulted raster cube (absolute function)',
          code: "const OEProcessGraph = require('../src/processgraph/processgraph');\n const OEProcessRegistry = require('../src/processgraph/registry');\n /** Using ProcessGraph */\n const jsonProcess = require('../assets/userCases/UserCase1.json');\n const Utils = require('../src/processgraph/utils');\n const processGraph = JSON.parse(JSON.stringify(jsonProcess));\n const registry = Utils.getRegistry('./src/processes');\n const pg = new OEProcessGraph(processGraph, registry);\n exc(pg);\n async function exc(pg) {\n const exce = await pg.execute();\n console.log(exce.computedResult);\n }",
          json:'{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}'
        },
        "User Case 4":{
          id: 'uc4',
          title: 'Complex Apply function',
          description: 'In this case the user adds an Image and then we apply a linear scale algoritm to the raster cube. This scaling process implies finding max and min the each band before create the calculations We expect that the computational power and requirement to be higher than the previous user cases.',
          code: "const OEProcessGraph = require('../src/processgraph/processgraph');\n const OEProcessRegistry = require('../src/processgraph/registry');\n /** Using ProcessGraph */\n const jsonProcess = require('../assets/userCases/UserCase1.json');\n const Utils = require('../src/processgraph/utils');\n const processGraph = JSON.parse(JSON.stringify(jsonProcess));\n const registry = Utils.getRegistry('./src/processes');\n const pg = new OEProcessGraph(processGraph, registry);\n exc(pg);\n async function exc(pg) {\n const exce = await pg.execute();\n console.log(exce.computedResult);\n }",
          json:'{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}'
        }
      }
    };
  },
  data() {
    return {
    }
  },
  computed: {
    pretty(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  },
  methods:{
    runUserCase(ucId){
      alert(ucId)
    }
  }
}
</script>

<style>
.main{
  margin:0px !important;
  width: 100vw;
}

.userCase{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex-wrap: nowrap;
}

.row{
  --bs-gutter-x: 2rem !important;
}
.tab {
  padding: 5px 10px !important;
}

.title{
  display: flex;
  padding: 10px;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
}

.title-head{
  padding: 10px;
  margin: 10px;
}

.description {
  text-align: justify !important;
  padding: 0px 20px;
}
.process {
  text-align: justify !important;
  padding: 0px 20px;
}

.highlight{
  background-color: black;
  text-indent: -1em;
}

.chroma {
    color: #f8f8f2;
    background-color: #282c34;
}
pre code {
    display: block;
    overflow: auto;
    padding: 1.25rem 1.5rem;
}
</style>
