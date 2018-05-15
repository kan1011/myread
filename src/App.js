import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ShelvesList from './ShelvesList'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'

class App extends Component {
  state = {
    books: []
  }

  componentDidMount(){
    const books = BooksAPI.getAll()
      .then((books) => {
        this.setState(()=>({
          books
        }))
      })
  }

  switchShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf
        this.setState((currentState) => ({
          books: currentState.books.filter((b) => {
            return b.id !== book.id
          }).concat([{...book, shelf: shelf}])
        }))
      })
  }

  addBook = (book, shelf) => {

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ShelvesList
            books={this.state.books}
            onSelectShelf={this.switchShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <BookSearch
            onSelectShelf={this.switchShelf}
            booksOnShelf={this.state.books}
          />
        )}/>
      </div>
    );
  }
}

export default App;
