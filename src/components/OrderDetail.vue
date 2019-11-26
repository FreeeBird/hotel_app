<template>
    <div id="orderDetail">
      <mu-container class="container">
        <mu-row>
          <mu-appbar class="appBar" color="primary">
            <mu-icon value="account_balance_wallet" slot="left"></mu-icon>
            订单详情
          </mu-appbar>
        </mu-row>
        <mu-row>
          <mu-col>
            <mu-card class="card" raised>
              <mu-card-header :title="'订单号: '+  order.orderId " :sub-title="'预订方式：'+ order.orderType">
                <mu-avatar slot="avatar">
                  <mu-icon value="payment"></mu-icon>
                </mu-avatar>
              </mu-card-header>
              <mu-card-text>
                <mu-list>
                  <mu-list-item>
                    <mu-list-item-action><mu-icon value="hotel"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>房间类型： {{ order.roomType }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item v-show="order.orderStatus === 2">
                    <mu-list-item-action><mu-icon value="hotel"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>房间号码： 102</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-action><mu-icon value="today"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>预订日期:{{ order.orderDate | formatDate }}到{{ order.orderDate | addDate(order.orderDays) }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-action><mu-icon value="phone"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>预订天数： {{ order.orderDays }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-action><mu-icon value="fingerprint"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>入住人： {{ order.name }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-action><mu-icon value="phone"></mu-icon></mu-list-item-action>
                      <mu-list-item-title>联系手机： {{ order.phone }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item>
                    <mu-list-item-action><mu-icon value="today"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>创建时间:{{ dateFormat(order.createTime) }}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item >
                    <mu-list-item-action><mu-icon value="today"></mu-icon></mu-list-item-action>
                    <mu-list-item-title>更新时间:{{ dateFormat(order.updateTime) }}</mu-list-item-title>
                  </mu-list-item>
                </mu-list>
              </mu-card-text>
              <mu-card-actions class="actions">
                <mu-button style="width: 100%" flat>订单消费：￥ {{ order.orderCost }}</mu-button>

                <mu-button style="width: 49%" flat :color="order.orderStatus|getStatusColor">订单状态：{{ order.orderStatus|getOrderStatus }}</mu-button>

                <mu-button color="primary" @click="openPass = true" v-show="order.orderStatus === 0">立即付款</mu-button>
                <mu-button flat @click="goBack()">返回</mu-button>
                <mu-button color="error" @click="openCancel = true" v-show="order.orderStatus >= 0 && order.orderStatus <2">取消订单</mu-button>
              </mu-card-actions>
            </mu-card>
          </mu-col>
        </mu-row>
      </mu-container>
      <mu-dialog title="正在付款" width="360" :open.sync="openPass" :loading="payLoading">
        <p>订单总计：￥ {{ order.orderCost }}</p>
        <mu-text-field label="Password" v-model="password" label-float error-text="请输入支付密码" type="password" icon="fingerprint"></mu-text-field><br/>
        <mu-button slot="actions" flat color="error" @click="openPass = false">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="pay()">确认付款</mu-button>
      </mu-dialog>
      <mu-dialog title="取消订单" width="360" :open.sync="openCancel" :loading="cancelLoading">
        确认取消订单吗？
        <mu-button slot="actions" flat color="secondary" @click="openCancel = false">返回</mu-button>
        <mu-button slot="actions" flat color="primary" @click="cancelOrder()">确认取消</mu-button>
      </mu-dialog>
    </div>
</template>

<script>
  import {getOrderById, cancelOrder, payOrder} from "@/api/order";
  import Cookie from 'js-cookie'
  import { getUserInfo,userLogin } from "@/api/user";

  export default {
        name: "OrderDetail",
      data(){
          return{
            password: null,
            openPass: false,
            openCancel: false,
            orderId: null,
            orderStatus: 1,
            payLoading : false,
            cancelLoading: false,
            order: {
              orderId: null,
            },
            userInfo: {
              userId : null,
            },
          }
      },
      created: function () {
        this.fetchData()
      },
      methods:{
          goBack(){
            Cookie.remove("order_id")
            this.$router.back()
          },
          fetchData(){
            this.orderId = Cookie.get("order_id")
            if (this.orderId == null){
              this.$router.back()
              return
            }
            getOrderById(this.orderId).then(res => {
              this.order = res.data;
            }).catch(err => {
              this.$toast.error(err)
            })
            const userId = Cookie.get("user_id")
            getUserInfo().then(res => {
              this.userInfo = res.data;
            }).catch(err => {
              this.$toast.error(err)
            })
          },
        getStaColor(val){
          var status = ''
          switch (val) {
            case -1:
              status = 'error'
              break;
            case 0:
              status = 'warning'
              status = 'red'
              break;
            case 1:
              status = 'success'
              break;
            case 2:
              status = 'primary'
              break;
            case 3:
              status = 'info'
              break;
          }
          return status
        },
        dateFormat(val){
          var d = new Date(val)
          var year = d.getFullYear()
          var month = d.getMonth() + 1
          var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
          var hour = d.getHours();
          var minutes = d.getMinutes();
          var seconds = d.getSeconds();
          // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
          return year + '-' + month + '-' + day + '- ' + hour + ':' + minutes + ':' + seconds
        },
        pay(){
            this.payLoading = true
            const username = Cookie.get("username")
          payOrder(this.orderId,username,this.password).then(res => {
                if (res.code === 1000){
                  this.$toast.success("支付成功！")
                  this.openPass = false
                  this.$router.go(0)
                }else {
                  this.$toast.error("支付失败！")
                }
              }).catch(err => {
                this.$toast.error(err)
              })
          this.payLoading = false
        },
        cancelOrder(){
            this.cancelLoading = true
            cancelOrder(this.order.orderId).then(res => {
              if (res === 1){
                this.$toast.success("订单取消成功！")
                this.$router.go(0)
              } else {
                this.$toast.info("订单取消失败，请稍后再试！")
              }
              this.cancelLoading = false
            }).catch(err => {
              this.$toast.error("取消失败，原因："+ err.toString())
              this.cancelLoading = false
            })

        }
      }
    }
</script>

<style scoped>
  .container{
    padding: 10px;
  }
  .appBar{
    height: 40px;
    width: auto!important;
    border-radius: 35px;
    margin: 10px;
    color: #fff;
    padding: 10px;
  }
.card{
  padding: 10px;
  margin: 10px auto;
}
  .actions .mu-button{
    margin: 5px 0;
    width: 49%;
  }
</style>
