<template>
    <div id="orderDetail">
      <mu-container class="container">
        <mu-row>
          <mu-appbar class="appBar">
            <mu-icon value="account_balance_wallet" slot="left"></mu-icon>
            订单详情
          </mu-appbar>
        </mu-row>
        <mu-row>
          <mu-col>
            <mu-card class="card" raised>
              <mu-card-header title="Myron Avatar" sub-title="sub title">
                <mu-avatar slot="avatar">
                  <mu-icon value="money"></mu-icon>
                </mu-avatar>
              </mu-card-header>
              <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
              <mu-card-text>
                散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。

              </mu-card-text>
              <mu-card-actions>
                <mu-button flat>Action 1</mu-button>
                <mu-button flat>Action 2</mu-button>
              </mu-card-actions>
            </mu-card>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
</template>

<script>
  import { getOrderById } from "@/api/order";

  export default {
        name: "OrderDetail",
      data(){
          return{
            orderId: null,
            order: null,
          }
      },
      created: function () {
        this.fetchData()
      },
      methods:{
          fetchData(){
            this.orderId = this.$route.params.orderId
            getOrderById(this.orderId).then(res => {
              this.order = res;
            }).catch(err => {
              this.$toast.error(err)
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
    background-color: #e91e63;
    color: #fff;
    padding: 10px;
  }
.card{
  width: 100%;
  margin: 0 auto;
}
</style>
