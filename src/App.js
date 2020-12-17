import React, { Component } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Board from './components/board';
import Clue from './components/clue';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoriesAndClues: {},
      numberOfCategories: 5,
      numberOfClues: 5,
      isDisplayingClue: false,
      selectedClue: {}
    }
  }
  async componentDidMount() {
    const baseUrl = `http://jservice.io/api` // save this in context
    // get categories
    const categoriesUrl = `${baseUrl}/categories?count=5`
    const categoriesResult = await axios.get(categoriesUrl);
    const categories = categoriesResult.data;
    // this.setState({ categories });

    const formatCategoriesAndClues = async () => {
      let helperObjCategory = {};

      await this.asyncForEach(categories, async (category) => {
        helperObjCategory[category.id] = {};
        const cluesResult = await axios.get(`${baseUrl}/clues?category=${category.id}`);
        await this.asyncForEach(cluesResult.data, (clue) => {
          helperObjCategory[clue.category.id] = { ...helperObjCategory[clue.category.id], [clue.id]: clue }
        })
      });

      this.setState({ categoriesAndClues: helperObjCategory, categories, })
    }
    formatCategoriesAndClues();
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  handleClueSelection = (clue) => {
    console.log('select clue')
    console.log(clue)
    this.setState({ selectedClue: clue, isDisplayingClue: true })
  }

  handleClueDone = () => {
    this.setState({ isDisplayingClue: false })
  }

  handleTextFieldChange = (e) => {
    console.log(e.target)
    console.log(e.target.value)

    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    const { categories, categoriesAndClues, isDisplayingClue, numberOfCategories, numberOfClues, selectedClue } = this.state;

    return (
      <Container>
        <TextField id="numberOfCategories" type="number" label="Number of categories" value={numberOfCategories} onChange={e => this.handleTextFieldChange(e)} />
        <TextField id="numberOfClues" type="number" label="Number of clues per category" value={numberOfClues} onChange={e => this.handleTextFieldChange(e)} />
        <Button variant="contained" color="primary">Reset</Button>

        <h3>JEOPARDY!</h3>

        {isDisplayingClue ? <Clue handleClueDone={this.handleClueDone} selectedClue={selectedClue} /> : <Board categories={categories} handleClueSelection={this.handleClueSelection} numberOfClues={numberOfClues} categoriesAndClues={categoriesAndClues} />}
      </Container>
    )
  }
}

export default App;
