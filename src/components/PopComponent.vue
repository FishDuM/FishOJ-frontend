<script setup lang="ts">
import { ref } from "vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

const visible = ref(false);

const handleClose = (visibleFlag: boolean) => {
  visible.value = visibleFlag;
};

const handleClick = () => {
  visible.value = true;
};
</script>

<template>
  <div id="PopComponent">
    <a-button type="primary" @click="handleClick">登录</a-button>
    <a-modal
      v-model:visible="visible"
      unmountOnClose
      :closable="false"
      :hide-cancel="true"
      :hide-title="true"
      :footer="false"
    >
      <a-tabs>
        <a-tab-pane key="1">
          <template #title> <icon-calendar /> 登录 </template>
          <div class="login">
            <LoginComponent />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #title> <icon-clock-circle /> 注册 </template>
          <div class="register">
            <RegisterComponent @emitFlag="handleClose" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<style scoped></style>
