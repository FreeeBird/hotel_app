<template>
    <div id="room">
      <mu-container class="roomPaper">
        <mu-row>
            <mu-appbar class="roomAppBar" style="width: 100%;">
                <mu-icon value="whatshot" slot="left"></mu-icon>
              热门房型
            </mu-appbar>
        </mu-row>
        <mu-row  gutter>
          <mu-col xl="4" lg="4" md="6" sm="12" span="12"  v-for="rt in roomTypeList" :key="rt.typeId">
            <mu-card style="width: 100%; margin: 10px auto;"  raised>
              <mu-card-media :title="rt.roomType" :sub-title="rt.remark">
                <img src="../assets/imgs/room.jpg">
              </mu-card-media>
              <mu-card-text>
                <mu-list class="roomDetail">
                  <mu-list-item>
                    <mu-button flat color="">
                      <mu-icon left value="fullscreen"></mu-icon>
                      房间面积:{{ rt.area }}m²
                    </mu-button>
                    <mu-button flat color="">
                      <mu-icon left value="web_asset"></mu-icon>
                      是否有窗:{{ rt.window | hasWindow }}
                    </mu-button>
                  </mu-list-item>
                  <mu-divider></mu-divider>
                  <mu-list-item >
                    <mu-button flat color="" style="width: 100%">
                      <mu-icon left value="hotel"></mu-icon>床位：{{ rt.bedNum }} 张
                      <span>&nbsp;&nbsp;</span> 大 小：{{ rt.bedSize }}
                    </mu-button>
                  </mu-list-item>
                  <mu-divider></mu-divider>
                  <mu-list-item :ripple="true">
                    <mu-button flat color="">
                      <mu-icon left value="local_atm"></mu-icon>价格：￥{{ rt.price }}
                    </mu-button>
                    &nbsp;<mu-button flat color="">
                    <mu-icon left value="arrow_downward"></mu-icon>折扣： {{ rt.discount }}%
                  </mu-button>
                  </mu-list-item>
                  <mu-list-item :ripple="true">
                    <mu-button flat>
                      <mu-icon left value="filter_tilt_shift"></mu-icon>
                      剩余空房：30</mu-button>
                    <mu-button color="greenA700" @click="book(rt.typeId)">立即预订</mu-button>
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
              this.roomTypeList = res;
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
    height: 40px;
    width: auto!important;
    border-radius: 35px;
    margin: 10px;
    background-color: #e91e63;
    color: #fff;
  }
.roomPaper{
  margin: 20px auto 0;
  padding: 10px;
}
  .roomDetail .mu-button {
    width: 50%;
  }
</style>
