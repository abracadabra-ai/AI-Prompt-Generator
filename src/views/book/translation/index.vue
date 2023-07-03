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
        @change="changeInputTxt"
        @blur="saveUserInput"
        class="inputList__q--txt"
        ref="inputTxtRef"
      />
      <div class="inputList__q--x" v-show="inputTxt" @click="clearInput"></div>
      <div class="inputList__q--up" v-if="templateList.length">
        <el-dropdown :max-height="340" trigger="click">
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
              <!-- <el-dropdown-item @click="editTemplate">
                <div class="selectAdd">+编辑起手式</div>
              </el-dropdown-item> -->
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
        ref="outputTxtRef"
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

  <add-template-dialog ref="templateDialog" @saveSuc="saveTemplate" />
</template>

<script setup>
import { ref, getCurrentInstance, onActivated } from 'vue'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
import AddTemplateDialog from './addTemplateDialog/index.vue'
import { Get, Post } from '@/utils/apis.js'
// import { useRouter } from 'vue-router'
// const router = useRouter()
const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

onActivated(() => {
  // 是否在案例中跳过来
  if (localStorage.getItem('caseInfo')) {
    setCaseInfo()
  }
  getTemplateList()
})

// 是否在案例中跳过来
// const caseInfo = ref(null)
const setCaseInfo = () => {
  const caseInfo = JSON.parse(localStorage.getItem('caseInfo'))
  caseInfo.type = 'case'

  localStorage.removeItem('caseInfo')

  saveInputTxt()

  // 输入英文框翻译中文
  setOutputTxt(caseInfo)
}

const setOutputTxt = async (item) => {
  showInputList.length = 0
  const endTxt = await Get('/translate/info', {
    to: 'zh-CHS',
    from: 'en',
    text: item.name,
  }) // 把案例翻译成中文
  // 判断是否有英文，没有则单独翻译
  showInputList.push({
    type: item.type, // 用户输入
    name: endTxt.data[0].tgt,
    name_en: item.name,
  })
  // outputTxt.value = item.name
  // getCN()
  getInputTxt()
}

const showInputList = []
$bus.on('selCard', ({item, type}) => {
  /**
   * item: 传入数据
   * type: add 新增，remove:删减
   */
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

  getInputTxt()
}

// 复制
const { toClipboard } = useClipboard()
const inputTxt = ref('')
const outputTxt = ref('')

let timer = null
// 组装两个input的数据
const getInputTxt = () => {
  timer && clearTimeout(timer)
  timer = setTimeout(async () => {
    const list_en = showInputList.map(item => item.name_en)
    outputTxt.value = list_en.join(',')
    const list_cn = showInputList.map(item => item.name)
    inputTxt.value = list_cn.join(',')

  }, 500)
}

// 处理input框内内容变化
const changeInputTxt = (e) => {
  const list = e.replace(/,\s*$/, '').split(',')
  showInputList.forEach((item) => {
    item.sel = false
  })

  // 遍历showInputList，如果跟list不匹配，删除showInputList中的item
  const newList = list.map(item => {
    console.log(item)
    if (showInputList.filter(input => input.name === item)[0]) {
      showInputList.filter(input => input.name === item)[0].sel = true
      return showInputList.filter(input => input.name === item)[0]
    } else {
      if (item) {
        return {
          type: 'user', // 用户输入
          name: item,
        }
      }
    }
  })
  showInputList.length = 0
  showInputList.push(...newList)
}

// 创建user输入
const saveUserInput = async () => {
  const iTxt = inputTxt.value.replace(/,\s*$/, '')
  if (iTxt) {
    // 翻译英文
    for (let i in showInputList) {
      const item = showInputList[i]
      if (!item.name_en) {
        const name_en = await Get('/translate/info', {
          text: item.name,
        })
        item.name_en = name_en.data[0].tgt
      }
    }
  } else {
    showInputList.length = 0
  }
  getInputTxt()
}


const inputTxtRef = ref(null)
const outputTxtRef = ref(null)
// 清空
const clearInput = () => {
  inputTxtRef.value.clear()
  outputTxtRef.value.clear()
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

// 编辑起手式
// const editTemplate = () => {
//   router.push({
//     path: '/edit',
//     query: {
//       type: 'template'
//     }
//   })
// }

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
    height: 200px;
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #E7E7F2;
    border-radius: 2px;
    padding: 10px 45px 20px 10px;

    &--txt {
      font-size: 16px;
      caret-color: #1B16FF;
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
      height: 140px;
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
    height: 200px;
    position: relative;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #E7E7F2;
    border-radius: 2px;
    padding: 10px 45px 20px 10px;

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
      height: 140px;
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
  &:deep(.el-dropdown-menu__item) {
    &:focus {
      color: #606266;
      background-color: #F7F8FF;
    }
  }
}

.selectAdd {
  padding: 10px 0;
  color: #1B16FF;
  font-family: 'Source Han Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
</style>
