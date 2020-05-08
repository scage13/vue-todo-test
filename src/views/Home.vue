<template>
  <section class="content">
    <header class="header">
      <h1 class="title">
        <span><b>Tasks</b> Lists</span>
      </h1>
    </header>
    <TodoList />
  </section>
</template>

<script>
import TodoList from '@/components/home/TodoList.vue'

export default {
  name: 'Home',
  components: {
    TodoList
  }
}
</script>
