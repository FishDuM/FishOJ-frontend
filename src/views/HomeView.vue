<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    slotName: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
  },
  {
    title: "通过率",
    dataIndex: "acceptedRate",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
];
const data = ref();

const router = useRouter();

const totalNum = ref(0);

const pageParms = ref({
  id: undefined,
  title: "",
  current: 1,
  pageSize: 10,
});

const getPage = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    pageParms.value
  );
  if (res.code === 0) {
    data.value = res.data.records;
    totalNum.value = res.data.total;
  } else {
    Message.error("题目数据获取失败" + res.message);
  }
};

const onPageChange = (page: number) => {
  pageParms.value.current = page;
  getPage();
};

const doQuestion = (id: number) => {
  router.push({
    path: `/view/question/${id}`,
  });
};

const handleSubmit = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    pageParms.value
  );
  if (res.code === 0) {
    data.value = res.data.records;
    pageParms.value.current = 1;
    Message.success("搜索成功");
  } else {
    Message.error("搜索失败" + res.message);
  }
};

onMounted(() => {
  getPage();
});
</script>

<template>
  <div id="manageQuestionView">
    <a-form :model="pageParms" @submit="handleSubmit" layout="inline">
      <a-form-item field="id" label="ID">
        <a-input v-model="pageParms.id" placeholder="请输入要搜索的题目ID" />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input
          v-model="pageParms.title"
          placeholder="请输入要搜索的题目标题"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>

    <a-divider size="0" />

    <a-table
      :columns="columns"
      :data="data"
      :pagination="{
        total: +totalNum,
        current: pageParms.current,
        pageSize: pageParms.pageSize,
        showTotal: true,
      }"
      @page-change="onPageChange"
    >
      <template #title="{ record }">
        <a-link @click="doQuestion(record.id)">{{ record.title }}</a-link>
      </template>

      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="tag in record.tags" :key="tag" color="green">{{
            tag
          }}</a-tag>
        </a-space>
      </template>

      <template #acceptedRate="{ record }">
        <a-space>
          <a-tag color="blue">{{
            record.submitNum === 0
              ? 0 + "%"
              : Math.floor(record.acceptedNum / record.submitNum) + "%"
          }}</a-tag>
        </a-space>
      </template>

      <template #createTime="{ record }">
        <a-space>
          {{ record.createTime.split("T")[0] }}
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
#manageQuestionView {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
