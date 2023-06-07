<!-- 添加提示词 -->
<template>
  <!-- 提示词弹框 -->
  <el-dialog
    :title="`${ formData.id ? '更新' : '上传' }提示词`"
    v-model="dialogVisible"
    width="570px"
    :before-close="handleClose"
  >
    <div class="box">
      <div class="box__img">
        <el-upload
          class="avatar"
          :action="`${nodeFilePath}/upload/save/category`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="{
            path: '/tag'
          }"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar__img" :onerror="imgError" />
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
          <div class="selectAdd" @click="addGroup">+新建分组</div>
        </el-select>
        <el-button class="footer__btn"  color="#1B16FF" :disabled="isSubmit" type="primary" @click="submit">
          {{ formData.id ? '更新' : '上传' }}
        </el-button>
      </span>
    </template>
  </el-dialog>

  <add-category-dialog ref="addCategoryDialog" />
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AddCategoryDialog from '../addCategoryDialog/index.vue'
import { Post } from '@/utils/apis.js'
import { ElMessage } from 'element-plus'

// 注册暴露方法
const emits = defineEmits(['saveSuc'])

defineProps({
  // 分类列表
  categoryList: Array,
})

const nodeFilePath = import.meta.env.VITE_NODE_PUBLIC_PATH

const dialogVisible = ref(false)

// 表单数据
const formData = reactive({
  id: null,
  name: '', // 提示词
  name_en: '', // 英文提示词
  image: '', // 图片路径
  category_id: '', // 分组id
})


// 默认图片
const noneImg = computed(() => {
  return formData.id ? (new URL('@/assets/img/book/none.png', import.meta.url).href) : (new URL('@/assets/img/book/none_up.png', import.meta.url).href)
})

// 图片加载有问题
const imgError = computed(() => {
  return `this.src="${noneImg.value}"`
})

// 是否可以上传
const isSubmit = computed(() => {
  return !formData.name_en || !formData.name || !formData.category_id
})

// 打开弹框
const open = (item = null) => {
  if (item && item.id) {
    formData.id = item.id
    formData.name = item.name
    formData.name_en = item.name_en
    formData.image = item.image
    formData.category_id = item.category_id

    imageUrl.value = nodeFilePath + item.image
  }
  dialogVisible.value = true
}


// 回显图片
const imageUrl = ref('')

// 上传成功方法
const handleAvatarSuccess = ( response, uploadFile) => {
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

  formData.id = ''
  formData.name = ''
  formData.name_en = ''
  formData.image = ''
  formData.category_id = ''

  imageUrl.value = ''
}

// 上传
const submit = async () => {
  let res = null
  // 编辑
  if (formData.id) {
    res = await Post('/card/update', formData)
  } else {
    res = await Post('/card/save', formData)
  }
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: `${ formData.id ? '更新' : '新增' }卡片成功`
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
    height: 120px;
    display: flex;
    align-items: center;
    .avatar {
      &__img {
        width: 120px;
        max-height: 120px;
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
  font-family: 'Source Han Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
</style>
