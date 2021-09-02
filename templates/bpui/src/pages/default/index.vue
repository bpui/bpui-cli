<template>
  <div>
    hello world!

    <p @click="onClick">
      to layout2
    </p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component,
    Prop,
    Watch,
    Provide,
    Emit,
  } from 'vue-property-decorator';
  import {
    State,
    Mutation
  } from 'vuex-class';
  import bpui from 'bpui.js';

  @Component({
    components: {}
  })
  export default class extends Vue {
    bpLibs = bpui.libs;

    //
    // event.
    // @Emit()
    // demoEvent(type: string) { }

    //
    // state.
    // @State(state=>state.demo) demo:DEMO_TYPE;

    //
    // Prop
    // @Prop({ type: number })
    // demo: number = 1

    //
    // computed.
    // get demo() { return xxxx; }

    //
    // watch.
    // @Watch('child')
    // onChildChanged(val: string, oldVal: string) { }

    //
    // lifecycle hook.
    constructor() {
      super();
    }

    created() {
      console.log('created: index');
    }
    mounted() {
      console.log('mounted: index');
      this.$timer.setTimeout(()=>console.log(111), 10000);
    }

    beforeDestroy() {
      console.log('beforeDestroy: index');
      console.log('');
    }

    viewAppear(popData: any) {
      console.log('viewAppear: index ' + popData);
    }

    viewDisappear() {
      console.log('viewDisappear: index');
    }

    onClick() {
      this.$router.push('/layout2');
    }
  }

</script>


<style lang="scss" scoped>

</style>
