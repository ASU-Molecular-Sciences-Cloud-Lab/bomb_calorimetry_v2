<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
      <h2>Set Calorimeter Code</h2>
      <p>
        Each 4-digit code corresponds to a unique calorimeter constant. Across
        different experiments, you should use the same code to keep it constant
      </p>

      <!-- Make fixed width container -->
      <v-container class="d-flex justify-center" style="width: 200px">
        <v-text-field
          v-model="calorimeterCode"
          label="Calorimeter Code"
          type="number"
          outlined
          dense
          clearable
          :rules="rules.calorimeterCode"
        ></v-text-field>
      </v-container>

      <h2>Select your sample</h2>
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
        to="/old/calorimetry"
        @click="setSample(samples.indexOf(selected[0]))"
        >Take it to the scale</v-btn
      >
    </v-responsive>
  </v-container>
</template>

<script lang="js">
import { Samples } from "@/ts/samples"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
      }
    }
  },
  methods: {
    setSample(sample) {
      this.$store.commit('setSample', sample)
      this.$store.commit('setCalorimeterCode', this.calorimeterCode)
    }
  },
};
</script>
