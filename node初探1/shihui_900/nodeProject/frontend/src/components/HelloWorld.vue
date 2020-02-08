<template>
  <div>
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
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.baseURL = 'http://www.shihui.com/';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      tableData: [],
      num: 0,
    }
  },
  created() {
    let self = this;
    // 表格
    axios.get('/tableData/getData1', {
      params: {
        reqTableData: [
          {
            name: 'shihui2',
            age: 11
          },
          {
            name: 'shihui3',
            age: 12
          }
        ]
      }
    })
    .then(function (response) {
      self.tableData = response.data.tableData;
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // post表格
    // axios.post('/tableData/getData2', {
    //   reqTableData: [
    //     {
    //       name: 'shihui2',
    //       age: 83
    //     },
    //     {
    //       name: 'shihui3',
    //       age: 54
    //     }
    //   ]
    // })
    // .then(function (response) {
    //   self.tableData = response.data.tableData;
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // 访问量
    axios.get('/tableData/session-test')
    .then(function (response) {
      self.num = response.data.totalNum;
    })
    .catch(function (error) {
      console.log(error);
    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
