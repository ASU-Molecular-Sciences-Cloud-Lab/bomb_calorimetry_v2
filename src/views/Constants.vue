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

    Benzoic Acid: 26,425 J/g <br />
    Iron Wire: 5,858 J/g <br />
    R: 8.314 J/mole-K
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
