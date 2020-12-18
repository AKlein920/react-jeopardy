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
      offset: 0,
      roundsPlayed: 0,
      selectedClue: {},
    };
  }
  componentDidMount() {
    this.resetGame();
  }

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  getRandomIndex = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  handleClueSelection = (domEl, clue) => {
    const { categoriesAndClues } = this.state;

    const categoriesAndCluesCopy = { ...categoriesAndClues };
    categoriesAndCluesCopy[clue.category.id][clue.id].selected = true;

    this.setState({
      selectedClue: clue,
      isDisplayingClue: true,
      categoriesAndClues: categoriesAndCluesCopy,
    });
  };

  handleClueDone = () => {
    this.setState({ isDisplayingClue: false });
  };

  handleTextFieldChange = (e) => {
    console.log(e.target);
    console.log(e.target.value);

    this.setState({ [e.target.id]: e.target.value });
  };

  placeDailyDouble = (helperObjCategory, categories) => {
    const randomCategoriesIndex = this.getRandomIndex(categories.length);
    const randomCategory = helperObjCategory[categories[randomCategoriesIndex].id];
    const randomClueIndex = this.getRandomIndex(Object.keys(randomCategory).length);
    const randomClueId = Object.keys(randomCategory)[randomClueIndex];
    const randomClue = randomCategory[randomClueId];

    randomClue.isDailyDouble = true;
    console.log(randomClue);
  };

  resetGame = async () => {
    const { numberOfCategories, offset, roundsPlayed } = this.state;

    const baseUrl = `http://jservice.io/api`;
    // get categories
    const categoriesUrl = `${baseUrl}/categories?count=${numberOfCategories}&offset=${offset}`;
    const categoriesResult = await axios.get(categoriesUrl);
    const categories = categoriesResult.data;

    // get clues for each category and format categories and clues
    let helperObjCategory = {};

    await this.asyncForEach(categories, async (category) => {
      helperObjCategory[category.id] = {};
      const cluesResult = await axios.get(`${baseUrl}/clues?category=${category.id}`);
      await this.asyncForEach(cluesResult.data, (clue) => {
        helperObjCategory[clue.category.id] = { ...helperObjCategory[clue.category.id], [clue.id]: clue }
      });
    });

    // place daily double at a random clue within random category
    this.placeDailyDouble(helperObjCategory, categories);

    // roundsPlayed and offset variables
    const newRoundsPlayed = roundsPlayed + 1;
    const newOffset = Number(offset) + Number(numberOfCategories);

    // save categories and clues in state
    this.setState({ categoriesAndClues: helperObjCategory, categories, offset: newOffset, roundsPlayed: newRoundsPlayed })
  };

  render() {
    const { categories, categoriesAndClues, isDisplayingClue, numberOfCategories, numberOfClues, selectedClue } = this.state;

    return (
      <Container>
        <TextField id="numberOfCategories" type="number" label="Number of categories" value={numberOfCategories} onChange={e => this.handleTextFieldChange(e)} />
        <TextField id="numberOfClues" type="number" label="Number of clues per category" value={numberOfClues} onChange={e => this.handleTextFieldChange(e)} />
        <Button variant="contained" color="primary" onClick={this.resetGame}>Reset</Button>

        <h3>JEOPARDY!</h3>

        {isDisplayingClue ? <Clue handleClueDone={this.handleClueDone} selectedClue={selectedClue} /> : <Board categories={categories} handleClueSelection={this.handleClueSelection} numberOfClues={numberOfClues} categoriesAndClues={categoriesAndClues} />}
      </Container>
    )
  }
}

export default App;
