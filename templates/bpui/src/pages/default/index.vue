<template>
  <div>
    hello world!
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
  }

</script>


<style lang="scss" scoped>

</style>
