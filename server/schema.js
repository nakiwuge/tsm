const { gql } = require('apollo-server');

const typeDefs = gql`
  type Show {
    id: ID!
    name: String!
    url: String!
    genres: [String]!
    status: String
    isScheduled: Boolean
    crew:[CrewMember]
    seasons:[Season]
    gallery:[Image]
    rating:Float
    isFavorite:Boolean
    comment:Comment
    summary:String!
    image:String!
    premiered:String!
  }

  type CrewMember {
    id: ID!
    name: String
    image: String
    type: String
  }

  type Season {
    id: ID!
    url:String!
    number: Int!
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
    shows: [Show]!
    show(id: ID!): Show
    user: User
    scheduledShows:[Show]   
  }

  type Mutation {
    addToWatchlist(showId: ID!): Response
    removeShow(showId: ID!): Response
    addComment(showId: ID!): Response!
    favorite(showIds: [ID]!): Response!
    signup(email: String!, password:String!, confirmPassword:String!): UserResponse
    login(email: String!, password:String): UserResponse
  }
  
  type Response {
    success: Boolean!
    data: [Show]
    showId:Int
  }
  type UserResponse {
    success: Boolean!
    id:String
    token: String
    email:String
    error:String
  }

`;

module.exports = typeDefs;