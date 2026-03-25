<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { UserControllerService } from "../generated";

const store = useStore();
const router = useRouter();

router.beforeEach((to, from, next) => {
  if (
    to.meta?.success === "admin" &&
    store.state.user.loginUser.userRole !== "admin"
  ) {
    next("/404");
    return;
  }
  next();
});

// const doInit = async () => {};

onMounted(() => {
  // doInit();
});
</script>
<template>
  <BasicLayout />
</template>

<style></style>
