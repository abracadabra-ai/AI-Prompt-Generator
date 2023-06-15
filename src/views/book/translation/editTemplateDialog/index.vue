<!-- 分组弹框 -->
<template>
  <!-- 分组弹框 -->
  <el-dialog
    title="编辑模板"
    v-model="dialogVisible"
    width="600px"
    :before-close="handleClose"
  >
    <el-input class="input" v-model="formData.template_name" placeholder="输入模板名称" />

    <el-input class="textarea" type="textarea" :rows="2" v-model="formData.name"
      :resize="'none'"
      placeholder="输入模板内容" />

    <el-button class="footerBtn" color="#1B16FF" :disabled="!formData.template_name" type="primary" @click="submit">确定</el-button>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Post } from '@/utils/apis.js'

// 注册暴露方法
const emits = defineEmits(['saveSuc'])

// 弹框控制
const dialogVisible = ref(false)

// 分组名称
const formData = reactive({
  id: 0,
  name: '',
  name_en: '',
  template_name: '',
})

// 添加分组
const open = (item) => {
  formData.id = item.id
  formData.name = item.name
  formData.name_en = item.name_en
  formData.template_name = item.template_name
  dialogVisible.value = true
}

// 关闭分组弹框
const handleClose = () => {
  dialogVisible.value = false
  name.value = ''
}

// 确定
const submit = async () => {
  // 保存模板
  const res = await Post('/template/update', formData)
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
    // 重新获取分类列表
    emits('saveSuc')
    handleClose()
  }
}

// 暴露方法给父组件
defineExpose({
  open,
})
</script>

<style lang='less' scoped>
.textarea {
  width: 100%;
  // height: 90px;
  margin-top: 20px;
}
.input {
  width: 100%;
  height: 42px;
  // margin-top: 0px;
}
.footerBtn {
  width: 100%;
  height: 42px;
  margin-top: 20px;
}
</style>
