/* eslint react/forbid-prop-types: off */
import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Board = ({ categories, categoriesAndClues, handleClueSelection, numberOfClues }) => {
    console.log('BOARD')
    return (
        <Paper elevation={3}>
            <Grid container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {categories.length && categories.map(category => {
                    const clues = Object.values(categoriesAndClues[category.id])

                    return (
                        <Paper elevation={3} key={category.id} style={{ width: '10em' }}>
                            <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4em' }}>
                                <span>{category.title.toUpperCase()}</span>
                            </Grid>
                            {clues.map((clue, index) => {
                                if (index < numberOfClues) {
                                    return (
                                        <Grid item key={clue.id} className={clue.selected ? 'selected' : 'clue'} onClick={(e) => handleClueSelection(e.target, clue)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '6em', width: '100%', border: '1px solid #000000', cursor: 'pointer' }}>
                                            <h2 style={{ color: clue.selected ? '#000000' : '#ffffff' }}>{`$${clue.value}`}</h2>
                                        </Grid>
                                    )
                                }
                                return null;
                            })}
                        </Paper>
                    )
                })}
            </Grid>
        </Paper>
    )
}

Board.propTypes = {
    categories: PropTypes.array.isRequired,
    categoriesAndClues: PropTypes.object.isRequired,
    handleClueSelection: PropTypes.func.isRequired,
    numberOfClues: PropTypes.number.isRequired,
}

export default Board;