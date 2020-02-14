<template>
  <div>
    <div class="demo1" v-if="tableData && tableData.length > 0">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
      </el-table>
      <p>页面共访问了{{num}}次</p>
    </div>
    <div class="demo2">
      <h1>{{corsMsg}}</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.baseURL = 'http://www.shihui.com/';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      tableData: [],
      num: 0,
      corsMsg: '',
    }
  },
  created() {
    // demo1
    this.getTableData();
    // this.postTableData();
    this.getViewNum();

    // demo2
    this.corsTest();
  },
  methods: {
    // get表格数据
    getTableData() {
      let self = this;
      axios.get('/tableData/getData1', {
        params: {
          // age: 88,
          name: '石'
        }
      })
      .then(function (response) {
        self.tableData = response.data.data;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // post表格数据
    postTableData() {
      let self = this;
      axios.post('/tableData/getData2', {
        reqTableData: [
          {
            name: 'shihui2',
            age: 83
          },
          {
            name: 'shihui3',
            age: 54
          }
        ]
      })
      .then(function (response) {
        self.tableData = response.data.tableData;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 访问量
    getViewNum() {
      // 访问量
      let self = this;
      axios.get('/tableData/session-test')
      .then(function (response) {
        self.num = response.data.totalNum;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 跨域请求
    corsTest() {
      // 请求跨域了的那个接口
      let self = this;
      axios.post('/cors')
      .then(function (response) {
        self.corsMsg = response.data.msg;
      })
      .catch(function (error) {
        console.log('dd', error);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
