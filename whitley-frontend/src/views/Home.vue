<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <h1>幸安國小 體溫紀錄表</h1>
        <el-button type="info" icon="el-icon-s-custom" plain @click="logOut">用戶登出</el-button>
      </div>
    </div>
    <!-- 查詢區 -->
    <div class="sort-area">
      <div class="container">
        <div class="row">
          <div class="col-6 flexfrm flex-container">
            <p>查詢項目</p>
            <el-select v-model="filterData.SearchModel.SearchType" placeholder="請選擇" class="sel">
              <el-option
                v-for="(item, index) in demandSelect"
                :key="index"
                :label="item.label"
                :value="item.value"
                :hidden="item.value === 0"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-6 flexfrm flex-container">
            <p>查詢內容</p>
            <el-input
              v-model="filterData.SearchModel.SearchValue"
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
            <div class="flexfrm temperaturearea">
              <div>
                <el-radio v-model="temperature" label="1">不限制</el-radio>
                <el-radio v-model="temperature" label="2">異常</el-radio>
             </div>
              <div>
                <el-button type="primary" @click="checkData(1, 'InsertDate Desc')">送出查詢</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 秀資料區 -->
    <div class="datashow">
      <div class="container">
        <p>共{{dataTatal}}筆資料</p>
        <table>
            <thead>
                <tr>
                    <th>日期 & 時間
                       <i class="el-icon-caret-bottom" @click="checkData(1, 'InsertDate')" :class="{'d-none': filterData.Model_BasePage.OrderString.indexOf('Desc') === -1}"></i>
                       <i class="el-icon-caret-top" @click="checkData(1, 'InsertDate Desc')" :class="{'d-none': filterData.Model_BasePage.OrderString.indexOf('Desc') !== -1}"></i></th>
                    <th>姓名</th>
                    <th>學號</th>
                    <th>卡號</th>
                    <th>體溫紀錄°C
                      <i class="el-icon-caret-bottom" @click="checkData(1, 'Temperature Desc')" :class="{'d-none': filterData.Model_BasePage.OrderString.indexOf('Desc') !== -1}"></i>
                      <i class="el-icon-caret-top" @click="checkData(1, 'Temperature')" :class="{'d-none': filterData.Model_BasePage.OrderString.indexOf('Desc') === -1}"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in getData" :key="index">
                    <td>{{item.InsertDate}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.ID}}</td>
                    <td>{{item.Student_CardNo}}</td>
                    <td :class="{'font-danger': item.Temperature > 37.5}">{{item.Temperature}}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    <!-- 分頁 -->
    <div class="pagination">
      <div class="container">
        <el-pagination
          @current-change="checkData($event, 'InsertDate Desc')"
          layout="prev, pager, next"
          :page-size="25"
          :total="dataTatal">
        </el-pagination>
      </div>
    </div>
    <div class="btnarea">
          <el-popover
            placement="top-start"
            title="你好!"
            :width="200"
            trigger="hover"
            content="我是匯出，請點我。"
          >
            <template #reference>
                <el-button type="success" circle icon="el-icon-download" size="medium"></el-button>
            </template>
          </el-popover>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, reactive, ref } from 'vue'
import { ElLoading } from 'element-plus'

export default {
  name: 'Home',
  setup () {
    /** 查詢選單 */
    const demandSelect = reactive([
      {
        label: '請選擇',
        value: 0
      },
      {
        label: '姓名',
        value: 1
      },
      {
        label: '學號',
        value: 2
      },
      {
        label: '卡號',
        value: 3
      }
    ])
    /** 可登入帳號 */
    const okAccount = reactive(['xingan.demo01', 'xingan.demo02', 'xingan.demo03'])
    /** 確認登入(帳號) */
    const checkAccount = ref('')
    /** 日期 */
    const dateRange = ref(null)
    /** 體溫 */
    const temperature = ref('1')
    /** 日期排序 */
    const sortDate = ref(true)
    /** 體溫排序 */
    const sortTemp = ref(true)
    /** 查詢資料 */
    const getData = ref('')
    /** 資料總筆數 */
    const dataTatal = ref(50)
    /** 篩選資料條件 */
    const filterData = ref({
      Model_BasePage: {
        Model_Page: 1,
        /** 格式:  InsertDate Desc , InsertDate: 日期 Temperature: 體溫  Desc: 降冪 */
        OrderString: 'InsertDate Desc'
      },
      SearchModel: {
        SearchType: 0,
        SearchValue: '',
        StartDate: Date,
        EndDate: Date,
        TempType: computed(() => parseInt(temperature.value, 10))
      }
    })

    return {
      okAccount,
      checkAccount,
      sortDate,
      sortTemp,
      filterData,
      demandSelect,
      dateRange,
      temperature,
      getData,
      dataTatal
    }
  },
  created () {
    this.checkData(1, 'InsertDate Desc')
  },
  methods: {
    /** 確認資料
     * @param page 頁數
     * @param sort 格式:  InsertDate Desc , InsertDate: 日期 Temperature: 體溫  Desc: 降冪
     */
    checkData (page, sort) {
      this.checkAccount = sessionStorage.getItem('Account')
      if (this.okAccount.findIndex(account => account === this.checkAccount) === -1) {
        this.$router.push('/login')
      } else {
        // 開啟loading遮罩
        ElLoading.service({ fullscreen: true })
        this.filterData.Model_BasePage.Model_Page = page
        this.filterData.Model_BasePage.OrderString = sort
        if (this.dateRange !== null) {
          this.filterData.SearchModel.StartDate = new Date(this.dateRange[0].getTime() - this.dateRange[0].getTimezoneOffset() * 60 * 1000)
          this.filterData.SearchModel.EndDate = new Date(this.dateRange[1].getTime() - this.dateRange[1].getTimezoneOffset() * 60 * 1000)
        }
        fetch('http://localhost:52150/Whitley/Home', {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.filterData),
          method: 'POST'
        }).then(res => res.json())
          .then(data => {
            // 關閉loading遮罩
            ElLoading.service().close()
            this.getData = data.List_TemperatureLog
            this.dataTatal = data.Model_TotalItem
          })
          .catch(error => {
            // 關閉loading遮罩
            ElLoading.service().close()
            console.error('Error:', error)
          })
      }
    },
    /** 登出 */
    logOut () {
      sessionStorage.clear()
      this.$router.push('/login')
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
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
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
  table {
    text-align: center;
    font-size:  14px;
    th {
      padding: 1em 0;
      width: 20%;
    }
  }
  i {
    cursor: pointer;
    transition: .3s;
    &:hover {
      color: #409EFF;
    }
  }
  p {
    text-align: right;
    font-size: 13px;
    margin-top: 0;
  }
}

.btnarea {
  position: fixed;
  bottom: 10%;
  right: 1%;
  .el-button--medium.is-circle {
    width: 50px;
    height: 50px;
  }
  ::v-deep i {
    font-size: 20px;
  }
}

.temperaturearea {
  justify-content: space-between;
  align-items: baseline;
}

.pagination {
  text-align: center;
}

.font-danger {
  color:#F56C6C ;
}
</style>
