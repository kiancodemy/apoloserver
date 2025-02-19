export const typeDefs = `#graphql
  
  type Products {
    id:ID!
    name:String !
    description:String!
    quantity:Int!
    price:Float !
    image:String!
    onSale:Boolean!
    categoryId:ID!
    category:category!
    reviews:[review]
   
    }

  type User{
    id:ID!
    name:String!,
    email:String!,

  }

  

  input filter {
    onSale:Boolean
  }

  type review{
    d: ID!,
    date:String!,
    title: String!,
    comment:String!,
    rating:Int!,
    productId:ID! 
    
  }
   type category {
    id:ID!
    name:String!
    products:[Products!]!

   }
   input categodyinput{
   
    name:String!
   }
 
  type Query {
    
    Products(filter:filter):[Products]
    Product(id:String!):Products!
    categories:[category!]!
   
    }

  input userdata {
    name:String,
    email:String,
    password:String
  }


  type Mutation {
    signup(data:userdata):User!
       
    addCategory(input:categodyinput!):category!
  }
   
`;
