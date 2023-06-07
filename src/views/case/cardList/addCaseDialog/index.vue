<!-- 上传案列 -->
<template>
  <el-dialog
  :title="`${ formData.id ? '更新' : '上传' }案列`"
    v-model="dialogVisible"
    width="570px"
    :before-close="handleClose"
  >
    <div class="box">
      <div class="box__img">
        <el-upload
          class="avatar"
          :action="`${nodeFilePath}/upload/save/case`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar__img" :onerror="imgError" />
          <img v-else class="avatar__img" src="@/assets/img/case/none_up.png" />
        </el-upload>
      </div>
      <div class="box__input">
        <el-input type="textarea" :rows="3" class="box__input--item" v-model="formData.name" placeholder="输入提示词" />
      </div>
    </div>

    <div class="footer">
      <el-select v-model="formData.type_id" placeholder="选择分组" size="large">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <div class="select">
            {{ item.name }}
          </div>
        </el-option>
        <div class="selectAdd" @click="addType">+新增分组</div>
      </el-select>
      <el-button class="footer__btn" color="#1B16FF" :disabled="isSubmit" type="primary" @click="submit">{{ formData.id ? '更新' : '上传' }}</el-button>
    </div>
  </el-dialog>

  <!-- 添加弹框 -->
  <add-type-dialog ref="addTypeDialog" />

</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AddTypeDialog from '../addTypeDialog/index.vue'
import { Post } from '@/utils/apis.js'
const nodeFilePath = import.meta.env.VITE_NODE_PUBLIC_PATH

// 注册暴露方法
const emits = defineEmits(['saveSuc'])

defineProps(({
  // 类型分类
  typeList: Array,
}))

// 图片加载有问题
const imgError = computed(() => {
  return formData.id ? `this.src="${new URL('@/assets/img/case/none.png', import.meta.url).href}"` : `this.src="${new URL('@/assets/img/case/none_up.png', import.meta.url).href}"`
})

const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.name = ''
  formData.image = ''
  formData.type_id = ''

  imageUrl.value = ''
}

// 表单数据
const formData = reactive({
  id: null,
  name: '', // 提示词
  image: '', // 图片路径
  type_id: '', // 分组id
})


// 是否可以上传
const isSubmit = computed(() => {
  return !formData.name || !formData.image || !formData.type_id
})

// 打开弹框
const open = (item = null) => {
  if (item && item.id) {
    formData.id = item.id
    formData.name = item.name
    formData.image = item.image
    formData.type_id = item.type_id

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

// 上传
const submit = async () => {
  let res = null
  // 编辑
  if (formData.id) {
    res = await Post('/case/update', formData)
  } else {
    res = await Post('/case/save', formData)
  }
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: `${ formData.id ? '更新' : '新增' }案例成功`
    })
    emits('saveSuc')
    handleClose()
  }
}

// 添加分组
const addTypeDialog = ref(null)
const addType = () => {
  addTypeDialog.value.open()
}

// 暴露方法给父组件
defineExpose({
  open,
})
</script>

<style lang='less' scoped>
.box {
  &__img {
    width: 100%;
    display: flex;
    align-items: center;
    height: 371px;
    background: #F7F8FF;
    .avatar {
      width: 100%;
      &__img {
        width: 530px;
        max-height: 371px;
      }
    }
  }
  &__input {
    margin-top: 16px;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  &__btn {
    width: 390px;
    height: 42px;
    margin-left: 20px;
    // margin-right: 10px;
  }
}

.select {
  &__img {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
}
.selectAdd {
  padding: 10px 32px 10px 20px;
  color: #1B16FF;
}
</style>
