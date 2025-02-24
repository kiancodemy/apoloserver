export const typeDefs = `#graphql
  
  type Products {
    id:ID!
    name:String !
    description:String!
    quantity:Int!
    price:Float !
   
    onSale:Boolean!
    categoryId:ID!
    category:category!
    reviews:[review]!
   
    }

  type User{
    _id:ID!
    name:String!
    email:String!
    

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
   input filter{
    
    quantity:String
    price:String
    page:String
    limit:String
    

   }
   input categodyinput{
   
    name:String!
   }

   type status {
    status:String!
   }

   type new {
    length:Int
    products:[Products]
   

   }
 
  type Query {
    
    Products(filter:filter):new
    Product(id:String!):Products!
    categories:[category!]!
    category(id:String!):category
    checkauth:status!
   
    }

  input userdata {
    name:String
    email:String
    password:String
  }
  input login {
    
    email:String!
    password:String!
    
  }
  input newproduct {
    
   name:String!
   description:String
   price:Int!
   quantity:Int!
   categoryId:String!
    
  }


  type Mutation {
    signup(data:userdata!):User!
    login(data:login):User!
    logout:status!
    addCategory(input:categodyinput!):category!
    creatproduct(input:newproduct!):Products!
       
  }
   
`;
