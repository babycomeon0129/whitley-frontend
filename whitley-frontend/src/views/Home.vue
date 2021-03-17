<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <h1>幸安國小 體溫紀錄表</h1>
      </div>
    </div>
    <!-- 查詢區 -->
    <div class="sort-area">
      <div class="container">
        <div class="row">
          <div class="col-6 flexfrm flex-container">
            <p>查詢項目</p>
            <el-select v-model="demand" placeholder="請選擇">
              <el-option
                v-for="(item, index) in demandSelect"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-6 flexfrm flex-container">
            <p>查詢內容</p>
            <el-input
              v-model="demandContent"
              placeholder="請輸入查詢內容"
            ></el-input>
          </div>
        </div>
        <div class="row">
          <div class="col-6 flexfrm flex-container">
            <p>日期</p>
            <el-date-picker
              style="width: 100%"
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="col-6">
            <p>體溫</p>
            <el-radio v-model="temperature" label="1">不限制</el-radio>
            <el-radio v-model="temperature" label="2">異常</el-radio>
            <el-button type="primary">送出</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 秀資料區 -->
    <div class="datashow">
      <div class="container">
        <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column prop="date" label="日期 & 時間" sortable>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="address" label="ID">
          </el-table-column>
          <el-table-column prop="address" label="卡號">
          </el-table-column>
          <el-table-column prop="address" label="體溫紀錄"  sortable>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分頁 -->
    <div class="pagination">
      <div class="container">
        <el-pagination
          @current-change="checkPage($event)"
          layout="prev, pager, next"
          :total="dataTatal">
        </el-pagination>
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
    /** 查詢選單 */
    const demandSelect = reactive([
      {
        label: '姓名',
        value: 'name'
      },
      {
        label: '電話',
        value: 'tel'
      },
      {
        label: 'ID',
        value: 'id'
      },
      {
        label: '卡號',
        value: 'cardNumber'
      }
    ])
    /** 查詢項目 */
    const demand = ref('')
    /** 查詢內容 */
    const demandContent = ref('')
    /** 日期 */
    const dateRange = ref('')
    /** 體溫 */
    const temperature = ref('1')
    /** 查詢資料 */
    const getData = reactive('')
    /** 資料總筆數 */
    const dataTatal = ref(50)

    return {
      demandSelect,
      demand,
      demandContent,
      dateRange,
      temperature,
      getData,
      dataTatal
    }
  },
  methods: {
    checkPage (page) {
      console.log(page)
    }
  },
  computed: {
    filterItem () {
      return 1231
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
  border-bottom: 1px solid #c9ced2;
  h1 {
    margin: 0;
    font-size: 20px;
  }
}

.col-6 {
  padding: 1em;
  @media (max-width: 760px) {
        width: 100%;
    }
}

label {
  margin-bottom: 1em;
}

.sort-area {
  padding: 1em 0;
  p {
    margin-top: 0;
  }
}

.datashow {
  padding: 1em 0;
}

.pagination {
  text-align: center;
  margin-top: 1em;
}
</style>
