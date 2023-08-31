<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
      <h2>Run the simulation</h2>
      <h3 id="sample_name"></h3>

      <v-row align="center" justify="center" style="margin-top: 20px">
        <div id="graph" style="width: 600px; height: 300px"></div>
        <v-table>
          <tbody>
            <tr v-for="item in tableData" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-row>
      <v-row align="center" justify="center">
        <v-spacer />
        <v-btn
          color="red"
          @click="experiment"
          :disabled="ran != 0 || $store.getters.getSample < 0"
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
              :disabled="ran != 2 || $store.getters.getSample < 0"
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
      { margin: { t: 0 } }
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
            mode: 'lines',
          }],
          { margin: { t: 0 } }
        );

        this.tableData[4].value = Math.round(this.exp.wireAfter*1000) / 1000;
        this.ran = 1;
      }
    },
    extrapolate() {
      let l1_x = [];
      let l1_y = [];
      let l2_x = [];
      let l2_y = [];

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

      Plotly.react(
        GRAPH,
        [
          {
            x: this.exp.g_X,
            y: this.exp.g_Y,
            name: 'Data',
            mode: 'lines',
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
        ],
        { margin: { t: 0 }, hovermode: 'x' }
      );

      this.ran = 2;
    }
  },
};
</script>
