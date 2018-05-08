<template>
  <div class="apollo-example">
    <!-- Tchat example -->
    <ODAQuery
      :query="require('../graphql/todo/getListOfToDoItem.gql')"
      :reshape="require('../graphql/todo/getListOfToDoItemResult.gql')"
    >
      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div
            v-for="todo of data.items.data"
            :key="todo.id"
            class="message"
          >
            {{ todo.name }}
          </div>
        </template>
      </div>
    </ODAQuery>

    <div class="form">
      <input
        v-model="newMessage"
        placeholder="Type a message"
        class="input"
        @keyup.enter="sendMessage"
      >
    </div>
  </div>
</template>

<script>

import ODAQuery from './ReshapedQuery';

export default {
  components:{
    ODAQuery
  },
  data () {
    return {
      name: 'Anne',
      newMessage: '',
    }
  },

  computed: {
    formValid () {
      return this.newMessage
    },
  },

  methods: {

  },
}
</script>

<style scoped>
.form,
.input,
.apollo,
.message {
  padding: 12px;
}

.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}

.error {
  color: red;
}
</style>
