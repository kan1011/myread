import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class ShelvesList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render() {
        const {books} = this.props

        return(
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                    <div>
                        {console.log('books', books)}
                        <BookShelf
                            shelf={"Currently Reading"}
                            books = {books.filter((book) => book.shelf === "currentlyReading")}
                            onSelectShelf={this.props.onSelectShelf}
                        /> 
                        <BookShelf
                            shelf={"Want To Read"}
                            books = {books.filter((book) => book.shelf === "wantToRead")}
                            onSelectShelf={this.props.onSelectShelf}
                        />
                        <BookShelf
                            shelf={"Read"}
                            books = {books.filter((book) => book.shelf === "read")}
                            onSelectShelf={this.props.onSelectShelf}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                    >
                        Add a Book
                    </Link>
                </div>
            </div>
        );  
    }
}


export default ShelvesList