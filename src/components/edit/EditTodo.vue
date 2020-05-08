<template>
  <div class="container">
    <Form :formType="'edit'" :todo="currentTodo"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Form from '../commons/Form.vue'
import { getTodoById } from '../../core/api'

// Types
import { Todo } from '../../core/types/todo'

@Component({
  components: {
    Form
  }
})
export default class EditTodo extends Vue {
  currentTodo: Todo | null = null
  async mounted () {
    const { id } = this.$route.params
    const todo = await getTodoById(id) || null
    this.currentTodo = todo
  }
}
</script>

<style lang="sass">

</style>
