<template>
  <div id="home">
    <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor :value="value" :handle-change="onChange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const value = ref("");

const onChange = (v: string) => {
  value.value = v;
};
</script>
