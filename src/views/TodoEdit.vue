<template>
  <section class="content">
    <header class="header">
      <h1 class="title">
        <span><b>Edit</b> Todo</span>
      </h1>
    </header>
    <EditTodo />
  </section>
</template>

<script>
import EditTodo from '@/components/edit/EditTodo'

export default {
  name: 'TodoEdit',
  components: {
    EditTodo
  }
}
</script>
