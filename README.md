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

# ADD DOCUMENT
mutation addDoc(
  $dcn: String!
  $own: ID!
){
  addDocument( name: $dcn ownerId: $own) {
    id name owner{
      firstName lastName
    }
  }
}

#  ADD SHEET
mutation addSht(
  $shn: String!
  $did: ID!
){
  addSheet( name: $shn documentId: $did ){
    id
  }
}

# ADD CELL TESTING
mutation addCell(
  $row: Int!
  $col: Int!
  $val: String
  $exp: String
  $sid: ID!
){
  addCell(
    row: $row
    col: $col
    value: $val
    expr: $exp
    sheetId: $sid
  ) {
    id 
  }
}
```

### VARIABLES FIELD

``` json
{
  "fn": "Peter",
  "ln": "Petrov",
  "em": "petrow241@gmail.com",
  "lg": "petro1949",
  "pw": "SuperSecretP@s111",
  "dcn": "Test-Excel-02",
  "own": "60a03c5ab8ed5a1ffa024f0f",
  "shn": "Sheet 1",
  "did": "60a03ff8e83ee0204e5d981c",
  "sid": "60a04a8fabaa862262e791fa",
  "col": 3,
  "row": 1,
  "val": "and another one cell",
  "exp": null
}
```
