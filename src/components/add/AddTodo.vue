<template>
  <div class="container">
    <Form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Form from '../commons/Form.vue'

@Component({
  components: {
    Form
  }
})
export default class AddTodo extends Vue { }
</script>

<style lang="sass">

</style>
