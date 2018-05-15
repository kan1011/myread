import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'


class BookSearch extends Component{
    state = {
        results: [],
        query: ''
        
    }

    static propsType = {
        booksOnShelf: PropTypes.array.isRequired
    }

    handleChange = (e) => {
        const query = e.target.value
        this.setState((currentState) => ({
            query: query
        }))
        BooksAPI.search(query)
            .then((response) => {
                console.log('response', response)
                !(typeof response === "undefined") &&
                    response.length
                    ?
                    this.setState((currentState) => ({
                        results: response
                    }))
                    :
                    this.setState((currentState) => ({
                        results: []
                    }))
            })
        console.log('results', this.state.results)
    }

    render() {

        const { onSelectShelf, booksOnShelf } = this.props
        const { query, results } = this.state

        const booksIdOnShelf = booksOnShelf.map((b) => (b.id))


        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                    >
                    Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={this.handleChange}
                            value={this.state.query}
                        />
                    </div>
                </div>
                <div className="search-books-results">  
                    <div className="search-reminder">
                        {query === ''
                            ? <span>Enter some keywords to search books for the day!</span>
                            : <span>Showing {results.length} Results</span>

                        }
                        

                    </div>  
                    <ol className="books-grid">
                        {results.map((result) => (
                            <li key={result.id}>
                                {booksIdOnShelf.includes(result.id)
                                    ? <Book
                                        book={booksOnShelf.find(b => b.id === result.id)}
                                        onSelectShelf={onSelectShelf}
                                    />
                                    : <Book
                                        book={{...result, shelf: 'none'}}
                                        onSelectShelf={onSelectShelf}
                                        />
                                }
                                
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch