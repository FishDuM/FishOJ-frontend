<script setup lang="ts"></script>

<template>
  <div id="userLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/logo.svg" alt="logo" />
          <div class="title">Fish OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .header {
  margin: 10px auto;
  //box-shadow: #eee 1px 1px 5px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 16px;
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
  font-size: 24px;
  font-weight: 700;
}
</style>
