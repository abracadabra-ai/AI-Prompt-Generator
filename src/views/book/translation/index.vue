<!-- 翻译组件 -->
<template>
  <div class="inputList">
    <div class="inputList__q">
      <el-input
        v-model="inputTxt"
        :rows="6"
        type="textarea"
        placeholder="请输入中文"
        :resize="'none'"
        @change="getEN"
        @blur="saveUserInput"
        class="inputList__q--txt"
        ref="inputTxtRef"
      />
      <div class="inputList__q--x" v-show="inputTxt" @click="clearInput"></div>
      <div class="inputList__q--up" v-if="templateList.length">
        <el-dropdown :max-height="340">
          <div class="up">
            <img src="@/assets/img/book/up.png" alt="">
            <div class="up__icon"></div>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="dropdown">
              <el-dropdown-item
                v-for="item in templateList"
                :key="item.id"
                @click="selTemplate(item)"
              >
                {{ item.template_name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="inputList__a">
      <el-input
        class="inputList__a--txt"
        v-model="outputTxt"
        :rows="6"
        type="textarea"
        placeholder="英文翻译"
        :resize="'none'"
        readonly
      />
      <div class="inputList__a--copy" v-show="outputTxt" @click="copyOutput">复制</div>
      <div class="inputList__a--down" v-show="inputTxt" @click="saveTemplateName">
        <div class="down">
          <img src="@/assets/img/book/down.png" alt="">
          <div class="down__icon"></div>
        </div>
      </div>
    </div>
  </div>

  <template-dialog ref="templateDialog" @saveSuc="saveTemplate" />
</template>

<script setup>
import { ref, getCurrentInstance, onActivated } from 'vue'
import { getMp3Url } from './youdao.js'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
import TemplateDialog from './templateDialog/index.vue'
import { Get, Post } from '@/utils/apis.js'

const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

onActivated(() => {
  // 是否在案例中跳过来
  if (localStorage.getItem('caseInfo')) {
    setCaseInfo()
  }
})

// 是否在案例中跳过来
const caseInfo = ref(null)
const setCaseInfo = () => {
  caseInfo.value = JSON.parse(localStorage.getItem('caseInfo'))
  caseInfo.value.type = 'case'

  showInputList.length = 0
  showInputList.push(caseInfo.value)
  localStorage.removeItem('caseInfo')

  saveInputTxt()
}

const showInputList = []
$bus.on('selCard', ({item, type}) => {
  /**
   * item: 传入数据
   * type: add 新增，remove:删减
   */
  console.log('item', item, type)
  if (type === 'add') {
    item.type = 'card'
    showInputList.push(item)
  } else {
    const index = showInputList.findIndex((i) => i.id === item.id && item.type === 'card')
    showInputList.splice(index, 1)
  }

  saveInputTxt()
})

// 处理inputTxt拼接
const saveInputTxt = () => {
  inputTxt.value = ''
  showInputList.forEach((item) => {
    inputTxt.value += (item.name + `,`)
  })

  getEN()
}

// 复制
const { toClipboard } = useClipboard()
const inputTxt = ref('')
const outputTxt = ref('')

let timer = null
const getEN = () => {
  timer && clearTimeout(timer)
  timer = setTimeout(async () => {
    outputTxt.value = await getMp3Url(inputTxt.value)
    console.log('翻译')
  }, 500)
}

// 创建user输入
const saveUserInput = () => {
  if (inputTxt.value) {
    // 如果最后一个的值是user，那么直接覆盖上去，不是则创建一个user
    const endList = showInputList[showInputList.length - 1]
    const endTxt = inputTxt.value.split(',')[inputTxt.value.split(',').length - 1]
    if (endList) {
      if (endList.type !== 'user') {
        showInputList.push({
          type: 'user', // 用户输入
          name: endTxt,
        })
      } else {
        console.log(8888, showInputList, showInputList[showInputList.length - 1], endTxt)
        showInputList[showInputList.length - 1].name = endTxt
      }
    } else {
      showInputList.push({
        type: 'user', // 用户输入
        name: endTxt
      })
    }
  } else {
    showInputList.length = 0
  }

  console.log('show:', showInputList)
}


const inputTxtRef = ref(null)
// 清空
const clearInput = () => {
  inputTxtRef.value.clear()
  showInputList.length = 0
  saveInputTxt()
  $bus.emit('clearCard')
}

// 复制
const copyOutput = () => {
  toClipboard(outputTxt.value)
  ElMessage({
    type: 'success',
    message: '复制成功'
  })
}

const templateDialog = ref(null)
// 保存当前模板
const saveTemplateName = () => {
  templateDialog.value.open()
}

// 选择模板
const selTemplate = (item) => {
  showInputList.push({
    type: 'template', // 用户输入
    name: item.name
  })

  saveInputTxt()
}

// 保存模板
const saveTemplate = async (name) => {
  const res = await Post('/template/save', {
    template_name: name,
    name: inputTxt.value,
    name_en: outputTxt.value,
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
    getTemplateList()
  }
}

// 获取模板列表
const templateList = ref([])
const getTemplateList = async () => {
  const res = await Get('/template/list')
  if (res.code === 0) {
    templateList.value = res.data
  }
}

// 获取模板
getTemplateList()
</script>

<style lang='less' scoped>
.inputList {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__q {
    width: 530px;
    height: 170px;
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #E7E7F2;
    border-radius: 2px;
    padding: 10px 35px 20px 10px;

    &--txt {
      font-size: 16px;
    }

    &--x {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 36px;
      height: 25px;
      width: 25px;
      background: url(@/assets/img/book/close.png);
      background-size: 100% 100%;
    }
    &:deep(.el-textarea__inner) {
      height: 100px;
      border: none;
      box-shadow: none;
    }

    &--up {
      position: absolute;
      left: 10px;
      bottom: 10px;

      .up {
        position: relative;
        background-color: #ffffff;
        padding: 8px;
        img {
          width: 20px;
          height: 20px;
          display: inline-block;
        }

        &__icon {
          position: relative;
          right: -4px;
          top: -4px;
          display: inline-block;
          border-top: 4px solid #A1A4B3;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }
      }
    }
  }

  &__a {
    width: 530px;
    height: 170px;
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #E7E7F2;
    border-radius: 2px;
    padding: 10px 35px 20px 10px;

    &--txt {
      font-size: 16px;
    }

    &--copy {
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 14px;
      width: 50px;
      height: 36px;
      line-height: 36px;
      background-image: url(@/assets/img/case/copy.png);
      background-color: #F7F8FF;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: 10px 10px;
      padding-left: 24px;
      border-radius: 2px;
    }
    &:deep(.el-textarea__inner) {
      height: 100px;
      border: none;
      box-shadow: none;
    }

    &--down {
      position: absolute;
      left: 10px;
      bottom: 10px;
      .down {
        position: relative;
        background-color: #ffffff;
        padding: 8px;
        display: inline-block;
        img {
          width: 20px;
          height: 20px;
          display: inline-block;
        }
      }
    }
  }
}

.dropdown {
  min-width: 100px;
}
</style>
