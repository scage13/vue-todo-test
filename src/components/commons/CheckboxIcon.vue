<template>
  <div class="icon">
    <font-awesome-icon
      :icon="icon"
      :style="{ color: '#868686' }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CheckboxIcon extends Vue {
  @Prop() checked!: boolean

  get icon (): string {
    return this.checked ? 'check-square' : 'square'
  }
}
</script>

<style lang="sass" scoped>
  .icon
    display: block
    width: 24px
    height: 24px

    svg
      display: block
      width: 100%
      height: 100%
</style>
