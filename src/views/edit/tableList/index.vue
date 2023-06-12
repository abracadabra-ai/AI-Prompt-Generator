<!-- table样式 -->
<template>
  <div class="list">
    <el-table
      ref="tableRef"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      :show-header="false"
      :border="false"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="image" width="60">
        <template #default="scope">
          <img
            class="list__img" :src="scope.row.imageEx" :onerror="imgError" alt=""
            @mouseenter="enterImg(scope, $event)"
            @mouseleave="leaveImg"
          >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="内容" show-overflow-tooltip />

      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <div class="editBtn">
            <img src="@/assets/img/edit/edit.png" @click="editCard(scope.row)" />
            <img src="@/assets/img/edit/del.png" @click="delCard(scope.row)" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="showBigImage" class="big-image" :style="{
      top: `${mouseY}px`,
      left: `${mouseX}px`
    }">
      <img :src="floatImg" :onerror="imgError" alt="Big Image" />
    </div>
  </div>

  <!-- 编辑弹框 -->
  <add-card-dialog ref="addCardDialog" :categoryList="tags" @saveSuc="saveSuc" />
</template>

<script setup>
import { ref, computed } from 'vue'
import AddCardDialog from '@/views/book/cardList/addCardDialog/index.vue'
import { Get } from '@/utils/apis.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const emits = defineEmits(['update'])

const props = defineProps({
  list: Array,
  tags: Array
})

// table控件
const tableRef = ref(null)
const selAll = () => {
  tableRef.value.toggleAllSelection()
}

// 图片加载有问题
const imgError = computed(() => {
  return `this.src="${new URL('@/assets/img/book/none.png', import.meta.url).href}"`
})

// 鼠标定位
const mouseX = ref(0)
const mouseY = ref(0)
const showBigImage = ref(false)
const leaveImg = () => {
  showBigImage.value = false
}

// 浮标图片
const floatImg = ref('')
const enterImg = (item, event) => {
  floatImg.value = props.list[item.$index].imageEx
  showBigImage.value = true
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
}

// 已选列表
const selList = ref([])

// 选择变化
const handleSelectionChange = (val) => {
  selList.value = val
}

// 修改分类
const addCardDialog = ref(null)
const editCard = (item) => {
  addCardDialog.value.open(item)
}

// 修改成功
const saveSuc = () => {
  emits('update')
}

// 删除数据
const delCard = async (item) => {
  ElMessageBox.confirm(`确定删除：${item.name} ？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await Get(`/card/delete/${item.id}`)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      emits('update')
    }
  })
}

// 暴露方法给父组件
defineExpose({
  selAll,

  selList,
})
</script>

<style lang='less' scoped>
.list {
  width: 1280px;
  margin: 0 auto 58px;
  &:deep(.el-table__row) {
    height: 72px;
  }
  // 背景色
  &:deep(.el-table__body, .el-table__expanded-cell) {
    background-color: #F5F6F7;
  }
  // 行距
  &:deep(.el-table__body) {
    -webkit-border-vertical-spacing: 10px
  }
  // 去掉底部横线
  &:deep(.el-table__inner-wrapper) {
    background-color: #F5F6F7;
  }
  &:deep(td.el-table__cell, th.el-table__cell.is-leaf) {
    border-bottom: none;
  }
  &:deep(.el-table__inner-wrapper::before) {
    height: 0;
  }


  &__img {
    width: 100%;
  }
}

.editBtn {
  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
}

.big-image {
  position: fixed;
  pointer-events: none;
  z-index: 100;
  img {
    width: 200px;
  }
}
</style>
