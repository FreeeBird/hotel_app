<template>
  <div id="order">
    <mu-container class="orderContainer">
      <mu-row>
        <mu-appbar class="orderAppBar">
          <mu-icon value="account_balance_wallet" slot="left"></mu-icon>
          我的订单
        </mu-appbar>
      </mu-row>
      <mu-list textline="three-line" class="orderList">
        <mu-row gutter>
          <mu-col xl="12" lg="12" md="12" sm="12" span="12">
            <mu-list-item avatar button :ripple="true" class="orderItem" v-for="order in orderList" @click="toDetail(order.orderId)" :key="order.orderId">
              <mu-list-item-action>
                <!--<mu-avatar text-color="primary">-->
                  <mu-icon value="payment" color="secondary"></mu-icon>
                <!--</mu-avatar>-->
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title style="color: black;font-size: 1.2em;font-weight: bolder">{{ order.roomType }}  <mu-badge :content="order.orderType" color="teal"></mu-badge></mu-list-item-title>
                <mu-list-item-sub-title>预订日期：{{ order.orderDate | formatDate }} 到 {{ order.orderDate | addDate(order.orderDays) }}</mu-list-item-sub-title>
                <mu-list-item-sub-title>订单消费：￥ {{ order.orderCost }}</mu-list-item-sub-title>
              </mu-list-item-content>
              <mu-list-item-action>
                <mu-badge :content="order.orderStatus|getOrderStatus" :color="order.orderStatus|getStatusColor"></mu-badge>
                <mu-button small round color="green">查看详情</mu-button>
              </mu-list-item-action>
            </mu-list-item>
          </mu-col>
        </mu-row>
      </mu-list>
    </mu-container>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import { getOrderByUserId } from "@/api/order";
  export default {
        name: "order",
    data(){
          return{
            userId : Cookie.get("user_id"),
            open: false,
            trigger: null,
            orderList: null,
          }
      },
      created: function () {
          this.fetchData()
      },
      methods:{
          navigateTo(val){
            this.$router.push(val)
          },
        toDetail(id){
            this.$router.push({
              path: '/orderDetail',
              name: 'OrderDetail',
              params: {
                orderId : id
              }
            })
        },
          fetchData(){
            getOrderByUserId(this.userId).then(res => {
              this.orderList = res;
            })
          },
        test(){
            this.$toast.message("test")
        }
      }
    }
</script>

<style scoped>
  .orderAppBar{
    height: 40px;
    width: auto!important;
    border-radius: 35px;
    margin: 10px;
    background-color: #e91e63;
    color: #fff;
    padding: 10px;
  }
  .orderContainer{
    padding: 10px;
  }
  .orderList{
    padding: 16px 8px;
  }
  .orderItem{
    border-radius: 5px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    margin: 15px 2px;
  }

</style>
