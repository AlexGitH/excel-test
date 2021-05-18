const graphql = require( 'graphql' );

const User = require( '../model/User' );
const Document = require( '../model/Document' );
const Sheet = require( '../model/Sheet' );
const Cell = require( '../model/Cell' );

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const GraphQLNonNullString = new GraphQLNonNull( GraphQLString )
const GraphQLNonNullInt = new GraphQLNonNull( GraphQLInt )
const GraphQLNonNullID = new GraphQLNonNull( GraphQLID )

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
    id     : { type: GraphQLID },
    row    : { type: GraphQLNonNullInt },
    col    : { type: GraphQLNonNullInt },
    coords : { type: GraphQLString }, // DEBUG: remove after testing
    value  : { type: GraphQLString },
    expr   : { type: GraphQLString },
    sheet  : {
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

const updateModel = async( Model, { id, ...rest } ) => {
  const entity = await Model.findById( id );
  for ( const key in rest ) {
    if ( key in entity ) {
      entity[key] = rest[key];
    }
  }
  return entity.save()
}

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
    },
    //////////////////////////////////////////////////////////////
    //   DELETE
    deleteUser : {
      type : UserType,
      args : { id: { type: GraphQLNonNullID } },
      resolve( parent_, { id } ) {
        // NOTE: only owner user or admin can perform user removal
        return User.findByIdAndRemove( id );
      }
    },
    deleteDocument : {
      type : DocumentType,
      args : { id: { type: GraphQLNonNullID } },
      resolve( parent_, { id } ) {
        // NOTE: only owner or admin can perform document removal
        // TODO: deleted document must delete all its sheets
        return Document.findByIdAndRemove( id );
      }
    },
    deleteSheet : {
      type : SheetType,
      args : { id: { type: GraphQLNonNullID } },
      resolve( parent_, { id } ) {
        // TODO: last sheet cannot be removed
        // TODO: deleted sheet must delete all its cells
        return Sheet.findByIdAndRemove( id );
      }
    },
    deleteCell : {
      type : CellType,
      args : { id: { type: GraphQLNonNullID } },
      resolve( parent_, { id } ) {
        // TODO: last sheet cannot be removed
        // TODO: deleted sheet must delete all its cells
        return Sheet.findByIdAndRemove( id );
      }
    },

    //////////////////////////////////////////////////////////////
    //   UPDATE
    updateUser : {
      type : UserType,
      args : {
        id        : { type: GraphQLNonNullID },
        firstName : { type: GraphQLString },
        lastName  : { type: GraphQLString },
        email     : { type: GraphQLString },
        // login     : { type: GraphQLNonNullString },
        password  : { type: GraphQLString }

      },
      // async resolve( parent_, { id, ...rest } ) {
      async resolve( parent_, args ) {
        return updateModel( User, args );
        // const user = await User.findById( id );
        // for ( const key in rest ) {
        //   if ( key in user ) {
        //     user[key] = rest[key];
        //   }
        // }
        // return user.save()
      }
    },
    updateDocument : {
      type : DocumentType,
      args : {
        id      : { type: GraphQLNonNullID },
        name    : { type: GraphQLString },
        ownerId : { type: GraphQLID }  // DEBUG:  this option is for testing only
      },
      async resolve( parent_, args ) {
        return updateModel( Document, args );
      }
    },
    updateSheet : {
      type : SheetType,
      args : {
        id   : { type: GraphQLNonNullID },
        name : { type: GraphQLString }
      },
      async resolve( parent_, args ) {
        return updateModel( Sheet, args );
      }
    },
    updateCell : {
      type : CellType,
      args : {
        id    : { type: GraphQLNonNullID },
        // NOTE:  row and col are not changeable( history implementation reason );
        // row     : { type: GraphQLNonNullInt },
        // col     : { type: GraphQLNonNullInt },
        value : { type: GraphQLString },
        expr  : { type: GraphQLString }
        // NOTE: sheetId is not changeable (history reason)
        // sheetId : { type: new GraphQLNonNull( GraphQLID ) }
      },
      async resolve( parent_, args ) {
        return updateModel( Cell, args );
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