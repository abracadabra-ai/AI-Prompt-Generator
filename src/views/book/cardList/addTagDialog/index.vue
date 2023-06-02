<!-- 添加提示词 -->
<template>
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
          :action="`${nodeFilePath}/upload/save/tag`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="{
            path: '/tag'
          }"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar__img" />
          <img v-else class="avatar__img" :src="noneImg" />
        </el-upload>
      </div>
      <div class="box__input">
        <el-input class="box__input--item" v-model="formData.name_en" placeholder="Enter the prompt " />
        <el-input class="box__input--item" v-model="formData.name" placeholder="输入中文提示词" />
      </div>
    </div>
    <template #footer>
      <span class="footer">
        <el-select v-model="formData.category_id" placeholder="选择分类" size="large">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <div class="select">
              {{ item.name }}
            </div>
          </el-option>
          <div class="selectAdd" @click="addGroup">+新增分组</div>
        </el-select>
        <el-button class="footer__btn"  color="#626aef" :disabled="isSubmit" type="primary" @click="submit">上传</el-button>
      </span>
    </template>
  </el-dialog>

  <add-category-dialog ref="addCategoryDialog" />
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits } from 'vue'
import AddCategoryDialog from '../addCategoryDialog/index.vue'
import { Post } from '@/utils/apis.js'
import { ElMessage } from 'element-plus'

// 注册暴露方法
const emits = defineEmits(['saveSuc'])

defineProps({
  // 分类列表
  categoryList: Array,
})

const nodeFilePath = 'http://127.0.0.1:3000'

const dialogVisible = ref(false)

// 表单数据
const formData = reactive({
  name: '', // 提示词
  name_en: '', // 英文提示词
  image: '', // 图片路径
  category_id: '', // 分组id
})


// 是否可以上传
const isSubmit = computed(() => {
  return !formData.name_en || !formData.name || !formData.image || !formData.category_id
})

// 打开弹框
const open = () => {
  dialogVisible.value = true
}

// 默认图片
const noneImg = ref(new URL('./none.png', import.meta.url).href)

// 回显图片
const imageUrl = ref('')

// 上传成功方法
const handleAvatarSuccess = ( response, uploadFile) => {
  console.log('response', response)
  console.log('path', response.data.path)
  console.log('uploadFile', uploadFile)
  imageUrl.value = nodeFilePath + response.data.path;
  formData.image = response.data.path
}

// 添加分类
const addCategoryDialog = ref(null)
const addGroup = () => {
  addCategoryDialog.value.open()
}


const handleClose = () => {
  dialogVisible.value = false
}

// 上传
const submit = async () => {
  const res = await Post('/card/save', formData)
  console.log('resss', res)
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '添加卡片成功'
    })
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
.box {
  display: flex;
  &__img {
    .avatar {
      &__img {
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

// .select {
//   &__img {
//     width: 18px;
//     height: 18px;
//     margin-right: 6px;
//   }
// }

.selectAdd {
  padding: 10px 32px 10px 20px;
  color: #1B16FF;
}
</style>
