<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  JudgeConfig,
  Page_Question_,
  Question,
  QuestionControllerService,
} from "../../../generated";
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
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "用户id",
    dataIndex: "suerId",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    slotName: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "编辑时间",
    dataIndex: "updateTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];
const data = ref<Page_Question_>();

const router = useRouter();

const totalNum = ref(0);

const pageParms = ref({
  current: 1,
  pageSize: 10,
});

const getPage = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    pageParms.value
  );
  if (res.code === 0) {
    data.value = res.data.records;
    totalNum.value = res.data.total;
  } else {
    Message.error("题目数据获取失败" + res.message);
  }
};

const doDelete = async (id: number) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: id,
  });
  if (res.code === 0) {
    await getPage();
    // pageParms.value = { ...pageParms.value, current: 1 };
    Message.success("删除成功");
  } else {
    Message.error("删除失败" + res.message);
  }
};

const doUpdate = (question: Question) => {
  router.push({
    path: "/admin/update/question",
    query: {
      id: question.id,
    },
  });
};

const onPageChange = (page: number) => {
  pageParms.value.current = page;
  getPage();
};

onMounted(() => {
  getPage();
});
</script>

<template>
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
    <template #tags="{ record }">
      <a-space>
        <a-tag
          v-for="tag in JSON.parse(record?.tags || []) as JudgeConfig"
          :key="tag"
          color="green"
          >{{ tag }}</a-tag
        >
      </a-space>
    </template>

    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" @click="doUpdate(record)">编辑</a-button
        ><a-button status="danger" @click="doDelete(record.id)">删除</a-button>
      </a-space>
    </template>
  </a-table>
</template>

<style scoped></style>
