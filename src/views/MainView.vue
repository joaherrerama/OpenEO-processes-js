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
              <div style="display:flex;" v-if="processing">
                <p style="font-size:0.7rem;font-weight:700;margin-right: 10px;color:orange">{{imageProcessing}}</p>
                <clip-loader color="orange" size="30px"></clip-loader>
              </div>
              <button v-if="!processing" class="btn btn-dark" type="button" :id="usercases[tab]?.id" @click="runUserCase(usercases[tab]?.id)">Run user case</button>
            </div>
            <div class="description">
              <p>{{ usercases[tab]?.description }}</p>
            </div>
            <div class="process">
              <h5>Performance</h5>
              <div class="highlight" :key="graphKey">
                <pre class="chroma">
                    {{usercases[tab]?.performance}}
                </pre>
              </div>
              <h5>Process ProcessGraph</h5>
              <div class="highlight" :key="graphKey">
                <pre class="chroma">
                    {{usercases[tab]?.json}}
                </pre>
              </div>
              <h5>Last result Result Arrays (All result in Console Dev)</h5>
              <div class="highlight" :key="graphKey">
                <pre class="chroma">
                    {{usercases[tab]?.array}}
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
              <div v-if="tab=='Graph'">
              <h5>Original 5 time Iterations</h5>
              <line-chart
              id="chart4"
              :labels="labelsII"
              :data="dataII"
              :dataM="dataIIM"
              :key="graphKey"
              />
            </div>
              <h5>Different Sizes</h5>
              <line-chart
              id='chart1'
              :labels="labelsA"
              :data="dataA"
              :dataM="dataAM"
              :key="graphKey"
              />
            </div>
            <div v-if="tab=='Graph'">
              <h5>Different Spatial Resolutions</h5>
              <line-chart
              id="chart2"
              :labels="labelsR"
              :data="dataR"
              :dataM="dataRM"
              :key="graphKey"
              />
            </div>
            <div v-if="tab=='Graph'">
              <h5>Different Radiometric Resolutions</h5>
              <line-chart
              id="chart3"
              :labels="labelsRR"
              :data="dataRR"
              :dataM="dataRRM"
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
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

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
    LineChart,
    ClipLoader
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
          title: 'Processing a simple Apply',
          description: 'This user case take an image in geotiff or Optimize Geotiff and creates an OERastercube, then applies a simple function trought the resulted raster cube (Linear scale range function)',
          code: "",
          json:''
        },
        "User Case 4":{
          id: 'uc4',
          title: 'Reducer + apply function',
          description: 'In this case the user adds an Image and then the raster cube is reduced temporarily, followed by the aplication of a absolute algoritm over the raster cube.',
          code: "",
          json:''
        }
      }
    };
  },
  data() {
    return {
      labelsA:['Primary Source (1.609.280 px)', 'Muenster outskirts (946.242 px)', 'Muenster city (568.890 px)', 'Muenster City Hall (96.945 px)'],
      dataA:[],
      dataAM:[],
      labelsR:['10', '30', '50', '100'],
      dataR:[],
      dataRM:[],
      labelsRR:['UInt16', 'I16', 'UInt32', 'Float64'],
      dataRR:[],
      dataRRM:[],
      labelsII:[1,2,3,4,5],
      dataII:[],
      dataIIM:[],
      graphKey:0,
      url:'https://joaherrerama.github.io/OpenEO-processes-js/assets/sample_data',
      processing: false,
      imageProcessing:null
    }
  },
  computed: {
    pretty(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  },
  methods:{
    async runUserCase(ucId){
      switch(ucId){
        case 'uc1':
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
          await this.run(json, 'User Case 1');
          break
        case 'uc2':
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
          await this.run(json, 'User Case 2')
          break
        case 'uc3':
          this.usercases['User Case 3'].json = {
            "process_graph": {
              "load_collection": {
                "process_id": "load_collection",
                "arguments": {
                  "source": []
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
                      "linear_scale_range":{
                        "process_id": "linear_scale_range",
                        "arguments": {
                          "x": {
                            "from_parameter": "x"
                          },
                          "inputMin": 0,
                          "inputMax": 65536,
                          "outputMin": -1,
                          "outputMax": 1
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
          await this.run(json, 'User Case 3')
          break
        case 'uc4':
          this.usercases['User Case 4'].json = {
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
                        "process_id": "mean",
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
                    "from_node": "reduce_bands"
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
          await this.run(json, 'User Case 4')
          break
      }
    },
    async run(json, useCase){
      this.processing = true;
      // Different Sizes
      let arr = [];
      let arrM = [];
      let performance = [];
      let resultF = null;
      let images = ["sentinel_muenster.tif","sentinel_muenster_bg2.tif","sentinel_muenster_bg1.tif", "sentinel_muenster_center.tif"];
      let imagesR = ["sentinel_muenster.tif","sentinel_muenster_30.tif","sentinel_muenster_50.tif","sentinel_muenster_100.tif"];
      let imagesRR = ["sentinel_muenster.tif","sentinel_muenster_I16.tif","sentinel_muenster_U32.tif","sentinel_muenster_F64.tif"];
      let imagesIter = ["sentinel_muenster.tif","sentinel_muenster.tif","sentinel_muenster.tif","sentinel_muenster.tif","sentinel_muenster.tif"]

      // Iteration
      for (let img of imagesIter){
        this.imageProcessing = img;
        json['process_graph']['load_collection']['arguments']['source'] = [`${this.url}/${img}`]
        const result = await executeUserCase(this.usercases[useCase].json)
        arr.push(result.time);
        arrM.push(result.memory);
        performance.push({'img': img, 'time': result.time, 'memory': result.memory})
      }
      this.dataII = arr;
      this.dataIIM = arrM;

      // Sizes
      arr = [];
      arrM = [];
      for (let img of images){
        this.imageProcessing = img;
        json['process_graph']['load_collection']['arguments']['source'] = [`${this.url}/${img}`]
        const result = await executeUserCase(this.usercases[useCase].json)
        arr.push(result.time);
        arrM.push(result.memory);
        performance.push({'img': img, 'time': result.time, 'memory': result.memory})
      }
      this.dataA = arr;
      this.dataAM = arrM;
      // Spatial Resolution
      arr = [];
      arrM = [];
      for (let img of imagesR){
        this.imageProcessing = img;
        json['process_graph']['load_collection']['arguments']['source'] = [`${this.url}/${img}`]
        const result = await executeUserCase(this.usercases[useCase].json)
        arr.push(result.time);
        arrM.push(result.memory);
        performance.push({'img': img, 'time': result.time, 'memory': result.memory})
        resultF = result['result'];
      }
      this.usercases[useCase].array = resultF;
      this.usercases[useCase].performance = performance;
      this.dataR = arr;
      this.dataRM = arrM;
      // Radiometric Resolution
      arr = [];
      arrM = [];
      for (let img of imagesRR){
        this.imageProcessing = img;
        json['process_graph']['load_collection']['arguments']['source'] = [`${this.url}/${img}`]
        const result = await executeUserCase(this.usercases[useCase].json)
        arr.push(result.time);
        arrM.push(result.memory);
        performance.push({'img': img, 'time': result.time, 'memory': result.memory})
      }
      this.dataRR = arr;
      this.dataRRM = arrM;

      this.graphKey += 1;
      this.processing = false;
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
