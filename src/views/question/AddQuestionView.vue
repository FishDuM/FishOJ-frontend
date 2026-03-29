<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { onMounted, reactive } from "vue";
import { QuestionControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";

const form = reactive({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});

const route = useRoute();

const updatePage = route.path.includes("update");

// 根据id请求老数据

const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    Object.assign(form, res.data);
    form.judgeConfig.timeLimit = Number(res?.data?.judgeConfig?.timeLimit) || 0;
    form.judgeConfig.memoryLimit =
      Number(res?.data?.judgeConfig?.memoryLimit) || 0;
    form.judgeConfig.stackLimit =
      Number(res?.data?.judgeConfig?.stackLimit) || 0;
  } else {
    Message.error("加载失败" + res.message);
  }
};

const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};

const contentChange = (v: string) => {
  form.content = v;
};

const answerChange = (v: string) => {
  form.answer = v;
};

const changeSubmit = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.editQuestionUsingPost(form);
    if (res.code === 0) {
      Message.success("修改题目成功");
    } else {
      Message.error("修改题目失败" + res.message);
    }
    return;
  }

  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code === 0) {
    Message.success("创建题目成功");
  } else {
    Message.error("创建题目失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div id="addQuestionView">
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="form.title"
          placeholder="请输入标题"
          style="max-width: 640px"
        />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor :value="form.content" :handle-change="contentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="answerChange" />
      </a-form-item>

      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          :style="{ width: '640px' }"
          placeholder="请选择标签"
          allow-clear
        />
      </a-form-item>

      <a-form-item
        label="题目规则限制"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical">
          <a-form-item
            field="form.judgeConfig.timeLimit"
            label="时间限制"
            style="min-width: 480px"
          >
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              :min="0"
              :max="10000"
              mode="button"
            />
          </a-form-item>
          <a-form-item
            field="form.judgeConfig.memoryLimit"
            label="内存限制"
            style="min-width: 480px"
          >
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              :min="0"
              :max="10000"
              mode="button"
            />
          </a-form-item>
          <a-form-item
            field="form.judgeConfig.stackLimit"
            label="堆栈限制"
            style="min-width: 640px"
          >
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入内存堆栈限制"
              :min="0"
              :max="10000"
              mode="button"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item
        label="配置测试样例"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入样例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入输入样例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输出样例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入输出样例"
              />
            </a-form-item>

            <a-button
              @click="handleDelete(index)"
              status="danger"
              style="min-width: 640px"
              >删除样例</a-button
            >
          </a-space>
        </a-form-item>

        <div style="margin-top: 16px">
          <a-button @click="handleAdd" status="success" style="min-width: 640px"
            >添加样例</a-button
          >
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          style="min-width: 640px"
          html-type="submit"
          type="primary"
          @click="changeSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
