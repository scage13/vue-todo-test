<template>
  <div class="container">
    <div class="add-list">
      <router-link class="button" to="/add" type="button">+</router-link>
      <span>Add List</span>
    </div>
    <ul class="list">
      <li class="list-item" v-for="todo in todos" :key="todo.id">
        <div class="todo-card">
          <div class="todo-card__info">
            <div class="todo-card__header">
              <div class="todo-card__date">Created: {{ todo.createdAt }}</div>
              <h2 class="todo-card__title">{{ todo.title }}</h2>
            </div>
            <ul class="todo-card__list">
              <li v-for="item in todo.tasks" :key="item.label">
                <CheckboxIcon :checked="item.done"/>
                <span :class="item.done ? 'line-through' : ''">
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </div>
          <div class="todo-card__actions">
            <router-link class="button" :to="'/edit/' + todo.id">
              <font-awesome-icon icon="edit" />
              Edit
            </router-link>
            <button class="button" @click="removeTodo(todo.id)">
              <font-awesome-icon icon="trash" />
              Delete
            </button>
          </div>
        </div>
      </li>
      <li class="list-item list-item--empty" v-if="!todos.length">
        <font-awesome-icon icon="list-alt" size="2x"/>
        <div class="list-item__title">Not found</div>
      </li>
    </ul>
    <ConfirmModal
      :show="isShowModal"
      :title="dialogText"
      v-on:hideModal="handleCancelModal($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { ModalPromiseHandler } from '../../core/utils/ModalPromiseHandler'

// Consts
import { CONFIRM_DIALOG_TEXT } from '../../core/consts/consts'

// Types
import { Todo } from '../../core/types/todo'
import { fetchAllTodos, deleteTodoById } from '../../core/api'

// Components
import ConfirmModal from '../commons/ConfirmModal.vue'
import CheckboxIcon from '../commons/CheckboxIcon.vue'

@Component({
  components: {
    ConfirmModal,
    CheckboxIcon
  }
})
export default class TodoList extends Vue {
  todos: Todo[] = []
  modalPromiseHandler = new ModalPromiseHandler()
  isShowModal = false
  dialogText = CONFIRM_DIALOG_TEXT.delete

  @Emit('hideModal')
  handleCancelModal (event: boolean) {
    this.isShowModal = false
    this.modalPromiseHandler.setData(event)
    this.modalPromiseHandler.isShow = false
  }

  mounted () {
    this.fetchTodos()
  }

  fetchTodos () {
    fetchAllTodos()
      .then((response) => {
        if (response) {
          this.todos = response
        }
      })
  }

  async removeTodo (id: string) {
    this.isShowModal = true
    const modal = await this.modalPromiseHandler.init()
    if (!modal) return
    deleteTodoById(id)
      .then(() => {
        this.fetchTodos()
      })
  }
}
</script>

<style lang="sass" scoped>
  .add-list
    width: 200px
    margin: 20px auto
    text-align: center

    a
      width: 50px
      height: 50px
      margin-bottom: 10px
      font-size: 32px
      line-height: 28px

    span
      display: block
      font-size: 14px

  .list
    display: flex
    padding-top: 20px
    padding-bottom: 50px
    overflow-x: auto

    &-item
      min-width: 330px
      min-height: 372px
      padding: 0 15px

      &--empty
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin: 0 auto
        font-size: 34px

      &__title
        margin-top: 20px

  .todo-card
    display: flex
    flex-direction: column
    height: 100%
    padding: 15px
    background-color: #fff
    border-radius: 5px
    box-shadow: 3px 3px 6px 0 #ededed
    border: 1px solid rgba(#868686, 0.4)

    &__info
      position: relative
      min-height: 300px
      padding-top: 30px

    &__header
      display: flex
      flex-direction: column
      justify-content: center
      min-height: 126px
      border-top: 1px solid rgba(#868686, 0.4)
      border-bottom: 1px solid rgba(#868686, 0.4)

    &__date
      position: absolute
      top: 2px
      right: 2px
      font-size: 11px
      font-style: italic
      opacity: 0.4

    &__title
      padding-top: 10px
      padding-bottom: 10px
      text-align: center
      font-size: 18px

    &__list
      padding: 10px 0

      li
        position: relative
        display: block
        margin-bottom: 5px
        padding: 6px 0 6px 30px
        font-size: 13px
        line-height: 1.25

        .icon
          position: absolute
          top: 2px
          left: 0

    &__actions
      display: flex
      flex-wrap: wrap
      justify-content: center
      margin-top: auto
      margin-left: -5px
      margin-right: -5px

      .button
        position: relative
        display: block
        flex: 1
        margin-left: 5px
        margin-right: 5px
        padding-left: 35px
        text-align: left

        svg
          position: absolute
          top: 50%
          left: 10px
          transform: translateY(-50%)

</style>
