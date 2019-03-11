<template>
  <div>
    <Table ref="selection" :columns="columns4" :data="data1">

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "订单id",
          key: "name",
          width: 160
        },
        {
          title: "会员名称",
          key: "age",
          width: 160
        },
        {
          title: "地址",
          key: "address",
          width: 160
        },
        {
          title: "快递",
          key: "address1",
          width: 260
        },
        {
          title: "状态",
          key: "address2",
          width: 260
        },
        {
          title: "操作",
          width: 160,
          fixed: "right",
          align: "center",
          slot: 'action',
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          address1: "New York No. 1 Lake Park",
          address2: "New York No. 1 Lake Park",
          
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
          address1: "New York No. 1 Lake Park",
          address2: "New York No. 1 Lake Park",
          
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          address1: "New York No. 1 Lake Park",
          address2: "New York No. 1 Lake Park",
          
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          address1: "New York No. 1 Lake Park",
          address2: "New York No. 1 Lake Park",
          
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>