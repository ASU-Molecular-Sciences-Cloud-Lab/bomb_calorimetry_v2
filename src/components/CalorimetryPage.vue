<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
      <v-alert
        v-if="
          exp.sampleWgt < 0.2 ||
          exp.sampleWgt > 2 ||
          exp.itWater < 24 ||
          exp.itWater > 30
        "
        border="start"
        variant="tonal"
        color="red"
      >
        <div v-if="exp.sampleWgt < 0.2 || exp.sampleWgt > 2">
          <strong>Warning!</strong> Sample weight must be between 0.2 and 2
          grams.
        </div>
        <div v-if="exp.itWater < 24 || exp.itWater > 30">
          <strong>Warning!</strong> Water temperatuer be between 24 and 30 °C.
        </div>
      </v-alert>

      <h2>Run the simulation</h2>
      <h3 id="sample_name"></h3>

      <v-row align="center" justify="center" style="margin-top: 20px">
        <div id="graph" style="width: 550px; height: 300px"></div>
        <v-table>
          <tbody>
            <tr v-for="item in tableData" :key="item.name">
              <td>{{ item.name }}</td>
              <td style="width: 50%">
                <v-text-field
                  v-if="item.name === 'Sample Weight'"
                  v-model="exp.sampleWgt"
                  hide-details
                  single-line
                  type="number"
                  :disabled="ran != 0 || $store.getters.getSample < 0"
                >
                  <template v-slot:append>g</template>
                </v-text-field>
                <v-text-field
                  v-else-if="item.name === 'Water Temp'"
                  v-model="exp.itWater"
                  hide-details
                  single-line
                  type="number"
                  :disabled="ran != 0 || $store.getters.getSample < 0"
                >
                  <template v-slot:append>°C</template>
                </v-text-field>
                <span v-else>
                  {{
                    item.value +
                    (() => {
                      if (item.name.includes("Temp")) return " °C";
                      else return " g";
                    })()
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-row>
      <v-row align="center" justify="center">
        <v-spacer />
        <v-btn
          color="red"
          @click="experiment"
          :disabled="
            ran != 0 ||
            $store.getters.getSample < 0 ||
            exp.sampleWgt < 0.2 ||
            exp.sampleWgt > 2 ||
            exp.itWater < 24 ||
            exp.itWater > 30
          "
          >Ignite</v-btn
        >
        <v-spacer />
        <v-btn
          color="green"
          @click="extrapolate"
          :disabled="ran != 1 || $store.getters.getSample < 0"
          >Extrapolate</v-btn
        >
        <v-spacer />
        <v-dialog
          v-model="dialog"
          fullscreen
          :scrim="false"
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="blue"
              :disabled="ran < 1 || $store.getters.getSample < 0"
              >View Results</v-btn
            >
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Test Results</v-toolbar-title>
            </v-toolbar>

            <v-row style="margin: 10px 20%">
              <v-textarea v-model="data" auto-grow readonly> </v-textarea>
              <v-col fluid>
                <h2>{{ samples[$store.getters.getSample].sName }}</h2>
                <h3>{{ samples[$store.getters.getSample].sFormula }}</h3>
                <v-table>
                  <tbody>
                    <tr>
                      <td>Molecular Weight</td>
                      <td>
                        {{ samples[$store.getters.getSample].sM + " g/mol" }}
                      </td>
                    </tr>
                    <tr v-for="item in tableData" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>
                        {{
                          item.value +
                          (() => {
                            if (item.name.includes("Temp")) return " °C";
                            else return " g";
                          })()
                        }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <h4>T initial: {{ numberOrString(T.Ti) }}°C</h4>
                <h4>T final: {{ numberOrString(T.Tf) }}°C</h4>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-spacer />
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="js">
import { Samples } from "@/ts/samples"
import { Experiment } from "@/ts/experiment"
import Plotly from 'plotly.js-dist'

let GRAPH = null;

export default {
  data() {
    return {
      samples: Samples,
      output: {},
      exp: {},
      data: "",
      ran: 0,
      tableData: [],
      dialog: false,
      T: { Ti: "?", Tf: "?" }
    }
  },
  mounted() {
    // set sample name
    const sampleId = this.$store.getters.getSample;
    const sample_name = document.getElementById("sample_name");
    if (sampleId >= 0) {
      sample_name.textContent = Samples[sampleId].sName;
    } else {
      sample_name.textContent = "No Sample Selected";
    }

    this.exp = new Experiment(sampleId);
    this.tableData = [
      { name: 'Sample Weight', value: Math.round(this.exp.sampleWgt*1000) / 1000 },
      { name: 'Water Temp', value: Math.round(this.exp.tWater*1000) / 1000 },
      { name: 'Room Temp', value: Math.round(this.exp.tRoom*1000) / 1000 },
      { name: 'Wire Before', value: Math.round(this.exp.wireWgt*1000) / 1000 },
      { name: 'Wire After', value: '?'},
    ]

    // setup Plotly
    GRAPH = document.getElementById('graph');
    Plotly.newPlot(
      GRAPH,
      [{
        x: [],
        y: []
      }],
      {
        margin: { t: 0 },
        xaxis: {
          title: 'Time (min)'
        },
        yaxis: {
          title: 'Temperature (°C)'
        }
      }
    );

  },
  methods: {
    experiment() {
      const sampleId = this.$store.getters.getSample;
      if (sampleId >= 0) {
        let output = this.exp.experiment();

        this.data = this.exp.output;
        this.output = output;

        Plotly.react(
          GRAPH,
          [{
            x: this.exp.g_X,
            y: this.exp.g_Y,
            mode: 'markers',
          }],
          {
            margin: { t: 0 },
            xaxis: {
              title: 'Time (min)'
            },
            yaxis: {
              title: 'Temperature (°C)'
            }
          }
        );

        this.tableData[4].value = Math.round(this.exp.wireAfter*1000) / 1000;
        this.ran = 1;
      }

      // Finalize tableData
      this.tableData[0].value = Math.round(this.exp.sampleWgt*1000) / 1000;
      this.tableData[1].value = Math.round(this.exp.itWater*1000) / 1000;
    },
    extrapolate() {
      let l1_x = [];
      let l1_y = [];
      let l2_x = [];
      let l2_y = [];

      // Compute lines
      let aint = this.output.aint;
      let aslope = this.output.aslope;
      let bint = this.output.bint;
      let bslope = this.output.bslope;

      let tt = 0;
      let i = 1;
      for (i == 1; i < 20; i++) {
        tt = aint + aslope * (0.125 + i / 2);
        l1_x.push(0.5 * i);
        l1_y.push(tt);
      }

      i = 10;
      for (i == 10; i < 36; i++) {
        tt = bint + bslope * (0.125 + i / 2);
        l2_x.push(0.5 * i);
        l2_y.push(tt);
      }

      // Compute initial Ti and Tf
      let x0 = 7;
      let y0 = aint + aslope * (0.125 + x0);
      let y1 = bint + bslope * (0.125 + x0);
      this.T.Ti = y0;
      this.T.Tf = y1;

      // Setup vertical line between Ti and Tf
      let verticalLine = {
        type: 'line',
        x0: x0,
        y0: y0,
        x1: x0,
        y1: y1,
        line: {
          color: 'grey',
          width: 1.5,
          dash: 'dot'
        }
      };

      // Setup layout
      let layout = {
        margin: { t: 0 },
        hovermode: 'x',
        xaxis: {
          title: 'Time (min)',
          spikemode: 'across'
        },
        yaxis: {
          title: 'Temperature (°C)'
        },
        shapes: [verticalLine],
        annotations: [
          {
            x: x0,
            y: y0,
            xref: 'x',
            yref: 'y',
            text: 'T initial = ' + Math.round(y0*1000) / 1000,
            showarrow: true,
            arrowhead: 7,
            ax: 10,
            ay: 20
          },
          {
            x: x0,
            y: y1,
            xref: 'x',
            yref: 'y',
            text: 'T final = ' + Math.round(y1*1000) / 1000,
            showarrow: true,
            arrowhead: 7,
            ax: -10,
            ay: -20
          }
        ]
      };

      // Finalize data with extrapolated lines
      let data = [
        {
          x: this.exp.g_X,
          y: this.exp.g_Y,
          name: 'Data',
          mode: 'markers',
        },
        {
          x: l1_x,
          y: l1_y,
          name: '',
          mode: 'lines',
          line: {
            dash: 'dash'
          }
        },
        {
          x: l2_x,
          y: l2_y,
          name: '',
          mode: 'lines',
          line: {
            dash: 'dash'
          }
        }
      ];

      // Update Plotly
      Plotly.react(GRAPH, data, layout);

      // Necessary beceause the Plotly click event captures a different `this` context
      // eslint-disable-next-line
      const obj = this;

      // Graph click events
      GRAPH.on('plotly_click', function(data){
        const x = data.points[0].x;
        const y1 = aint + aslope * (0.125 + x);
        const y2 = bint + bslope * (0.125 + x);

        verticalLine.x0 = x;
        verticalLine.x1 = x;
        verticalLine.y0 = y1;
        verticalLine.y1 = y2;
        obj.T.Ti = y1;
        obj.T.Tf = y2;

        layout.shapes = [verticalLine];
        layout.annotations = [
          {
            x: x,
            y: y1,
            xref: 'x',
            yref: 'y',
            text: 'T initial = ' + Math.round(y1*1000) / 1000,
            showarrow: true,
            arrowhead: 7,
            ax: 10,
            ay: 20
          },
          {
            x: x,
            y: y2,
            xref: 'x',
            yref: 'y',
            text: 'T final = ' + Math.round(y2*1000) / 1000,
            showarrow: true,
            arrowhead: 7,
            ax: -10,
            ay: -20
          }
        ]

        Plotly.relayout(GRAPH, layout);
      });

      this.ran = 2;
    },
    numberOrString(x) {
      if (typeof x === 'string' || x instanceof String) {
        return x;
      } else {
        return Math.round(x*1000) / 1000;
      }
    }
  },
};
</script>
