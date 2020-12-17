import React, { Component } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Board from './components/board'

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      numberOfCategories: 5,
      numberOfClues: 5,
    }
  }
  async componentDidMount() {
    const baseUrl = `http://jservice.io/api` // save this in context
    const categoriesUrl = `${baseUrl}/categories?count=5`
    const categoriesResult = await axios.get(categoriesUrl);
    const categories = categoriesResult.data;
    this.setState({ categories });
  }

  handleTextFieldChange = (e) => {
    console.log(e.target)
    console.log(e.target.value)

    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    const { categories, numberOfCategories, numberOfClues } = this.state;

    return (
      <Container>
        <TextField id="numberOfCategories" type="number" label="Number of categories" value={numberOfCategories} onChange={e => this.handleTextFieldChange(e)} />
        <TextField id="numberOfClues" type="number" label="Number of clues per category" value={numberOfClues} onChange={e => this.handleTextFieldChange(e)} />
        <Button variant="contained" color="primary">Reset</Button>
        <Board categories={categories} numberOfClues={numberOfClues} />
      </Container>
    )
  }
}

export default App;
