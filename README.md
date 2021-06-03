# A-EXCEL

Another/Awesome Excel project

## GRAPHQL TESTING COMMANDS

### QUERIES AND MUTATIONS FIELD

This example of testing queries in `graphiql`

``` graphql

# TEST NESTED QUERY
query t {
  getUsers {
    id
    firstName
    lastName
    documents {
      id name sheets {
        id name cells { 
          id
          value
        }
      }
    }
  }
}

# ADD USER
mutation addUser(
  $fn: String!
  $ln: String!
  $em: String!
  $lg: String!
  $pw: String!) {
  addUser (
    firstName:$fn
    lastName:$ln
    email:$em
    login: $lg
    password: $pw){
      id, firstName, lastName, email, login
    }
}
```
