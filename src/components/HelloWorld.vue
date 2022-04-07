<template>
  <div style="">
    <Map />
    <div class="grid">
      <BatteryCard />
      <ManualOperationCard />
      <ConnectionCard />
    </div>
  <div class="bottomBar">
  </div>
  </div>
</template>

<script>
import Map from './Map';
import BatteryCard from './BatteryCard';
import ManualOperationCard from './ManualOperationCard';
import ConnectionCard from './ConnectionCard';
//import { redis } from 'redis';
//import { sys } from 'sys';


export default {
  name: 'HelloWorld',
  components: {
    Map,
    BatteryCard,
    ManualOperationCard,
    ConnectionCard
  },
  props: {
    msg: String,
  },
  data() {
    return {
    }
  },
  setup () {
  /*  const onChange = (val) => {
      console.log(val);
    }*/

  },
  watch: {},
methods: {}
}
</script>

<style scoped>
.bottomBar{
  position: fixed;
  bottom: 1.5%;
  left:0;
  right:0;
  margin: 0 auto;
  width: 97%;
  height: 60px;
  border-radius: 50px;
  background: linear-gradient(to right, #3051ff 10%, #2c3e50 69%);
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.62) 0px 2px 16px 0px;
}

.grid {
  margin:20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
}
</style>
