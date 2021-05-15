const graphql = require( 'graphql' );

const User = require( '../model/User' );
const Document = require( '../model/Document' );
const Sheet = require( '../model/Sheet' );
const Cell = require( '../model/Cell' );

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const GraphQLNonNullString = new GraphQLNonNull( GraphQLString )
const GraphQLNonNullInt = new GraphQLNonNull( GraphQLInt )

const UserType = new GraphQLObjectType( {
  name   : 'User',
  fields : () => ( {
    id        : { type: GraphQLID },
    firstName : { type: GraphQLNonNullString },
    lastName  : { type: GraphQLNonNullString },
    email     : { type: GraphQLNonNullString },
    login     : { type: GraphQLNonNullString },
    // firstName : { type: new GraphQLNonNull( GraphQLString ) },
    // lastName  : { type: new GraphQLNonNull( GraphQLString ) },
    // email     : { type: new GraphQLNonNull( GraphQLString ) },
    // login     : { type: new GraphQLNonNull( GraphQLString ) },
    documents : {
      type : new GraphQLList( DocumentType ),
      resolve( parent, args ) {
        return Document.find( { ownerId: parent.id } );
      }
    }
  } )
} )

const DocumentType = new GraphQLObjectType( {
  name   : 'Document',
  fields : () => ( {
    id    : { type: GraphQLID },
    name  : { type: GraphQLNonNullString },
    owner : {
      type : new GraphQLNonNull( UserType ),
      resolve( parent, args ) {
        return User.findById( parent.ownerId );
      }
    },
    sheets : {
      type : new GraphQLList( SheetType ),
      resolve( parent, args ) {
        return Sheet.find( { documentId: parent.id } );
      }
    }
  } )
} )

const SheetType = new GraphQLObjectType( {
  name   : 'Sheet',
  fields : () => ( {
    id       : { type: GraphQLID },
    name     : { type: GraphQLNonNullString },
    document : {
      type : new GraphQLNonNull( DocumentType ),
      resolve( parent, args ) {
        return Document.findById( parent.documentId );
      }
    },
    cells : {
      type : new GraphQLList( CellType ),
      resolve( parent, args ) {
        return Cell.find( { sheetId: parent.id } );
      }
    }

  } )
} )

const CellType = new GraphQLObjectType( {
  name   : 'Cell',
  fields : () => ( {
    id    : { type: GraphQLID },
    row   : { type: GraphQLNonNullInt },
    col   : { type: GraphQLNonNullInt },
    value : { type: GraphQLString },
    expr  : { type: GraphQLString },
    sheet : {
      type : new GraphQLNonNull( SheetType ),
      resolve( parent, args ) {
        return Sheet.findById( parent.sheetId );
      }
    },
    cells : {
      type : new GraphQLList( CellType ),
      resolve( parent, args ) {
        return Cell.find( { sheetId: parent.id } );
      }
    }

  } )
} )

const Mutation = new GraphQLObjectType( {
  name   : 'Mutation',
  fields : {
    addUser : {
      type : UserType,
      args : {
        firstName : { type: GraphQLNonNullString },
        lastName  : { type: GraphQLNonNullString },
        email     : { type: GraphQLNonNullString },
        login     : { type: GraphQLNonNullString },
        password  : { type: GraphQLNonNullString }

      },
      resolve( parent_, { firstName, lastName, email, login, password } ) {
        const user = new User( { firstName, lastName, email, login, password } )
        return user.save()
      }
    },
    addDocument : {
      type : DocumentType,
      args : {
        name    : { type: GraphQLNonNullString },
        ownerId : { type: new GraphQLNonNull( GraphQLID ) }
      },
      resolve( parent_, { name, ownerId } ) {
        const document = new Document( { name, ownerId } )
        return document.save()
      }
    },
    addSheet : {
      type : SheetType,
      args : {
        name       : { type: GraphQLNonNullString },
        documentId : { type: new GraphQLNonNull( GraphQLID ) }
      },
      resolve( parent_, { name, documentId } ) {
        const sheet = new Sheet( { name, documentId } )
        return sheet.save()
      }
    },
    addCell : {
      type : CellType,
      args : {
        row     : { type: GraphQLNonNullInt },
        col     : { type: GraphQLNonNullInt },
        value   : { type: GraphQLString },
        expr    : { type: GraphQLString },
        sheetId : { type: new GraphQLNonNull( GraphQLID ) }
      },
      resolve( parent_, { row, col, value, expr, sheetId } ) {
        const cell = new Cell( { row, col, value, expr, sheetId } )
        // TODO: add check if parent( sheet ) exists
        // TODO: check if user have permissions to edit document( owner or editor )
        return cell.save()
      }
    }
  }
} )

const Query = new GraphQLObjectType( {
  name   : 'Query',
  fields : {
    user : {
      type : UserType,
      args : { id: { type: GraphQLID } },
      resolve( parent_, args ) {
        return User.findById( args.id );
      }
    },
    document : {
      type : DocumentType,
      args : { id: { type: GraphQLID } },
      resolve( parent_, args ) {
        return Document.findById( args.id );
      }
    },
    sheet : {
      type : SheetType,
      args : { id: { type: GraphQLID } },
      resolve( parent_, args ) {
        return Sheet.findById( args.id );
      }
    },
    cell : {
      type : CellType,
      args : { id: { type: GraphQLID } },
      resolve( parent_, args ) {
        return Cell.findById( args.id );
      }
    },
    getUsers : {
      type : new GraphQLList( UserType ),
      resolve( parent_, args_ ) {
        return User.find( {} );
      }
    },
    getDocuments : {
      type : new GraphQLList( DocumentType ),
      resolve( parent_, args_ ) {
        return Document.find( {} );
      }
    }
  }
} )

module.exports = new GraphQLSchema( {
  query    : Query,
  mutation : Mutation
} )
