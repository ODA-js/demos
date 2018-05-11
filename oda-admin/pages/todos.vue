<template>
  <div class="apollo-example">
    <!-- Tchat example -->
    <ODAQuery
      :query="require('../graphql/todo/getListOfToDoItem.gql')"
      :reshape="require('../graphql/todo/getListOfToDoItemResult.gql')"
    >
      <v-data-table
        :headers="headers"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.done }}</td>
          <td class="text-xs-right">{{ props.item.dueToDate }}</td>
          <td class="text-xs-right">{{ props.item.published }}</td>
        </template>
      </v-data-table>
      
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
  </div>
</template>

<script>
import ODAQuery from "~/components/ReshapedQuery";

export default {
  components: {
    ODAQuery
  },
  data:() => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "name", value: "name" },
      { text: "description", value: "description" },
      { text: "done", value: "done" },
      { text: "dueToDate", value: "dueToDate" },
      { text: "published", value: "published" },
    ]
  })
};
</script>

<style scoped>

</style>
