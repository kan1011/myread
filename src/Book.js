import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
    }

    // state = {
    //     shelf: this.props.book.hasOwnProperty('shelf') ? this.props.book.shelf : 'none'
    // }

    handleChange = (e) => {
        const selectValue = e.target.value

        if (this.props.onSelectShelf){
            this.props.onSelectShelf(this.props.book, selectValue)
        }

    }

    render() {
        const { book, onSelectShelf } = this.props
        // const { shelf } = this.state


        return (
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : '#'})`}}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleChange} value={book.shelf}>
                                <option value="" disabled>Move to ...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want To Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
        )
    }
}

export default Book