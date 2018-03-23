import { ApolloLink, Observable } from "apollo-link-core";

import { createApolloFetch } from "apollo-fetch";

import { print } from "graphql/language/printer";

const hasSubscriptionOperation = ({ query }) => {
  for (let definition of query.definitions) {
    if (definition.kind === 'OperationDefinition') {
      const operation = definition.operation;
      if (operation === 'subscription') {
        return true;
      }
    }
  }
  return false;
};

export class SubscriptionLink extends ApolloLink {

  constructor(subscriptionsClient) {
    super();
    this.subscriptionsClient = subscriptionsClient;
    this.activeSubscriptionId = null;
  }

  request(operation, forward) {
    if (this.subscriptionsClient && this.activeSubscriptionId !== null) {
      this.subscriptionsClient.unsubscribe(this.activeSubscriptionId);
    }
    return new Observable(observer => {
      observer.next('Your subscription data will appear here after server publication!');
      this.activeSubscriptionId = this.subscriptionsClient.subscribe({
        query: operation.query,
        variables: operation.variables,
      }, function (error, result) {
        if (error) {
          observer.error(error);
        } else {
          observer.next(result);
        }
      });
    })
  }
}

class LogLink extends ApolloLink {

  request(operation, forward) {
    console.log(operation);
    //Apollo Link's Observable has a map for side effects or can modify the data in a next call
    return forward(operation).map(data => {
      console.log(data);
      return data;
    });
  }
}

class CatchLink extends ApolloLink {

  request(operation, forward) {
    //will pass the operation to the next observable
    const observable = forward(operation);

    return new Observable(observer => {
      const subscription = observable.subscribe({
        next: observer.next.bind(observer),
        error: error => {
          //reroute errors as proper data
          observer.next({
            data: {
              error,
            },
          });
        },
        complete: observer.complete.bind(observer),
      });

      //cleanup funciton, which is accessed through the unsubscribe
      return () => {
        //cleanup the inner observables subscripton
        subscription.unsubscribe();
      }
    });
  }
}

class HttpLink extends ApolloLink {
  constructor({ uri }) {
    super();
    this.apolloFetch = createApolloFetch({ uri })
      .use(({ request, options }, next) => {
        const token = localStorage.authToken;
        if (!options.headers) {
          options.headers = {};  // Create the headers object if needed.
        }
        options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      });
  }

  request(operation) {
    //The function passed to the Observable's constructor is called when the first subscribe is called
    return new Observable(observer => {
      const request = {
        ...operation,
        query: print(operation.query)
      };

      this.apolloFetch(request)
        .then(data => {
          //calls the next callback for the subscription
          observer.next(data);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  }
}

//To see how CatchLink modifies the response, pass an empty url and run the query with and without the CatchLink.
//Refer to https://launchpad.graphql.com/1jzxrj179
// const uri = "/graphql";
export default (uri, wsClient) => ApolloLink.from([
  new LogLink(),
  ApolloLink.split(
    hasSubscriptionOperation,
    new SubscriptionLink(wsClient)
    ,
    ApolloLink.from([
      new CatchLink(),
      new HttpLink({ uri }),
    ])
  )
])
