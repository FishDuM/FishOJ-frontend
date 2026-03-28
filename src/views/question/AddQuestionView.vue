<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { reactive } from "vue";

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

const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<template>
  <div id="addQuestionView">
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor />
      </a-form-item>

      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="tags"
          :style="{ width: '320px' }"
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
            field="judgeConfig.timeLimit"
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
            field="judgeConfig.memoryLimit"
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
            field="judgeConfig.stackLimit"
            label="堆栈限制"
            style="min-width: 480px"
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
        >
          <a-space direction="vertical" style="min-width: 480px">
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
              :style="{ marginLeft: '10px' }"
              >删除</a-button
            >
          </a-space>
        </a-form-item>

        <div>
          <a-button @click="handleAdd">添加样例</a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
