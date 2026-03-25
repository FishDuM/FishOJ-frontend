<script setup lang="ts"></script>

<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header"> 用户页面 </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
}

#userLayout .header {
  margin-bottom: 10px;
  box-shadow: #eee 1px 1px 5px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 16px;
  background: linear-gradient(to right, #bbb, #fff);
}

#userLayout .footer {
  position: sticky;
  padding: 16px;
  text-align: center;
  bottom: 0;
  right: 0;
  left: 0;
  background: #efefef;
}
</style>
