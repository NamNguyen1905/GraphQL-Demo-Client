import React, { Component } from 'react';
// import {getBooksQuery} from '../queries/queries';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getBookQuery, getAuthorsQuery, updateBookMutation, removeBookMutation } from '../queries/queries';

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            genre: '',
            authorId: ''
        };
    }


    displayAuthors() {
        var data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading authors...</option>)
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    handleRemoveButton(e) {
        e.preventDefault();
        this.props.removeBookMutation({
            variables: {
                id: this.props.bookId
            }
        })
        window.location.reload(true);
    }

    handleUpdateButton(e) {
        e.preventDefault();
        this.props.updateBookMutation({
            variables: {
                id: this.props.bookId,
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            }
        });
        window.location.reload(true);
    }

    displayBookDetails() {
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>

                    <form id="update-book" onSubmit={this.handleUpdateButton.bind(this)}>

                        <div className="field">
                            <label>ID:</label>
                            <input value={this.props.bookId} type='text' readOnly autoFocus />
                        </div>

                        <div className="field">
                            <label>Book name:</label>
                            <input type='text' onChange={(e) => this.setState({ name: e.target.value })} />
                        </div>

                        <div className="field">
                            <label>Genre:</label>
                            <input type='text' onChange={(e) => this.setState({ genre: e.target.value })} />
                        </div>

                        <div className="field">
                            <label>Author:</label>
                            <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                                <option>Select author</option>
                                {this.displayAuthors()}
                            </select>
                        </div>
                        <button>Update</button>
                    </form>
                    <button action="http://localhost:3000/" onClick={this.handleRemoveButton.bind(this)}>Remove</button>
                </div>
            )
        } else {
            return (<div>
                no book selected
            </div>)
        }
    };
    render() {
        return (
            <div id="book-details">
                <p>{this.displayBookDetails()}</p>
            </div>
        );
    }
}

export default compose(
    graphql(getBookQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    }), graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(updateBookMutation, { name: "updateBookMutation" }),
    graphql(removeBookMutation, { name: "removeBookMutation" }),

)(BookDetail);
