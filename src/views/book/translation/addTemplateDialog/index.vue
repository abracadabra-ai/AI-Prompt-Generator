<!-- 分组弹框 -->
<template>
  <!-- 分组弹框 -->
  <el-dialog
    title="模板"
    v-model="dialogVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-input class="input" v-model="name" placeholder="输入模板名称" />
    <template #footer>
      <el-button class="footerBtn" color="#1B16FF" :disabled="!name" type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
// 注册暴露方法
const emits = defineEmits(['saveSuc'])

// 弹框控制
const dialogVisible = ref(false)

// 分组名称
const name = ref('')

// 添加分组
const open = () => {
  dialogVisible.value = true
}

// 关闭分组弹框
const handleClose = () => {
  dialogVisible.value = false
  name.value = ''
}

// 确定
const submit = async () => {
  // 重新获取分类列表
  emits('saveSuc', name.value)
  handleClose()
}

// 暴露方法给父组件
defineExpose({
  open,
})
</script>

<style lang='less' scoped>
.input {
  width: 100%;
  height: 42px;
}
.footerBtn {
  width: 100%;
  height: 42px;
}
</style>
