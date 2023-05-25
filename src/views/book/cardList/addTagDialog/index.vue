<!-- 添加提示词 -->
<template>
  <div>
  <!-- 提示词弹框 -->
  <el-dialog
    title="上传提示词"
    v-model="dialogVisible"
    width="570px"
    :before-close="handleClose"
  >
    <div class="box">
      <div class="box__img">
        <el-upload
          class="avatar"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar__img" />
          <img v-else class="avatar__img" :src="noneImg" />
        </el-upload>
      </div>
      <div class="box__input">
        <el-input class="box__input--item" v-model="promptEN" placeholder="Enter the prompt " />
        <el-input class="box__input--item" v-model="promptCN" placeholder="输入中文提示词" />
      </div>
    </div>
    <template #footer>
      <span class="footer">
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <div class="selectAdd" @click="addGroup">+新增分组</div>
        </el-select>
        <el-button class="footer__btn"  color="#626aef" :disabled="isSubmit" type="primary" @click="submit">上传</el-button>
      </span>
    </template>
  </el-dialog>

  <add-group-dialog ref="addGroupDialog" />
</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AddGroupDialog from '../addGroupDialog/index.vue'

const dialogVisible = ref(false)

// 是否可以上传
const isSubmit = () => {
  return !promptEN.value || !promptCN.value || !imageUrl
} 

// 打开弹框
const open = () => {
  dialogVisible.value = true
}

// 默认图片
const noneImg = ref(new URL('./none.png', import.meta.url).href)

// 上传图片
const imageUrl = ref('')

// 上传成功方法
const handleAvatarSuccess = () => {
  
}

//
const beforeAvatarUpload = () => {

}

// 添加分组
const addGroupDialog = ref(null)
const addGroup = () => {
  addGroupDialog.value.openGroup()
}

// 分类
const options = reactive([
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
])

// 输入框
const promptEN = ref('')
const promptCN = ref('')

const handleClose = () => {
  dialogVisible.value = false
}

// 上传
const submit = () => {
  handleClose()
}

// 暴露方法给父组件
defineExpose({
  open,
})
</script>

<style lang='less' scoped>
.box {
  display: flex;
  &__img {
    .avatar {
      &--img {
        width: 120px;
        height: 120px;
        display: block;
      }
    }
  }

  &__input {
    &--item {
      width: 390px;
      height: 42px;
      margin-bottom: 20px;
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  &__btn {
    width: 390px;
    height: 42px;
    margin-left: 20px;
    margin-right: 10px;
  }
}
.selectAdd {
  padding: 10px 32px 10px 20px;
  color: #1B16FF;
}
</style>
