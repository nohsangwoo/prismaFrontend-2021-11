import { split, createHttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

// const httpLink = new HttpLink({
//     uri: 'http://localhost:4000/graphql'
// });

// console.log('token값: ', token);

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_PROD_URI
            : 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
        reconnect: true
    }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
export const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
    // link:httpLink
);
