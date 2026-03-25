<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import store from "@/store";
import { Message } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";

const form = reactive({
  userAccount: "",
  userPassword: "",
}) as UserLoginRequest;

const router = useRouter();
const route = useRoute();

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0 && res.data.id) {
    await store.dispatch("user/getLoginUser", res.data);
    Message.success("登录成功");
    const goPath = route.fullPath.split("redirect=");
    await router.push({
      path: goPath[1] ?? "/",
      replace: true,
    });
  } else {
    Message.error("登录失败, " + res.message);
  }
};
</script>

<template>
  <div id="userLoginView">
    <h1 style="margin-bottom: 40px">用户登录</h1>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入用户名"
          autocomplete="username"
        />
      </a-form-item>

      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
          autocomplete="current-password"
        />
      </a-form-item>

      <a-form-item>
        <a-button html-type="submit" style="width: 100%" type="primary"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
