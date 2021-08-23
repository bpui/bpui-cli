
<template>
  <component
    :is="layout"
    id="app"
  ></component>
</template>

<script lang="ts">
import { Component, Vue, Watch, Provide } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import bpui from 'bpui.js';
import layouts from './layouts';

@Component({
  components: {
    bpNavbarView: bpui.bpNavbarView,
  }
})
export default class extends Vue {
  //
  // data.
  @Provide() layout: any = null;

  @Watch('$route')
  onRouteChange(newRoute: bp.Location, oldRoute?: bp.Location) {
    this.layout = bpui.getLayout(layouts, newRoute, oldRoute);
  }

  mounted() {
    this.onRouteChange(this.$route);
  }
}
</script>


<style lang="scss">
@import '~@/bpui/style';

</style>