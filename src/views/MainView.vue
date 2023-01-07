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
                <br>
                <span style="color:#6aa0bd;">const</span><span> initialTime = performance.now()</span>
                <br>
                <span style="color:#6aa0bd;">const</span><span> processGraph = JSON.parse(JSON.stringify(jsonProcess))</span>
                <br>
                <span style="color:#6aa0bd;">const</span><span> registry = Utils.getRegistry()</span>
                <br>
                <span style="color:#6aa0bd;">const</span><span> pg = new OEProcessGraph(processGraph, registry)</span>
                <br>
                <span style="color:#6aa0bd;">const</span><span> exce = await pg.execute();</span>
                <br>
                <span style="color:#6aa0bd;">const</span><span> processResult = await exce.getResult();</span>
                <br>
                <span style="color:#6aa0bd;">const</span><span> executedTime = performance.now() - initialTime</span>
                <br>
                <span style="color:#bd6a6a;">return</span><span>{ 'resut':processResult, 'time': executedTime }</span>
                <br>
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
            <div v-if="tab=='Graph'" style="margin:20px 0px 20px 0px;">
              <h5>Time & Space</h5>
              <p>different areas</p>
              <line-chart
              id='chart1'
              :labels="labelsA"
              :data="dataA"
              :key="graphKey"
              />
            </div>
            <div v-if="tab=='Graph'">
              <h5>Time & Space</h5>
              <p>different resolutions</p>
              <line-chart
              id="chart2"
              :labels="labelsR"
              :data="dataR"
              :key="graphKey"
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
import executeUserCase from '@/components/scripts/userCarse'

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
          code: '',
          json:''
        },
        "User Case 2":{
          id: 'uc2',
          title: 'Calculating an NDVI',
          description: 'This user case take an image in geotiff or Optimize Geotiff and creates an OERastercube, based on the bands given, the code computes an NDVI',
          code: '',
          json:''
        },
        "User Case 3":{
          id: 'uc3',
          title: 'Processing a Reducer + simple Apply',
          description: 'This user case take an image in geotiff or Optimize Geotiff and creates an OERastercube, then the raster cube is reduced temporarily and then applying a simple function trought the resulted raster cube (absolute function)',
          code: "",
          json:''
        },
        "User Case 4":{
          id: 'uc4',
          title: 'Complex Apply function',
          description: 'In this case the user adds an Image and then we apply a linear scale algoritm to the raster cube. This scaling process implies finding max and min the each band before create the calculations We expect that the computational power and requirement to be higher than the previous user cases.',
          code: "",
          json:''
        }
      }
    };
  },
  data() {
    return {
      labelsA:['Whole Picture', 'Muenster outskirts', 'Muenster city', 'Muenster City Hall'],
      dataA:[],
      labelsR:['10', '30', '50', '100'],
      dataR:[],
      graphKey:0
    }
  },
  computed: {
    pretty(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  },
  methods:{
    async runUserCase(ucId){
      let images = ["sentinel_muenster.tif","sentinel_muenster_bg1.tif","sentinel_muenster_bg2.tif","sentinel_muenster_center.tif"];
      let imagesR = ["sentinel_muenster.tif","sentinel_muenster_30.tif","sentinel_muenster_50.tif","sentinel_muenster_100.tif"];
      let arr = [];
      switch(ucId){
        case 'uc1':
          arr = [];
          this.usercases['User Case 1'].json = {
              "process_graph": {
                "load_collection": {
                  "process_id": "load_collection",
                  "arguments": {
                    "source": []
                  },
                  "description": "Loading the data; The order of the specified bands is important for the following reduce operation.",
                  "result": true
                }
              }
          }
          var json = this.usercases['User Case 1'].json
          for (let img of images){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataA = arr;
          arr = [];
          for (let img of imagesR){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataR = arr;
          this.graphKey += 1;
          break
        case 'uc2':
          arr = [];
          this.usercases['User Case 2'].json = {
            "process_graph": {
              "load_collection": {
                "process_id": "load_collection",
                "arguments": {
                  "source": []
                },
                "description": "Loading the data; The order of the specified bands is important for the following reduce operation."
              },
              "ndvi": {
                "process_id": "ndvi",
                "arguments": {
                  "rastercube": {
                    "from_node": "load_collection"
                  },
                  "red": 0,
                  "nir": 3
                },
                "result": true
              }
            }
          }
          var json = this.usercases['User Case 2'].json
          for (let img of images){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataA = arr;
          arr = [];
          for (let img of imagesR){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataR = arr;
          this.graphKey += 1;
          break
        case 'uc3':
        arr = [];
          this.usercases['User Case 3'].json = {
            "process_graph": {
              "load_collection": {
                "process_id": "load_collection",
                "arguments": {
                  "source": []
                },
                "description": "Loading the data; The order of the specified bands is important for the following reduce operation."
              },
              "reduce_bands": {
                "process_id": "reduce_dimension",
                "arguments": {
                  "data": {
                    "from_node": "load_collection"
                  },
                  "reducer": {
                    "process_graph": {
                      "median": {
                        "process_id": "median",
                        "arguments": {
                          "data": {
                            "from_parameter": "data"
                          }
                        },
                        "result": true
                      }
                    }
                  },
                  "dimension": "temporal"
                },
                "description": "reducer median"
              },
              "apply":{
                "process_id":"apply",
                "arguments": {
                  "data": {
                    "from_node": "load_collection"
                  },
                  "process": {
                    "process_graph":{
                      "linear_scale_range":{
                        "process_id": "linear_scale_range",
                        "arguments": {
                          "x": {
                            "from_parameter": "x"
                          },
                          "inputMin": 0,
                          "inputMax": 1
                        },
                        "result": true
                      }
                    }
                  }
                },
                "description": "normalizing bands",
                "result": true
              }
            }
          }
          var json = this.usercases['User Case 3'].json
          for (let img of images){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataA = arr;
          arr = [];
          for (let img of imagesR){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataR = arr;
          this.graphKey += 1;
          break
        case 'uc4':
          arr = [];
          this.usercases['User Case 4'].json = {
            "process_graph": {
              "load_collection": {
                "process_id": "load_collection",
                "arguments": {
                  "source": [
                    "/Users/Jorge/Documents/tmp/EOlibrary/assets/sample_data/sentinel_muenster.tif"
                  ]
                },
                "description": "Loading the data; The order of the specified bands is important for the following reduce operation."
              },
              "apply":{
                "process_id":"apply",
                "arguments": {
                  "data": {
                    "from_node": "load_collection"
                  },
                  "process": {
                    "process_graph":{
                      "absolute":{
                        "process_id": "absolute",
                        "arguments": {
                          "x": {
                            "from_parameter": "x"
                          }
                        },
                        "result": true
                      }
                    }
                  }
                },
                "description": "abs on bands",
                "result": true
              }
            }
          }
          var json = this.usercases['User Case 4'].json
          for (let img of images){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataA = arr;
          arr = [];
          for (let img of imagesR){
            json['process_graph']['load_collection']['arguments']['source'] = [`https://localhost:3000/src/assets/sample_data/${img}`]
            const result = await executeUserCase(this.usercases['User Case 1'].json)
            arr.push(result.time);
          }
          this.dataR = arr;
          this.graphKey += 1;
          break
      }
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
  color:#f8f8f2;
  font-size: 0.8rem;
  background-color: black;
  text-indent: -1em;
  padding: 20px;
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
