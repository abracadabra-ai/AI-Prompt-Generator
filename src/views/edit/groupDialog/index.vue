<!-- 编辑分组 -->
<template>
  <!-- 提示词弹框 -->
  <el-dialog
    title="编辑分组"
    v-model="dialogVisible"
    width="570px"
    :before-close="handleClose"
  >
    <div class="list">
      <el-table
        ref="tableRef"
        :data="list"
        style="width: 100%"
        :show-header="false"
        :border="false"
      >
        <el-table-column prop="name" label="内容">
          <template #default="scope">
            <el-input class="list__input" v-model="scope.row.name" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="50" align="center">
          <template #default="scope">
            <div class="editBtn">
              <img src="@/assets/img/edit/del.png" @click="delTag(scope.$index)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="list__addBtn" @click="addTag">+ 新增分组</el-button>
    </div>
    <div class="footer">
      <el-button :class="`footer__btn ${!isSubmit && 'nohover'}`" color="#1B16FF" :disabled="isSubmit" type="primary" @click="submit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Post } from '@/utils/apis.js'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['updateTag'])

// 删除
const delTag = (index) => {
  list.value.splice(index, 1)
}

// 新增
const addTag = () => {
  list.value.push({
    name: ''
  })
}

// 提交
const submit = async () => {
  // 批量保存分组
  const res = await Post('/category/updateList', {
    list: list.value,
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '编辑分组成功'
    })
    handleClose()
    emits('updateTag')
  }
}

// 是否可以上传
const isSubmit = computed(() => {
  return list.value.filter((item) => !item.name)[0] || false 
})

// 打开弹框
const dialogVisible = ref(false)

const list = ref([])
const open = (tags) => {
  list.value = [...tags]
  dialogVisible.value = true
}

// 关闭
const handleClose = () => {
  dialogVisible.value = false
}

// 暴露方法给父组件
defineExpose({
  open,
})
</script>

<style lang='less' scoped>
.list {
  text-align: left;

  &__input {
    height: 42px;
  }

  // 背景色
  &:deep(.el-table__body, .el-table__expanded-cell) {
    background-color: #fff;
  }
  // 行距
  &:deep(.el-table__body) {
    -webkit-border-vertical-spacing: 2px
  }
  // 去掉底部横线
  &:deep(.el-table__inner-wrapper) {
    background-color: #fff;
  }
  &:deep(td.el-table__cell, th.el-table__cell.is-leaf) {
    border-bottom: none;
  }
  &:deep(.el-table__inner-wrapper::before) {
    height: 0;
  }

  &__addBtn {
    margin-left: 12px;
    color: #1B16FF;
    height: 42px;
    line-height: 42px;
    width: 456px;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  align-items: center;
  &__btn {
    width: 100%;
    height: 42px;
    margin-left: 12px;
    margin-right: 12px;

    &.nohover:hover {
      background-color: #1B16FF; /* 取消背景色 */
      color: #fff; /* 使用继承的文本颜色 */
      border-color: none; /* 使用继承的边框颜色 */
    }
  }
}

.editBtn {
  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
