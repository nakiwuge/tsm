const { gql } = require('apollo-server');

const typeDefs = gql`
  type Show {
    id: ID!
    name: String!
    genre: String!
    status: String
    isScheduled: Boolean!
    crew:[CrewMember]
    seasons:[Season]
    gallery:[Image]
    rating:Int
    isFavorite:Boolean
    comment:[Comment]
  }

  type CrewMember {
    id: ID!
    name: String
    image: String
  }

  type Season {
    id: ID!
    title: String!
    episodes:[Episode]
  }

  type Episode {
    id: ID!
    title: String!
  }

  type Image {
    url: String!
  }

  type Comment {
    id:ID!
    body: String!
    date: String!
  }
  
  type User {
    id: ID!
    email: String!
    password: String!
    shows: [Show]!
  }

  type Query {
    Shows( limit: Int after: String): Paginate!
    show(id: ID!): Show
    user: User   
  }

  type Mutation {
    addToWatchlist(showIds: [ID]!): Response!
    addComment(showId: ID!): Response!
    favorite(showIds: [ID]!): Response!
    signup(email: String!, password:String!, confirmPassword:String!): Response
    login(email: String!, password:String): String
  }
  type Response {
    success: Boolean!
    data: [Show]
  }
  type Paginate { 
    cursor: String!
    hasMore: Boolean!
    shows: [Show]!
  }
`;

module.exports = typeDefs;