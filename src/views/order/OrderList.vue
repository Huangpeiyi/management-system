<template>
  <div>
    <!-- 操作栏 -->
    <div class="handleBox">
      <Input search enter-button placeholder @on-search="handleSearch" v-model="searchValue"/>
      <Select v-model="orderInfo.orderstatus" style="width:200px" @on-change="getStatus">
        <Option
          v-for="item in statusList"
          :value="item.status"
          :key="item.status"
        >{{ item.statusName }}</Option>
      </Select>
    </div>

    <!-- 表格 -->
    <Table ref="selection" :columns="OrderTable" :data="OrderData">
      <template slot-scope="{ row, index }" slot="action">
        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="ViewFile = true">查看</Button> -->
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="handleViewFile(row.id)"
        >查看</Button>
        <!-- <Button type="warning" size="small" @click="editValue = true">编辑</Button> -->
        <Button type="warning" size="small" @click="handleEditValue(row.id)">编辑</Button>
      </template>
    </Table>

    <!-- 查看信息 -->
    <Drawer :closable="false" width="640" v-model="ViewFile">
      <p :style="pStyle">订单号：{{orderDetails.order_no}}</p>
      <Divider/>
      <p :style="pStyle">会员信息</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="24">会员名称: {{orderDetails.user_name}}</Col>
        </Row>
      </div>
      <Divider/>
      <p :style="pStyle">支付方式</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">支付方式: {{orderDetails.paymentTitle}}</Col>
          <Col span="12">支付手续费:{{orderDetails.payment_fee}}</Col>
        </Row>
      </div>
      <Divider/>
      <p :style="pStyle">物流信息</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">物流单号: {{orderDetails.express_no}}</Col>
          <Col span="12">物流手续费: {{orderDetails.express_fee}}</Col>
        </Row>
        <Row>
          <Col span="12">发货时间: {{orderDetails.express_time}}</Col>
          <Col span="12">物流方式: {{orderDetails.expressTitle}}</Col>
        </Row>
        <Row>
          <Col span="12">收货人: {{orderDetails.accept_name}}</Col>
          <Col span="12">收货人邮箱: {{orderDetails.email}}</Col>
        </Row>
        <Row>
          <Col span="12">收货人手机: {{orderDetails.mobile}}</Col>
          <Col span="12">收货人电话: {{orderDetails.telphone}}</Col>
        </Row>
        <Row>
          <Col span="24">邮编: {{orderDetails.post_code}}</Col>
        </Row>
        <Row>
          <Col span="24">收货地址: {{orderDetails.area}}</Col>
        </Row>
      </div>
      <Divider/>
      <p :style="pStyle">订单状态</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">订单总金额: {{orderDetails.order_amount}}</Col>
          <Col span="12">商品总金额: {{orderDetails.real_amount}}</Col>
        </Row>
        <Row>
          <Col span="12">订单状态: {{orderDetails.orderstatus}}</Col>
        </Row>
        <Row>
          <Col span="24">下单时间: {{orderDetails.add_time}}</Col>
        </Row>
        <Row>
          <Col span="24">订单完成（签收）时间:{{orderDetails.complete_time}}</Col>
        </Row>
        <Row>
          <Col span="24">订单备注:{{orderDetails.message}}</Col>
        </Row>
      </div>
      <Divider/>
    </Drawer>

    <!-- 编辑信息 -->
    <Drawer title="编辑数据" v-model="editValue" width="720" :mask-closable="false" :styles="styles">
      <p :style="pStyle">订单号：{{orderDetails.order_no}}</p>
      <Divider/>
      <Form :model="formData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="快递单号" label-position="top">
              <Input placeholder v-model="formData.express_no"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="快递费用" label-position="top">
              <Input placeholder v-model="formData.express_fee"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="收件人" label-position="top">
              <Input placeholder v-model="formData.accept_name"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="收件人电话" label-position="top">
              <Input placeholder v-model="formData.telphone"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="收件人手机" label-position="top">
              <Input placeholder v-model="formData.mobile"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="收件人邮箱" label-position="top">
              <Input placeholder v-model="formData.email"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="订单总金额" label-position="top">
              <Input placeholder v-model="formData.order_amount"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="订单状态" label-position="top">
              <Input placeholder v-model="formData.orderstatus"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="24">
            <FormItem label="收件人地址" label-position="top">
              <Input placeholder v-model="formData.address"/>
            </FormItem>
          </Col>
        </Row>

        <FormItem label="订单备注" label-position="top">
          <Input type="textarea" v-model="formData.message" :rows="4" placeholder/>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="editValue = false">取消</Button>
        <!-- <Button type="primary" @click="editValue = false">提交</Button> -->
        <Button type="primary" @click="submitEdit()">提交</Button>
      </div>
    </Drawer>

    <!-- 分页 -->
    <div class="pageBox">
      <Page
        :total="orderInfo.totalcount"
        show-elevator
        show-sizer
        show-total
        :page-size-opts="[2,4,6,8]"
        :page-size="orderInfo.pageSize"
        @on-page-size-change="onPageSizeChange"
        @on-change="changePageIndex"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      OrderTable: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "订单id",
          key: "id",
          width: 240
        },
        {
          title: "会员名称",
          key: "user_name",
          width: 200
        },
        {
          title: "地址",
          key: "area_address",
          width: 340
        },
        {
          title: "快递",
          key: "expressTitle",
          width: 240
        },
        {
          title: "状态",
          key: "statusName",
          width: 240
        },
        {
          title: "操作",
          width: 200,
          fixed: "right",
          align: "center",
          slot: "action"
        }
      ],
      OrderData: [
        {
          id: "",
          user_name: "",
          area_address: "",
          expressTitle: "",
          statusName: ""
        }
      ],
      statusList: [
        {
          status: 0,
          statusName: "全部"
        },
        {
          status: 1,
          statusName: "待付款"
        },
        {
          status: 2,
          statusName: "已付款待发货"
        },
        {
          status: 3,
          statusName: "已发货"
        },
        {
          status: 4,
          statusName: "已签收"
        },
        {
          status: 5,
          statusName: "已取消"
        }
      ],
      orderInfo: {
        orderstatus: "",
        vipname: "",
        pageIndex: 1,
        pageSize: 2,
        totalcount: 0
      },
      orderDetails: {},
      //搜索
      searchValue: "",
      //查看消息
      ViewFile: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "24px",
        display: "block",
        marginBottom: "16px"
      },
      //编辑
      editValue: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        id: 0,
        express_no: "",
        express_fee: 0,
        accept_name: "",
        telphone: "",
        mobile: "",
        email: "",
        area: "",
        address: "",
        message: "",
        order_amount: 0,
        orderstatus: ""
      }
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    remove(index) {
      this.data6.splice(index, 1);
    },
    //请求商订单数据
    getOrderList() {
      this.$axios({
        method: "get",
        url: `/admin/order/getorderlist`,
        params: {
          pageIndex: this.orderInfo.pageIndex,
          pageSize: this.orderInfo.pageSize,
          orderstatus: this.orderInfo.orderstatus,
          vipname: this.orderInfo.vipname
        }
      }).then(res => {
        console.log(res.data);
        const { message, totalcount, pageIndex, pageSize } = res.data;
        //表格的数据
        this.OrderData = message;
        this.OrderData.forEach(v => {
          v.area_address = `${v.area}${v.address}`;
        });
        //console.log(this.OrderData)
        //获取总条数
        //console.log(totalcount);
        this.orderInfo.totalcount = totalcount;
        //this.orderInfo.id=id;
      });
    },
    //改变页数
    onPageSizeChange(res) {
      //console.log(res);
      this.orderInfo.pageSize = res;
      this.getOrderList();
    },
    //改变页码
    changePageIndex(res) {
      //console.log(res);
      this.orderInfo.pageIndex = res;
      this.getOrderList();
    },
    getStatus(res) {
      console.log(res);
      this.orderInfo.orderstatus = res;
      this.getOrderList();
    },
    //搜索
    handleSearch(value) {
      this.orderInfo.vipname = value;
      this.getOrderList();
    },
    //根据订单id获取订单明细
    handleViewFile(id) {
      this.ViewFile = true;
      //console.log(id);
      //根据订单id获取订单明细
      this.$axios({
        method: "get",
        url: `/admin/order/getorderdetial/${id}`
      }).then(res => {
        console.log(res);
        const { orderinfo } = res.data.message;
        console.log(orderinfo);
        this.orderDetails = orderinfo;
      });
    },
    //根据id编辑信息
    handleEditValue(id) {
      this.editValue = true;
      //根据订单id获取订单明细
      this.$axios({
        method: "get",
        url: `/admin/order/getorderdetial/${id}`
      }).then(res => {
        console.log(res);
        const { orderinfo } = res.data.message;
        console.log(orderinfo);
        this.formData = orderinfo;
      });
    },
    //提交编辑信息
    submitEdit() {
    
      this.$axios({
        method: "post",
        url: `/admin/order/updateorder`,
        //处理跨域，指示是否跨站点访问控制请求
        withCredentials: true,
        data: {
          orderinfo: this.formData
        }
      }).then(res => {
        // console.log(res);
        const { status } = res.data;
        if (status == 0) {
          this.$Message.success('数据编辑成功');
          setTimeout(() => {
            this.editValue = false;
            this.getOrderList();
          }, 1000);
        }
        if (status == 1) {
          this.$Message.error('异常信息');
          setTimeout(() => {
            this.editValue = false;
            this.getOrderList();
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.pageBox {
  margin-top: 20px;
}
.handleBox {
  padding: 10px;
  height: 60px;
  .ivu-input-wrapper {
    float: right;
    margin-left: 10px;
    width: 200px;
  }
  .ivu-select {
    float: right;
  }
}
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
