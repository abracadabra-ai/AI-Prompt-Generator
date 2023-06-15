<!-- 修改页 -->
<template>
  <div class="menu">
    <div class="menu__left">
      <div class="menu__left--allSel">
        <el-checkbox @change="handleCheckAllChange" v-model="checkAll" />
      </div>
      <div class="menu__left--filter">
        <el-select v-model="tagsId" placeholder="请选择">
          <el-option
            v-for="item in tags"
            :key="item.id"
            @click="selTag(item)"
            :label="item.name"
            :value="item.id"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="menu__right">
      <!-- 编辑分组 -->
      <div class="menu__right--btn edit" @click="editGroup">编辑分组</div>

      <!-- 移动按钮 -->
      <el-dropdown :max-height="340" trigger="click">
        <div class="up">
          移动到
          <div class="up__icon"></div>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="dropdown">
            <el-dropdown-item
              v-for="item in tags"
              :key="item.id"
              @click="moveTag(item)"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 删除按钮 -->
      <div class="menu__right--btn del" @click="delList">批量删除</div>
    </div>
  </div>

  <table-list :list="cardList" ref="tableListRef" :tags="tags" @update="getCardList" @clearSelAll="clearSelAll" @selAll="selAll" />

  <group-dialog ref="groupDialogRef" @updateTag="getTagsList" />

  <!-- <div class="footer">
    <div class="footer__btn cancel">取消</div>
    <div class="footer__btn submit">保存</div>
  </div> -->
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { Get, Post } from '@/utils/apis.js'
import TableList from './tableList/index.vue'
import GroupDialog from './groupDialog/index.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 当前编辑: book魔法书，case案例
const routeType = computed(() => {
  return route.query.type
})

// 分类接口
const tagsApi = computed(() => {
  if (routeType.value === 'book') {
    return '/category/list'
  } else {
    return '/type/list'
  }
})

// 列表接口
const ListApi = computed(() => {
  if (routeType.value === 'book') {
    return {
      updateList: '/card/updateList',
      deleteList: '/card/deleteList',
      list: '/card/list',
    }
  } else {
    return {
      updateList: '/case/updateList',
      deleteList: '/case/deleteList',
      list: '/case/list',
    }
  }
})

const nodeFilePath = import.meta.env.VITE_NODE_PUBLIC_PATH

// 分类数据
const tags = ref([])

// 当前分类id
const tagsId = ref(0)

// 获取分类
const getTagsList = async () => {
  const res = await Get(tagsApi.value)
  if (res.code === 0) {
    tags.value = res.data
    tags.value.unshift({
      id: 0,
      name: '全部',
    })
    tagsId.value = tags.value[0].id
    getCardList(tagsId.value)
  }
}

// 选择分类
const selTag = (item) => {
  tagsId.value = item.id
  getCardList()
}

// 移动分类
const moveTag = (item) => {
  // 当前勾选的列表
  if (!tableListRef.value.selList.length) {
    ElMessage({
      type: 'error',
      message: '未勾选需要移动的项目'
    })
    return
  }

  ElMessageBox.confirm(`确定移动到：${item.name}`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 确认按钮的回调函数
    const selList = tableListRef.value.selList.map((sel) => {
      sel.category_id = item.id // 分列id

      return sel
    })

    const res = await Post(ListApi.value.updateList, selList)

    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '移动成功'
      })

      // 重新获取卡片数据
      getCardList()
    }
  });
}

// 批量删除
const delList = () => {
  // 当前勾选的列表
  if (!tableListRef.value.selList.length) {
    ElMessage({
      type: 'error',
      message: '未勾选需要移动的项目'
    })
    return
  }

  ElMessageBox.confirm(`确定批量删除数据？？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const selList = tableListRef.value.selList.map((sel) => {
      return sel.id
    })
    const res = await Post(ListApi.value.deleteList, selList)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })

      // 重新获取卡片数据
      getCardList()
    }
  })
}

// 卡片列表
const cardList = ref([])

// 获取卡片数据
const getCardList = async () => {
  const res = await Get(ListApi.value.list, {
    id: tagsId.value,
  })
  if (res.code === 0) {
    cardList.value = res.data.map((item) => {
      item.imageEx = `${nodeFilePath}${item.image}`
      item.sel = false // 是否被选中
      return item
    })
  }
}

// 全选
const tableListRef = ref(null)
const checkAll = ref(false)
const handleCheckAllChange = (val) => {
  checkAll.value = val
  tableListRef.value.selAll()
}

// 取消全选
const clearSelAll = () => {
  checkAll.value = false
}

// 取消全选
const selAll = () => {
  checkAll.value = true
}

// 编辑分组
const groupDialogRef = ref(null)
const editGroup = () => {
  groupDialogRef.value.open(tags.value)
}

watch(() => route.query.type, (newValue, oldValue) => {
  // 参数发生变化时的逻辑
  getTagsList();
})

getTagsList();
</script>

<style lang='less' scoped>
.menu {
  display: flex;
  width: 1280px;
  margin: auto;
  justify-content: space-between;
  position: sticky;
  top: 64px;
  background: #F5F6F7;
  padding: 10px 0 0;
  height: 80px;
  z-index: 99;
  align-items: center;

  &__left {
    &--allSel {
      display: inline-block;
      padding: 20px 20px 20px 14px;
    }
    &--filter {
      display: inline-block;
    }
  }

  &__right {
    &--btn {
      display: inline-block;
      height: 37px;
      line-height: 37px;
      text-align: center;
      background: #FFFFFF;
      border-radius: 2px;
      font-size: 14px;
      width: 92px;
      cursor: pointer;

      &.del {
        color: #FF2559;
        border: 1px solid #FF2559;
        margin-left: 20px;
        border-radius: 0;
        box-sizing: border-box;
      }
      &.edit {
        color: #2E2F33;
        border: 1px solid #E7E7F2;
        margin-right: 20px;
      }
    }

    .up {
      cursor: pointer;
      position: relative;
      background-color: #ffffff;
      padding: 0 10px;
      width: 100px;
      text-align: left;
      height: 37px;
      line-height: 37px;
      box-sizing: border-box;
      border: 1px solid #E7E7F2;
      color: #2E2F33;

      &:focus-visible {
        outline: none;
        background-color: #F7F8FF;
        border-radius: 2px;
      }
      img {
        width: 20px;
        height: 20px;
        display: inline-block;
      }

      &__icon {
        position: absolute;
        right: 10px;
        top: 16px;
        display: inline-block;
        border-top: 4px solid #2E2F33;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid transparent;
      }
    }
  }
}



.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 58px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 99;
  &__btn {
    width: 92px;
    height: 34px;
    line-height: 34px;
    margin-right: 20px;

    &.cancel {
      background: #FFFFFF;
      border: 1px solid #E7E7F2;
      border-radius: 2px;
      color: #2E2F33;
    }
    &.submit {
      background: #1B16FF;
      border: 1px solid #1B16FF;
      border-radius: 2px;
      color: #FFFFFF;
    }
  }
}
</style>
