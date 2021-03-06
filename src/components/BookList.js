import React, { Component } from 'react';
import { getBooksQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import BookDetail from './BookDetail';



class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    displayBooks() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading books..</div>);
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => { this.setState({ selected: book.id }) }}><a href={"#"+book.id}>{book.name}</a></li>
                );
            })
        }
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetail bookId = {this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
