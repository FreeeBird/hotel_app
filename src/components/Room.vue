<template>
    <div id="room">
      <mu-container class="roomPaper">
        <mu-row>
            <mu-appbar class="roomAppBar"  color="primary">
                <mu-icon value="whatshot" slot="left"></mu-icon>
              热门房型
            </mu-appbar>
        </mu-row>
        <mu-row gutter>
          <mu-col xl="3" lg="4" md="6" sm="12" span="12"  v-for="rt in roomTypeList" :key="rt.typeId">
            <mu-card style=" margin: 10px auto;"  raised>
              <!--<mu-card-header title="Myron Avatar" sub-title="sub title">-->
              <!--</mu-card-header>-->
              <mu-card-media :title="rt.roomType" :sub-title="rt.remark">
              <!--<mu-card-media>-->
                <img src="../assets/imgs/room.jpg">
              </mu-card-media>
              <!--<mu-card-title :title="rt.roomType" :sub-title="rt.remark"></mu-card-title>-->
              <mu-card-text>
                <mu-list id="roomDetail">
                  <mu-list-item>
                    <span>
                      <mu-icon value="fullscreen" slot="left"></mu-icon>
                      房间面积:{{ rt.area }}m²
                    </span>
                    <span>
                      <mu-icon left value="web_asset"></mu-icon>
                      是否有窗:{{ rt.window | hasWindow }}
                    </span>
                  </mu-list-item>
                  <mu-divider></mu-divider>
                  <mu-list-item >
                    <span>
                      <mu-icon left value="hotel"></mu-icon>
                      床位数量：{{ rt.bedNum }} 张
                    </span>
                    <span>

                      床铺大小：{{ rt.bedSize }}
                    </span>
                  </mu-list-item>
                  <mu-divider></mu-divider>
                  <mu-list-item :ripple="true">
                    <span>
                      <mu-icon left value="local_atm"></mu-icon>
                      价格：￥{{ rt.price }}
                    </span>
                    <span>
                    <mu-icon left value="arrow_downward"></mu-icon>
                      折扣：{{ rt.discount }}%
                  </span>
                  </mu-list-item>
                  <mu-list-item :ripple="true">
                    <span >
                      <mu-icon left value="filter_tilt_shift" ></mu-icon>
                      剩余空房：{{ rt.rest }}
                    </span>
                    <mu-button color="primary" :disabled="rt.rest<=0" style="width: 50%" @click="book(rt.typeId)">立即预订</mu-button>
                  </mu-list-item>
                </mu-list>
                <!--<mu-card-actions>-->
                  <!--<mu-button color="teal">剩余：30</mu-button>-->
                  <!--<mu-button color="greenA700" @click="book(rt.typeId)">立即预订</mu-button>-->
                <!--</mu-card-actions>-->

              </mu-card-text>
            </mu-card>
          </mu-col>
        </mu-row>

      </mu-container>
    </div>
</template>

<script>
  import { getAllRoomType } from '@/api/roomType'
    export default {
        name: "Room",
      data(){
          return{
            roomTypeList: null,
          }
      },
      created: function(){
          this.fetchData()
      },
      methods:{
          navigateTo(val){
            this.$toast.message("clicked!")
          },
          fetchData(){
            getAllRoomType().then(res => {
              this.roomTypeList = res.data;
            })
          },
        book(typeId){
          this.$router.push({
            path: '/makeOrder',
            name: 'MakeOrder',
            params: {
              typeId: typeId
            }
          })
        }
      }
    }
</script>

<style scoped>
  #room{
    /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
  }
  .mu-item,.mu-card-text{
    padding: 0;
  }
  .roomAppBar{
    /*position: -webkit-sticky;*/
    /*position: sticky;*/
    /*top: 0;*/
    /*z-index: 102;*/
    height: 40px;
    width: auto!important;
    border-radius: 30px;
    /*position: -webkit-sticky;*/
    /*position: sticky;*/
    /*top: 0;*/
    margin: 10px;
    /*background-color: #e91e63;*/
    color: #fff;
    padding: 10px;
  }
.roomPaper{
  margin: 20px auto 0;
  padding: 20px 0;
}
  #roomDetail span{
    flex: auto;
  }
  #roomDetail .mu-icon{
    vertical-align: bottom;
  }
  .mu-card-media img{
    height: inherit;
  }
</style>
