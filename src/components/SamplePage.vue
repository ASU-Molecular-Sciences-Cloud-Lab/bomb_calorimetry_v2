<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
      <h2>Calorimeter</h2>
      <p>
        Each 4-digit code is a serial number that corresponds to a unique Parr
        Oxygen Bomb Combustion Calorimeter's calorimeter constant. <br />Across
        different experiments, you should use the same code to keep it constant
      </p>

      <!-- Make fixed width container -->
      <v-container class="d-flex justify-center" style="width: 400px">
        <v-col>
          <v-text-field
            v-model="calorimeterCode"
            label="Calorimeter Code"
            type="number"
            outlined
            dense
            clearable
            :rules="rules.calorimeterCode"
          ></v-text-field>
        </v-col>
      </v-container>

      <h2>Sample</h2>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        v-model="selected"
        :headers="headers"
        :items="samples"
        selectable-key="Sample Name"
        item-value="sName"
        class="elevation-1"
        select-strategy="single"
        show-select
        return-object
      ></v-data-table>
      <v-btn
        color="green"
        :disabled="!(selected.length > 0) || calorimeterCode.length !== 4"
        to="/calorimetry"
        @click="setSample(samples.indexOf(selected[0]))"
        >Take it to the scale</v-btn
      >
    </v-responsive>
  </v-container>
</template>

<script lang="js">
import { Samples } from "@/ts/samples"
import { md5 } from "@/ts/md5.js"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sfc32(a, b, c, d) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

export default {
  data() {
    return {
      itemsPerPage: 25,
      headers: [
        {
          title: 'Sample Name',
          align: 'center',
          key: 'sName',
        },
        { title: 'Formula', align: 'end', sortable: false, key: 'sFormula' },
        { title: 'Mol. Wgt.', align: 'end', key: 'sM' }
      ],
      samples: Samples,
      selected: [],
      calorimeterCode: this.$store.getters.getCalorimeterCode === '' ? getRandomInt(1000, 9999).toString() : this.$store.getters.getCalorimeterCode,
      rules: {
        calorimeterCode: [
          (v) => !!v || 'Calorimeter Code is required',
          (v) => (v && v.length === 4) || 'Calorimeter Code must be 4 digits'
        ]
      },
      dialog: false,
      instructorPassword: ''
    }
  },
  methods: {
    setSample(sample) {
      this.$store.commit('setSample', sample)
      this.$store.commit('setCalorimeterCode', this.calorimeterCode)
    },
    showInstructorDecode() {
      let seed_a = parseInt(this.calorimeterCode[0]);
      let seed_b = parseInt(this.calorimeterCode[1]);
      let seed_c = parseInt(this.calorimeterCode[2]);
      let seed_d = parseInt(this.calorimeterCode[3]);
      let rand = sfc32(seed_a, seed_b, seed_c, seed_d);

      for (let i = 0; i < 100; i++) {
        rand();
      }

      let cBomb = 1182 + 600 * rand();
      let cContents = 50;
      let cParts = 150;
      let cWater = 8368 + 8 * rand();

      let cTotal = cBomb + cContents + cParts + cWater;

      alert('Calorimeter Constant: ' + cTotal.toFixed(2) + ' J/K');
    },
    checkPass(pass) {
      return md5(pass) !== '2b268ff28f38deb26abf16dfe4c76d9a';
    }
  },
};
</script>
