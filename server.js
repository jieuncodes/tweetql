import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID
    username: String
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
  type Mutation {
    postTweet(text: String, userId: ID): Tweet
    deleteTweet(id: ID): Boolean
  }
`;
const tweets = [
  {
    id: 1,
    text: "Hello World",
  },
  {
    id: 2,
    text: "Bye World",
  },
];

const resolvers = {
  Query: {
    allTweets: () => tweets,
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === Number(id));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
