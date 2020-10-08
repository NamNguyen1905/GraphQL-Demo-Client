import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`
const addBookMutation = gql`
    mutation($id: ID!, $name: String!, $genre: String!, $authorId: ID!){
        addBook(id:$id,name:$name,genre:$genre,authorId:$authorId){
            name
            id
        }
    }
`
const removeBookMutation = gql`
    mutation($id: ID!){
        removeBook(id:$id){
            name
            id
        }
    }
`

const updateBookMutation = gql`
    mutation($id: ID!, $name: String!, $genre: String!, $authorId: ID!){
        updateBook(id:$id,name:$name,genre:$genre,authorId:$authorId){
            name
            id
        }
    }
`

const getBookQuery = gql`
   query($id:ID){
       book(id: $id){
           id
           name
           genre
           author{
               id
               name
               age
               books{
                   name
                   id
               }
           }
       }
   }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, updateBookMutation, removeBookMutation };