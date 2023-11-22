import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // URL of your GraphQL server
  cache: new InMemoryCache(),
});
const apiUrl = "https://dev.api.hcl-x.com/platform-x/v1/authoring/gateway"
const getGraphQLClient=(url="https://dev.api.hcl-x.com/platform-x/v1/authoring/gateway")=>{
    const client = new ApolloClient({
        uri: url, // URL of your GraphQL server
        cache: new InMemoryCache(),
      });
      return client
}
export default getGraphQLClient;
