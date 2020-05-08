<template>
  <div class="modal" v-if="show">
    <div class="modal-backdrop" @click="$emit('hideModal', false)"></div>
    <div class="modal-body">
      <div class="modal-content">
        <button class="close" @click="$emit('hideModal', false)">
          <font-awesome-icon icon="times" />
        </button>
        <h2 class="modal-title">{{ title }}</h2>
        <div class="modal-actions">
          <button class="button" @click="$emit('hideModal', false)">Cancel</button>
          <button class="button button--success" @click="$emit('hideModal', true)">Accept</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'ConfirmModal'
})
export default class ConfirmModal extends Vue {
  @Prop() show!: boolean
  @Prop() title!: string
}
</script>

<style lang="sass" scoped>
  .modal
    &-backdrop
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: rgba(#000, 0.4)
      z-index: 19

    &-body
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      display: flex
      flex-direction: column
      justify-content: center
      max-width: 500px
      margin: auto
      padding: 120px 15px
      overflow-y: auto
      z-index: 20

    &-content
      position: relative
      margin: 0 auto
      padding: 50px 10px 10px
      background-color: #fff

    &-title
      margin-bottom: 40px
      text-align: center
      font-size: 20px

    &-actions
      display: flex
      flex-wrap: wrap
      justify-content: center

      .button
        width: 150px
        margin: 0 5px 10px

  .close
    position: absolute
    top: 0
    right: 0
    display: block
    width: 40px
    height: 40px
    border: none
    background-color: transparent
</style>
