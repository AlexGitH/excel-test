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

### ANOTHER TESTING

``` graphql
query t {
  getUsers {
    id
    firstName
    lastName
    email
    documents {
      id name 
    }
  }
}
mutation vas{
  updateUser(
    id: "60a1105851e93124915a4699"
    # email : "vaska234@gamil.com"
    # email: "petrov241@gmail.com"
    email : "viskarik234@gamil.com"
    
    # id: "60a03c5ab8ed5a1ffa024f0f"
    # email : "semenovsky@gmail.com"
    # firstName : "Semen"
    # lastName : "Semenovsky"
    # password : "SecretP@s2992"
  ){
    id
    email
    login
  }
}

mutation docUpd{
  updateDocument(
    id : "60a04828f4117e2246240767"
    # name : "Updated-Test-Excel-02"
    name : "Test-Excel-02"
  ){
    id name 
  }
}

query recur(
  $own: ID!
){
  user( id: $own ){
    login
    documents {
      name owner {
        login documents{
          name owner {
            login
          }
        }
      }
    }
  }
}

query docById( $did: ID!){
  document( id: $did ){
    name sheets {
      name cells {
        value 
      }
    }
  }
}

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

mutation addSht(
  $shn: String!
  $did: ID!
){
  addSheet( name: $shn documentId: $did ){
    id
  }
}

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
