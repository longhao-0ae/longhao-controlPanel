<template>
    <div class="box">
      <div style="position:relative;display: flex;width:100%;vertical-align:middle;justify-content: space-between;">
        <div style="display:flex;">
          <it-icon style="font-size:34px;margin-block-start: 0.75em;margin-block-end: 0.67em;" name="battery_std" />
          <h1 class="titletext">電池残量</h1>
        </div>
        <it-button type="primary" v-on:click="() => {get_battery()}" round style="height:34px;width:60px;margin-block-start: 1.85em;margin-block-end: 0.67em;">
          <it-icon name="refresh" style="font-size:30px;" outlined/>
        </it-button>
      </div>
      <div style="position:relative;display: flex;width:100%;">
        <it-icon name="directions_boat" style="margin-top:3px;" outlined/><p class="desctext">本体</p>
        <it-icon name="bolt" v-if="battery.boat.charging" style="margin-top:3px;" outlined/>
      </div>
            <div style="position:relative;display: flex;width:100%;">
        <it-icon name="schedule" style="margin-top:3px;" outlined/><p class="desctext">最終更新: {{battery.boat.last_time}}</p>
      </div>
      <div style="width:100%; height:50px;"></div>
       <div style="width:100%;padding:0px 20px; text-align: start;">
        <it-progressbar style="width:calc(100% - 40px);" :height="10" :progress="battery.boat.level"/>
      </div>
      <div style="position:relative;display: flex;width:100%;">
        <it-icon name="smartphone" style="margin-top:3px;" outlined/><p class="desctext">スマホ</p>
        <it-icon name="bolt" v-if="battery.phone.charging" style="margin-top:3px;" outlined/>
      </div>
      <div style="position:relative;display: flex;width:100%;">
        <it-icon name="schedule" style="margin-top:3px;" outlined/><p class="desctext">最終更新: {{battery.phone.last_time}}</p>
      </div>
      
      <div style="width:100%; height:50px;"></div>
      <div style="width:100%;padding:0px 20px; text-align: start;">
        <it-progressbar style="width:calc(100% - 40px);" :height="10" :progress="battery['phone']['level']" />
      </div>
    </div>
</template>
    
<script>
import axios from 'axios';
import { dateTimetoString } from '../usedateTimetoString';
//import { redis } from 'redis';
//import { sys } from 'sys';


export default {
  name: 'BatteryCard',
  components: {
  },
  props: {},
  data() {
    return {
      battery:{
        boat:{
          level:0,
          last_time:dateTimetoString(new Date("1999-12-31T23:59:59")),
          charging:false,
        },
        phone:{
          level:0,
          last_time:dateTimetoString(new Date("1999-12-31T23:59:59")),
          charging:false,
        }
      }
    }
  },
  setup () {
  /*  const onChange = (val) => {
      console.log(val);
    }*/
  },
methods: {
  async get_battery(){
    const res = await axios.get('http://localhost/api/battery');
    const data = JSON.parse(res.data.value.slice(-1)[0]);
    console.log(data);
    this.battery.phone.last_time = new Date(data.phone.last_time);
    this.battery.phone.charging = (data.phone.charging == "True") ? true : false;
    this.battery.boat.charging = (data.boat.charging == "True") ? true : false;
    this.battery.phone.level = (Number(data.phone.level));
    this.battery.boat.last_time = dateTimetoString(new Date(data.boat.last_time));
    this.battery.phone.last_time = dateTimetoString(new Date(data.phone.last_time));
    this.battery.boat.level = (Number(data.boat.level));
  },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/card.scss';
</style>
