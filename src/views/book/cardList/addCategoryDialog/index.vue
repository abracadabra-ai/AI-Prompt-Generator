<!-- 分组弹框 -->
<template>
  <!-- 分组弹框 -->
  <el-dialog
    title="新增分组"
    v-model="groupDialogVisible"
    width="400px"
    :before-close="groupHandleClose"
  >
    <el-input class="input" v-model="name" placeholder="输入分组名称" />
    <template #footer>
      <el-button class="footerBtn" color="#1B16FF" :disabled="!name" type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { Post } from '@/utils/apis.js'
import { ElMessage } from 'element-plus'

const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

// 弹框控制
const groupDialogVisible = ref(false)

// 分组名称
const name = ref('')

// 添加分组
const open = () => {
  groupDialogVisible.value = true
}

// 关闭分组弹框
const groupHandleClose = () => {
  groupDialogVisible.value = false
  name.value = ''
}

// 确定
const submit = async () => {
  const res = await Post('/category/save', {
    name: name.value,
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '添加分类成功'
    })

    // 重新获取分类列表
    $bus.emit('initCategorylist')

    groupHandleClose()
  }
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
