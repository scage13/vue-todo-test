<template>
  <section class="content">
    <header class="header">
      <h1 class="title">
        <span><b>Add</b> Todo</span>
      </h1>
    </header>
    <AddTodo />
  </section>
</template>

<script>
import AddTodo from '@/components/add/AddTodo'

export default {
  name: 'TodoAddView',
  components: {
    AddTodo
  }
}
</script>
