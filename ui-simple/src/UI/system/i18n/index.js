import merge from 'lodash/merge';

import UserTranslate from './User';
import ToDoItemTranslate from './ToDoItem';

const messages = {
  uix: {
    "filter": {
      "search": "Search",
      "exists": "%{name} exists",
      "eq": "%{name} =",
      "ne": "%{name} !=",
      "lte": "%{name} <=",
      "gte": "%{name} >=",
      "lt": "%{name} <",
      "gt": "%{name} >",
      "imatch": "%{name}",
      "in": "%{name} in",
      "nin": "%{name} not in",
    },
    "actionType": {
      "CREATE": "Create",
      "UPDATE": "Update Existing",
      "CLONE": "Copy Selected",
      "USE": "Use Existing",
      "UNLINK": "Unlink",
      "ExpectedTo": "Expected To"
    }
  }
}

export default
  merge(
    messages,
    UserTranslate,
    ToDoItemTranslate,
  )
