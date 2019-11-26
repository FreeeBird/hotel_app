<template>
    <div id="makeOrder">
      <mu-container class="container">
        <mu-row>
          <mu-appbar class="appBar" color="primary">
            <mu-icon value="inbox" slot="left"></mu-icon>
            <span>正在预订</span>
          </mu-appbar>
        </mu-row>
        <mu-card raised>
        <mu-card-title :title="roomType.roomType" :sub-title="roomType.remark">
        </mu-card-title>
        <mu-card-text>
          <mu-form :model="form" class="mu-demo-form">
            <mu-form-item prop="name" :rules="nameRules" icon="person"  label="入住人" label-float>
              <mu-text-field prop="name" :rules="nameRules" v-model="form.name" ></mu-text-field>
            </mu-form-item>
            <mu-form-item icon="phone"
              :rules="phoneRules"
              prop="phone" label="联系手机" label-float>
              <mu-text-field v-model="form.phone"  prop="phone"></mu-text-field>
            </mu-form-item>
              <mu-date-input icon="today" label="入住日期" :min-date="minDate" v-model="form.orderDate" format="YYYY 年 MM 月 DD 日入住" label-float full-width></mu-date-input>
            <mu-date-input icon="today" :disabled="form.orderDate == null" label="离店日期" :min-date="form.orderDate" v-model="leaveDate" format="YYYY 年 MM 月 DD 日离店" label-float full-width></mu-date-input>
            <mu-form-item icon="access_time">
              <mu-button flat color="primary">共{{ form.orderDays }}晚</mu-button>
            </mu-form-item>
          </mu-form>
          <mu-button color="primary" style="width: 100%" flat="">订单消费总共 ￥ {{ form.orderCost }}</mu-button>
        </mu-card-text>
        <mu-card-actions>
          <mu-button color="secondary" style="width: 49%" @click="goBack">取消</mu-button>
          <!--<mu-button>Action 1</mu-button>-->
          <mu-button color="primary"  style="width: 49%" @click="submitOrder">提交订单</mu-button>
        </mu-card-actions>
        </mu-card>
      </mu-container>
    </div>
</template>

<script>
  import { getRoomTypeById } from "@/api/roomType";
  import { addOrder } from "@/api/order";
  import Cookie from 'js-cookie'
  export default {
        name: "MakeOrder",
      data(){
          return{
            nameRules: [
              { validate: (val) => !!val, message: '必须填写入住人'},
            ],
            phoneRules: [
              { validate: (val) => !!val, message: '必须填写联系手机号'},
            ],
            minDate: new Date(),
            minDate2: null,
            leaveDate: null,
            roomTypeId: null,
            roomType: {
              roomType: null,

            },
            form: {
              orderTypeId: 2,
              orderType: '官网预订',
              userId: Cookie.get("user_id"),
              name: null,
              phone: null,
              roomTypeId: null,
              roomType: null,
              orderDate: null,
              orderDays: 0,
              orderStatus: 0,
              orderCost: 0,
            }
          }
      },
      created: function(){
        this.fetchData()
      },
      watch:{
        leaveDate: function () {
          var date1 = new Date(this.form.orderDate);
          var date2 = new Date(this.leaveDate)
          this.form.orderDays = Math.floor(Math.abs(date1 - date2) / 1000 / 60 / 60 /24 + 0.5);
          this.form.orderCost = this.form.orderDays * this.roomType.price
        }
      },
      methods:{
          fetchData(){
            this.roomTypeId = this.$route.params.typeId
            this.form.roomTypeId = this.roomTypeId
            if (this.roomTypeId == null){
              this.$router.back()
              return
            }
            getRoomTypeById(this.roomTypeId).then(res => {
              this.roomType = res.data;
              this.form.roomType = this.roomType.roomType
            })
          },
        goBack(){
          this.$router.back()
        },
        submitOrder(){
            for (var item in this.form){
              if (this.form[item] == null) {
                this.$toast.warning("所填信息不能有空！")
                return
              }
            }
            // this.form.orderDate = this.form.orderDate.toString()
            addOrder(this.form).then(res => {
              const re = res;
              if (re.code === 1000){
                this.$toast.success(re.message)
                this.$router.push('/order')
              }else {
                this.$toast.success(re.message)
              }
            }).catch(err => {
              this.$toast.error(err.toString())
            })
        }
      }
    }
</script>

<style scoped>
  .appBar{
    height: 40px;
    /*width: 100%;*/
    border-radius: 15px;
    margin: 10px;
    color: #fff;
    padding: 10px;
  }
  .container{
    padding: 10px;
  }
  .mu-demo-form {
    width: 100%;
    /*max-width: 460px;*/
  }
</style>
