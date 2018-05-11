<template>
  <div class="apollo-example">
    <!-- Tchat example -->
    <ODAQuery
      :query="require('../graphql/todo/getListOfToDoItem.gql')"
      :reshape="require('../graphql/todo/getListOfToDoItemResult.gql')"
    >
      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <v-data-table
            :headers="headers"
            :items="data.items.data"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="data">
              <td class="text-xs-right">{{ data.item.id }}</td>
              <td class="text-xs-right">{{ data.item.name }}</td>
              <td class="text-xs-right">{{ data.item.description }}</td>
              <td class="text-xs-right">{{ data.item.done }}</td>
              <td class="text-xs-right">{{ data.item.dueToDate }}</td>
              <td class="text-xs-right">{{ data.item.published }}</td>
            </template>
          </v-data-table>
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
