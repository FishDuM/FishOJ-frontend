<script setup lang="ts">
import { reactive, defineEmits } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../generated";
import { Message } from "@arco-design/web-vue";

const form = reactive({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
}) as UserRegisterRequest;

const emit = defineEmits(["emitFlag"]);

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    Message.success("注册成功");
    form.checkPassword = "";
    form.userAccount = "";
    form.userPassword = "";
    emit("emitFlag", false);
  } else {
    Message.error("注册失败, " + res.message);
  }
};
</script>

<template>
  <div class="RegisterComponent">
    <h1 style="text-align: center; margin-bottom: 30px; margin-top: -10px">
      用户注册
    </h1>
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

      <a-form-item field="checkPassword" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
          autocomplete="current-password"
        />
      </a-form-item>

      <a-button
        type="primary"
        shape="round"
        size="large"
        style="width: 100%; margin: 25px auto"
        html-type="submit"
        >注册</a-button
      >
    </a-form>
  </div>
</template>

<style scoped></style>
