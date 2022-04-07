<template>
   <div class="box">
        <div style="position:relative;display: flex;width:100%;">
        <it-icon style="font-size:30px;margin-block-start: 0.92em;margin-block-end: 0.67em;" name="pan_tool" />
        <h1 class="titletext" style="margin-left:8px;">手動制御</h1>
      </div>
        <it-slider v-model="motor_rpm_slider" numbers :min="1000" :max="2000"/>
        <div style="width:100%; height:40px;"></div>
        <div style="width:50%;text-align:center; margin-left:25%;">
        <it-number-input v-model="motor_rpm_slider" :min="1000" :max="2000"/>
        <it-button-group>
          <it-tooltip content="1000" placement="top">
          <it-button @click="motor_rpm_slider=1000" size="big" icon="stop_circle" />
          </it-tooltip>
          <it-tooltip content="1032" placement="top">
          <it-button @click="motor_rpm_slider=1032" size="big" icon="slow_motion_video" />
          </it-tooltip>
          <it-tooltip content="1500" placement="top">
          <it-button @click="motor_rpm_slider=1500" size="big" icon="play_arrow" />
          </it-tooltip>
          <it-tooltip content="2000" placement="top">
          <it-button @click="motor_rpm_slider=2000" size="big" icon="air" />
          </it-tooltip>
        </it-button-group>
        </div>
  </div>
</template>
    
<script>
import axios from 'axios';
//import { redis } from 'redis';
//import { sys } from 'sys';


export default {
  name: 'ManualOperationCard',
  components: {
  },
  props: {},
  data() {
    return {
      motor_rpm_slider: 1000,
    }
  },
  setup () {
  /*  const onChange = (val) => {
      console.log(val);
    }*/
  },
  watch: {
        'motor_rpm_slider': async function(val, oldVal){
          console.log("--",oldVal,"->",val,"--");
        if(val != oldVal){
          const res = await axios.get('http://localhost/api/motor_rpm');
          const ServeroldVal = res.data.value;
          if(ServeroldVal == oldVal){
            axios.post('http://localhost/api/motor_rpm', {value: val}).then(function (response) {
              if(response.data.status == "success"){
                console.log("success!");
             //   this.motor_rpm_slider = val;
              } else {
                console.log("error!");
              //   this.motor_rpm_slider = oldVal;
              }
          /*     $Notification({
                type: "success",
                title: '値が更新されました',
                text:
                  '新しい値:' + val.toString()
              })*/
            }).catch(function (error) {
        /*       $Notification({
                type:"danger",
                title: '送信に失敗しました',
                text:
                  'error: ' + error
              })*/
              console.log(error);
          //    this.motor_rpm_slider = ServeroldVal;
            });
          } else {
           /*    $Notification({
                type:"warning",
                title: 'リモートとローカルの値が一致しませんでした',
                text:
                  'リモートの値に変更しました。データは送信されていません。新しい値:' + ServeroldVal.toString()
              })*/
          //    this.motor_rpm_slider = ServeroldVal;
          }
        }

    }
},
methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/card.scss';

.it-slider{
  text-align: start;
}
</style>
