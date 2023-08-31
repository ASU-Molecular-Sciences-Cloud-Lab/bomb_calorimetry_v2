<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
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
        :disabled="!(selected.length > 0)"
        to="/calorimetry"
        @click="setSample(samples.indexOf(selected[0]))"
        >Take it to the scale</v-btn
      >
    </v-responsive>
  </v-container>
</template>

<script lang="js">
import { Samples } from "@/ts/samples"

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
    }
  },
  methods: {
    setSample(sample) {
      this.$store.commit('setSample', sample)
    }
  },
};
</script>
