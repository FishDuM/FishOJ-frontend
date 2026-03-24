<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

router.beforeEach((to, from, next) => {
  if (
    to.meta?.success === "admin" &&
    store.state.user.loginUser.role !== "admin"
  ) {
    next("/404");
    return;
  }
  next();
});
</script>
<template>
  <BasicLayout />
</template>

<style></style>
