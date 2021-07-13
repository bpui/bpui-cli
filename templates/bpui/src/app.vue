
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
    let newRoutePath = newRoute.path;
    if (newRoutePath[0] == '/') newRoutePath = newRoutePath.substring(1);
    for (let p in layouts) {
      if (p[0] == '/') p = p.substring(1);
      if (newRoutePath == p || newRoutePath.indexOf(p + '/') >= 0) {
        this.layout = (layouts as any)[p];
        return;
      }
    }

    // 默认值.
    this.layout = (layouts as any)['default'];
  }


  mounted() {
    this.onRouteChange(this.$route);
  }
}
</script>


<style lang="scss">
@import 'bpui.js/style';

</style>