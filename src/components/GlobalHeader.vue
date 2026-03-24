<script setup lang="ts">
import { routes } from "@/router/routes";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedKeys = ref(["/"]);

router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

function doMenuClick(key: string) {
  router.push({
    path: key,
  });
}
</script>

<template>
  <div id="globalHeader">
    <a-menu
      mode="horizontal"
      :selected-keys="selectedKeys"
      @menu-item-click="doMenuClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="logo" src="../assets/logo.svg" alt="logo" />
          <div class="title">Fish OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
