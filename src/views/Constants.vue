<template>
  <div
    style="
      font-family: Minion Pro, Baskerville, Garamond, EB Garamond, Georgia,
        serif;
      font-size: 18px;
      line-height: 1.5;
      max-width: 40em;
      margin: auto;
    "
  >
    <div class="maketitle">
      <h2 class="titleHead">Constants</h2>
      <div class="author"></div>
      <br />
      <div class="date"></div>
    </div>
    <h3>Heat of Combustion</h3>
    <v-row>
      <v-col cols="12" md="6">
        <a href="https://en.wikipedia.org/wiki/Benzoic_acid">Benzoic Acid</a>
      </v-col>
      <v-col cols="12" md="6"> 26,425 J/g </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <a href="https://www.americanelements.com/iron-wire-7439-89-6"
          >Iron Wire</a
        >
      </v-col>
      <v-col cols="12" md="6"> 5,858 J/g </v-col>
    </v-row>
    <br />
    <v-divider></v-divider>
    <br />
    <h3>
      <a href="https://en.wikipedia.org/wiki/Gas_constant">Gas Constant</a>
    </h3>

    <v-row>
      <v-col cols="12" md="6">
        <a href="https://en.wikipedia.org/wiki/Gas_constant">R</a>
      </v-col>
      <v-col cols="12" md="6"> 8.314 J/mole-K </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
//
</script>

<style>
div.maketitle {
  text-align: center;
}
h2.titleHead {
  text-align: center;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
div.maketitle {
  margin-bottom: 2em;
}
div.author,
div.date {
  text-align: center;
}
div.thanks {
  text-align: left;
  margin-left: 10%;
  font-size: 85%;
  font-style: italic;
}
div.author {
  white-space: nowrap;
}
div.abstract p {
  margin-left: 5%;
  margin-right: 5%;
}
div.abstract {
  width: 100%;
}
.abstracttitle {
  text-align: center;
  margin-bottom: 1em;
}
.titleHead,
.sectionHead,
.subsectionHead,
.textsf {
  font-family: Myriad Pro, Helvetica, Arial, sans-serif;
}
.titleHead,
.sectionHead,
.subsectionHead {
  color: FireBrick;
}
.texttt,
.verb,
.pre {
  font-family: Inconsolata, Consolas, Courier, monospace;
}
.titleHead {
  font-size: 32px;
}
</style>
