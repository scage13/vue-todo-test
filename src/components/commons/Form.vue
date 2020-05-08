<template>
  <form class="form" @submit.prevent="onSumbit()">
    <input
      class="form-control"
      type="text"
      v-model="title"
      placeholder="Todo Title"
      required
    >
    <h4 class="form-subtitle" v-if="tasks.length">Tasks:</h4>
    <div class="task" v-for="(task, index) in tasks" v-bind:key="index">
      <label class="task-check">
        <input type="checkbox" v-model="task.done">
        <CheckboxIcon :checked="task.done"/>
      </label>
      <input
        class="task-input"
        type="text"
        placeholder="Add some task..."
        v-model="task.label"
        required
      >
      <button class="task-delete button" type="button" @click="removeTask(index)">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
    <button class="add-task button" type="button" @click="addTask()">Add Task +</button>
    <div class="submit-btn">
      <button class="button button--success" type="submit">Save</button>
    </div>
    <ConfirmModal
      :show="isShowModal"
      :title="modalText"
      v-on:hideModal="handleCancelModal($event)"
    />
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from 'vue-property-decorator'
import { createTodo, updateTodoById } from '../../core/api/index'
import { ModalPromiseHandler } from '../../core/utils/ModalPromiseHandler'
import { delay, isEqual } from 'lodash-es'
import moment from 'moment-mini'

// Consts
import { CONFIRM_DIALOG_TEXT } from '../../core/consts/consts'

// Components
import ConfirmModal from './ConfirmModal.vue'
import CheckboxIcon from './CheckboxIcon.vue'

// Types
import { Todo, TodoTask } from '../../core/types/todo'

@Component({
  components: {
    ConfirmModal,
    CheckboxIcon
  }
})
export default class Form extends Vue {
  @Prop() formType!: 'edit' | 'add'
  @Prop() todo!: Todo

  title: string | null = null
  tasks: TodoTask[] = []
  isEdit = false
  isShowModal = false
  modalText = CONFIRM_DIALOG_TEXT.exitRoute
  modalPromiseHandler = new ModalPromiseHandler()

  @Watch('title')
  @Watch('tasks')
  formChange () {
    return delay(() => {
      const editPageCondition = isEqual(this.tasks, this.todo?.tasks) && this.title === this.todo?.title
      this.isEdit = !editPageCondition
    }, 100)
  }

  @Watch('todo')
  editData () {
    if (this.formType === 'edit') {
      const { title, tasks } = this.todo
      this.title = title
      this.tasks = tasks
    }
  }

  @Emit('hideModal')
  handleCancelModal (event: boolean) {
    this.isShowModal = false
    this.modalPromiseHandler.setData(event)
    this.modalPromiseHandler.isShow = false
  }

  mounted () {
    this.$router.beforeResolve(async (to, from, next) => {
      if (this.isEdit) {
        this.isShowModal = true
        const dialog = await this.modalPromiseHandler.init()
        if (dialog && !this.isShowModal) {
          this.isEdit = false
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    })
  }

  addTask () {
    this.tasks = [...this.tasks, { done: false, label: '' }]
  }

  removeTask (index: number) {
    this.tasks = this.tasks.filter((_, i) => index !== i)
  }

  onSumbit () {
    const payload: Todo = {
      id: `${Date.now()}`,
      createdAt: moment().format('MM-DD-YYYY, HH:mm:ss'),
      title: this.title,
      tasks: this.tasks
    }
    let action
    if (this.formType === 'edit') {
      payload.id = this.todo.id
      payload.createdAt = this.todo.createdAt
      action = updateTodoById(payload)
    } else {
      action = createTodo(payload)
    }
    this.isEdit = false
    action.then(() => this.$router.push('/'))
  }
}
</script>

<style lang="sass" scoped>
  .form
    position: relative
    max-width: 600px
    min-height: 400px
    margin: 20px auto 0
    padding: 15px 15px 72px
    background-color: #fff
    border-radius: 5px
    box-shadow: 3px 3px 6px 0 #ededed
    border: 1px solid rgba(#868686, 0.4)

    &-control
      width: 100%
      margin-bottom: 30px

    &-subtitle
      text-align: center
      text-decoration: underline
      font-weight: 700

  .task
    display: flex
    flex-wrap: wrap
    margin-bottom: 10px

    &-check
      position: relative
      height: 34px
      padding-top: 6px
      cursor: pointer

      input
        position: absolute
        visibility: hidden
        opacity: 0

    &-input
      flex: 1
      height: auto
      margin: 0 10px
      padding: 7px 0
      border: 1px solid transparent
      border-radius: 0
      box-shadow: none
      font-size: 14px
      line-height: 20px
      cursor: pointer

      &:focus
        border-bottom-color: #242323
        cursor: text

    &-delete
      width: 34px
      height: 34px
      min-width: auto
      padding: 0

  .add-task
    display: block
    width: 200px
    margin: 20px auto
    padding: 6px
    font-size: 12px

  .submit-btn
    position: absolute
    bottom: 15px
    left: 15px
    right: 15px
    padding-top: 15px
    border-top: 1px solid rgba(#868686, 0.4)

    .button
      width: 100%

</style>
