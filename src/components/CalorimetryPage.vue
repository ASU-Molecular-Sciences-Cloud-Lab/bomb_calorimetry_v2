<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
      <v-alert
        v-if="
          exp.sampleWgt < 0.2 ||
          exp.sampleWgt > 2 ||
          exp.itWater < 20 ||
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
        <div v-if="exp.itWater < 20 || exp.itWater > 30">
          <strong>Warning!</strong> Water temperature be between 20 and 30 °C.
        </div>
      </v-alert>

      <h2>Run the Simulation</h2>
      <h3 id="sample_name"></h3>

      <v-row align="center" justify="center" style="margin-top: 20px">
        <v-img
          v-if="!addedOxygen && !addedWater"
          height="300"
          src="@/assets/bombcal0.svg"
        />
        <v-img
          v-if="addedOxygen && !addedWater"
          height="300"
          src="@/assets/bombcal1.svg"
        />
        <v-img
          v-if="!addedOxygen && addedWater"
          height="300"
          src="@/assets/bombcal2.svg"
        />
        <v-img
          v-if="addedOxygen && addedWater"
          height="300"
          src="@/assets/bombcal3.svg"
        />

        <v-spacer />

        <div id="graph" style="width: 550px; height: 300px"></div>

        <v-spacer />

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
                      else if (item.name.includes("Volume")) return " L";
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
        <v-col>
          <v-btn
            style="width: 250px"
            @click="addOxygen"
            :disabled="
              addedOxygen ||
              ran != 0 ||
              $store.getters.getSample < 0 ||
              exp.sampleWgt < 0.2 ||
              exp.sampleWgt > 2 ||
              exp.itWater < 20 ||
              exp.itWater > 30
            "
          >
            Add 30 atm of Oxygen
          </v-btn>
          <v-btn
            style="width: 250px"
            @click="addWater"
            :disabled="
              addedWater ||
              ran != 0 ||
              $store.getters.getSample < 0 ||
              exp.sampleWgt < 0.2 ||
              exp.sampleWgt > 2 ||
              exp.itWater < 20 ||
              exp.itWater > 30
            "
          >
            Add 2.0 L of Water
          </v-btn>
        </v-col>
        <v-btn
          color="red"
          @click="experiment"
          :disabled="
            ran != 0 ||
            $store.getters.getSample < 0 ||
            exp.sampleWgt < 0.2 ||
            exp.sampleWgt > 2 ||
            exp.itWater < 20 ||
            exp.itWater > 30
          "
          >Ignite</v-btn
        >
        <v-spacer />
        <v-btn
          color="green"
          @click="download"
          :disabled="ran != 1 || $store.getters.getSample < 0"
        >
          Download Data
          <!-- <p v-if="ran == 1">Download Data</p> -->
          <!-- <v-progress-circular
            v-else
            color="purple"
            indeterminate
          ></v-progress-circular> -->
        </v-btn>

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
              >View Data</v-btn
            >
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title
                >Bomb Calorimetry Simulation Data</v-toolbar-title
              >
            </v-toolbar>

            <v-row style="margin: 10px 20%">
              <v-textarea
                v-model="res_data"
                auto-grow
                readonly
                style="font-family: monospace"
              >
              </v-textarea>
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
                            else if (item.name.includes("Volume")) return " L";
                            else return " g";
                          })()
                        }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <!-- <h4>T initial: {{ numberOrString(T.Ti) }}°C</h4> -->
                <!-- <h4>T final: {{ numberOrString(T.Tf) }}°C</h4> -->
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
      T: { Ti: "?", Tf: "?" },
      addedWater: false,
      addedOxygen: false,
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

    const calorimeter_code = this.$store.getters.getCalorimeterCode;
    const cc_a = Number(calorimeter_code[0]);
    const cc_b = Number(calorimeter_code[1]);
    const cc_c = Number(calorimeter_code[2]);
    const cc_d = Number(calorimeter_code[3]);
    this.exp = new Experiment(sampleId, cc_a, cc_b, cc_c, cc_d);
    this.tableData = [
      { name: 'Sample Weight', value: this.exp.sampleWgt.toFixed(4) },
      { name: 'Water Temp', value: this.exp.tWater.toFixed(2) },
      { name: 'Room Temp', value: this.exp.tRoom.toFixed(2) },
      // { name: 'Water Volume', value: "2.0" },
      { name: 'Wire Before', value: this.exp.wireWgt.toFixed(3) },
      { name: 'Wire After', value: '?'},
    ]

    // setup Plotly
    GRAPH = document.getElementById('graph');
    Plotly.newPlot(
      GRAPH,
      [{
        x: [],
        y: [],
        mode: 'markers',
      }],
      {
        width: 550,
        height: 300,
        margin: { t: 0, l: 0, r: 0, b: 0 },
        xaxis: {
          range: [0, 17],
          title: 'Time (min)'
        },
        yaxis: {
          title: 'Temperature (°C)'
        }
      }
    );

  },
  methods: {
    addWater() {
      this.addedWater = true;
    },
    addOxygen() {
      this.addedOxygen = true;
    },
    experiment() {
      const sampleId = this.$store.getters.getSample;
      if (sampleId >= 0) {
        this.ran = -1;
        let output = this.exp.experiment(this.addedOxygen, this.addedWater);

        this.csv_data = this.exp.csv_output;
        this.res_data = this.exp.res_output;
        this.output = output;

        // Animate scatter plot
        let f_dist = 75;

        for (let i = 0; i < this.exp.g_X.length; i++) {
        // for (let i = 0; i < 10; i++) {
          let delay = i * f_dist;

          setTimeout(() => {
            GRAPH = document.getElementById('graph');
            GRAPH.innerHTML = '';
            GRAPH.classList.remove('js-plotly-plot');
            GRAPH.style = '';

            Plotly.newPlot(
              GRAPH,
              {data: [{
                x: this.exp.g_X.slice(0, i+1),
                y: this.exp.g_Y.slice(0, i+1),
                mode: 'markers',
              }]},
              {
                width: 550,
                height: 300,
                margin: { t: 0, l: 0, r: 0, b: 0 }
              }
            );
            Plotly.relayout(GRAPH, {
              'xaxis.range': [0, 17],
              'xaxis.title': 'Time (min)',
              'yaxis.title': 'Temperature (°C)'
            })

            if (i == this.exp.g_X.length - 1) {
              this.ran = 1;
              this.tableData[4].value = this.exp.wireAfter.toFixed(3);
            }
          }, delay);
        }
      }

      // Finalize tableData
      this.tableData[0].value = parseFloat(this.exp.sampleWgt).toFixed(4);
      this.tableData[1].value = parseFloat(this.exp.itWater).toFixed(2);
    },
    numberOrString(x) {
      if (typeof x === 'string' || x instanceof String) {
        return x;
      } else {
        return Math.round(x*1000) / 1000;
      }
    },
    download() {
      const element = document.createElement('a');

      // Add header information
      let dat = "";
      dat += "Website,https://asu-molecular-sciences-cloud-lab.github.io/bomb_calorimetry_v2/ \n";
      dat += "Simulated Calorimeter,Parr #" + this.$store.getters.getCalorimeterCode + "\n";
      dat += "Sample Name," + Samples[this.$store.getters.getSample].sName + "\n";
      dat += "Formula," + Samples[this.$store.getters.getSample].sFormula + "\n";
      dat += "Molecular Weight (g/mol)," + parseFloat(this.samples[this.$store.getters.getSample].sM).toFixed(3) + "\n";
      dat += "Sample Weight (g)," + parseFloat(this.exp.sampleWgt).toFixed(4) + "\n";
      dat += "Water Temp (deg C)," + parseFloat(this.exp.itWater).toFixed(2) + "\n";
      dat += "Room Temp (deg C)," + parseFloat(this.exp.tRoom).toFixed(2) + "\n";
      dat += "Water Volume (L)," + "2.0" + "\n";
      dat += "Wire Before (g)," + parseFloat(this.exp.wireWgt).toFixed(3) + "\n";
      dat += "Wire After (g)," + parseFloat(this.exp.wireAfter).toFixed(3) + "\n";

      dat += this.csv_data;

      const file = new Blob([dat], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);

      const sampleId = this.$store.getters.getSample;
      let name = Samples[sampleId].sName;
      name = name.replace(/ /g, '_');
      name = name.toLowerCase();
      element.download = 'data_' + name + '_cc' + this.$store.getters.getCalorimeterCode + '.csv';
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  },
};
</script>
