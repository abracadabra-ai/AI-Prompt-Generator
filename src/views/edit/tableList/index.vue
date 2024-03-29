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
      @row-click="handlerowClick"
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
      <el-table-column prop="template_name" v-if="routeType === 'template'" label="模板名称" show-overflow-tooltip>
        <template #default="scope">
          <p class="list__content">
            {{ scope.row.template_name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name_en" v-if="routeType === 'book'" label="英文" show-overflow-tooltip>
        <template #default="scope">
          <p class="list__content">
            {{ scope.row.name_en }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="内容" show-overflow-tooltip>
        <template #default="scope">
          <p class="list__content">
            {{ scope.row.name }}
          </p>
        </template>
      </el-table-column>

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

  <!-- 魔法书编辑弹框 -->
  <add-card-dialog ref="addCardDialog" :category-list="tags" @saveSuc="saveSuc" />

  <!-- 案例编辑弹框 -->
  <add-case-dialog ref="addCaseDialog" :type-list="tags" @saveSuc="saveSuc" />

  <!-- 模板编辑弹框 -->
  <edit-template-dialog ref="editTemplateDialog" @saveSuc="saveSuc" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AddCardDialog from '@/views/book/cardList/addCardDialog/index.vue'
import AddCaseDialog from '@/views/case/cardList/addCaseDialog/index.vue'
import EditTemplateDialog from '@/views/book/translation/editTemplateDialog/index.vue'
import { Get } from '@/utils/apis.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'

const emits = defineEmits(['update', 'clearSelAll', 'selAll'])

const route = useRoute()

// 删除接口
const ListApi = computed(() => {
  if (routeType.value === 'book') {
    return {
      delete: '/card/delete',
    }
  } else if (routeType.value === 'template') {
    return {
      delete: '/template/delete',
    }
  } else {
    return {
      delete: '/case/delete',
    }
  }
})

// 当前编辑: book魔法书，case案例
const routeType = computed(() => {
  return route.query.type
})

const props = defineProps({
  list: Array,
  tags: Array
})

// table控件
const tableRef = ref(null)
const selAll = () => {
  tableRef.value.toggleAllSelection() // 切换
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

// 当前行被选中
const handlerowClick = (row) => {
  tableRef.value.toggleRowSelection(row)
}

watch(() =>
  selList.value, (newValue) => {
    if (newValue.length === props.list.length) {
      // 全选
      emits('selAll')
    } else {
      // 取消全选
      emits('clearSelAll')
    }
  }
)

// 修改分类
const addCardDialog = ref(null) // 魔法书弹框
const addCaseDialog = ref(null)
const editTemplateDialog = ref(null)
const editCard = (item) => {
  if (routeType.value === 'book') {
    addCardDialog.value.open(item)
  } else if (routeType.value === 'template') {
    editTemplateDialog.value.open(item)
  } else {
    addCaseDialog.value.open(item)
  }
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
    type: 'warning',
  }).then(async () => {
    const res = await Get(`${ ListApi.value.delete }/${ item.id }`)
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
    height: 62px;
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

  &__content {
    white-space: pre-wrap;
    color: #2E2F33;
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
