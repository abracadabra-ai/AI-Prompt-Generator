<!-- 上传案列 -->
<template>
  <el-dialog
    title="上传案列"
    v-model="dialogVisible"
    width="570px"
    :before-close="handleClose"
  >
    <div class="box">
      <div class="box__img">
        <el-upload
          class="avatar"
          action="http://127.0.0.1:3000/upload/save"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar__img" />
          <img v-else class="avatar__img" src="./none.png" />
        </el-upload>
      </div>
      <div class="box__input">
        <el-input type="textarea" :rows="3" class="box__input--item" v-model="promptEN" placeholder="输入提示词" />
      </div>
    </div>
    <template #footer>
      <span class="footer">
        <el-select v-model="value" placeholder="选择分类" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <div class="select">
              <img class="select__img" :src="demoIcon" alt="">{{ item.value }}
            </div>
          </el-option>
          <div class="selectAdd" @click="addGroup">+新增分组</div>
        </el-select>
        <el-button class="footer__btn"  color="#626aef" :disabled="isSubmit" type="primary" @click="submit">上传</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 添加弹框 -->
  <add-group-dialog ref="addGroupDialog" />

</template>

<script setup>
import { ref, reactive } from 'vue'
import AddGroupDialog from '../addGroupDialog/index.vue'

const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}

// 打开
const open = () => {
  dialogVisible.value = true
}

// 上传
const submit = () => {
  handleClose()
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
])

// 添加分组
const addGroupDialog = ref(null)
const addGroup = () => {
  addGroupDialog.value.openGroup()
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
    .avatar {
      width: 100%;
      &__img {
        width: 530px;
        height: 371px;
      }
    }
  }
  &__input {
    margin-top: 20px;
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
