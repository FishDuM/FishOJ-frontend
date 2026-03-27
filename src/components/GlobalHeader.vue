<script setup lang="ts">
import { routes } from "@/router/routes";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import PopComponent from "@/components/PopComponent.vue";

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

const store = useStore();

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "fish",
//     userRole: accessEnum.ADMIN,
//   });
// }, 3000);

const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    } else if (
      !checkAccess(store.state.user?.loginUser?.userRole, item.meta?.success)
    ) {
      return false;
    }
    return true;
  });
});
</script>

<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
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
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="store.state.user?.loginUser?.id">
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
      <div v-else><PopComponent /></div>
    </a-col>
  </a-row>
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
