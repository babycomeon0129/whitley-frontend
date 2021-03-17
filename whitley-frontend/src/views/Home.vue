<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <h1>幸安國小 體溫紀錄表</h1>
      </div>
    </div>
    <div class="sort-area">
      <div class="container">
        <div class="row">
          <div class="col-6 flexfrm flex-container">
            <p>查詢項目</p>
            <el-select v-model="value" placeholder="請選擇">
              <el-option
                v-for="(item, index) in demand"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="col-6 flexfrm flex-container">
            <p>查詢內容</p>
            <el-input v-model="demandContent" placeholder="請輸入查詢內容"></el-input>
          </div>
        </div>
        <div class="row">
           <div class="col-6 flexfrm flex-container">
            <p>日期</p>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="col-6">
            <p>體溫</p>
            <el-radio v-model="temperature" label="1">不限制</el-radio>
            <el-radio v-model="temperature" label="2">異常</el-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, ref } from 'vue'

export default {
  name: 'Home',
  setup () {
    /** 查詢項目 */
    const demand = reactive([
      {
        label: '姓名'
      },
      {
        label: '電話'
      },
      {
        label: 'ID'
      },
      {
        label: '卡號'
      }])
    /** 查詢內容 */
    const demandContent = ref('')
    /** 日期 */
    const dateRange = ref('')
    /** 體溫 */
    const temperature = ref('1')
    return {
      demand,
      demandContent,
      dateRange,
      temperature
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/_global";
@import "../assets/styles/flex.scss";
@import "../assets/styles/column.scss";

.header {
  padding: 1em 0;
  border-bottom: 1px solid #C9CED2;
  h1 {
    margin: 0;
    font-size: 20px;
  }
}

.col-6 {
  padding: 1em;
}

.col-6 >>> .el-range-editor.el-input__inner {
  width: 100%;
}

label {
  margin-bottom: 1em;
}

</style>
