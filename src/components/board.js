import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Board = ({ categories, categoriesAndClues, handleClueSelection, numberOfClues }) => {
    // const numberOfCluesArray = Array.from({ length: numberOfClues }, (_, i) => i + 1)

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
                                        <Grid item key={clue.id} onClick={() => handleClueSelection(clue)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '6em', width: '100%', border: '1px solid #000000', cursor: 'pointer' }}>
                                            <span>{`$${clue.value}`}</span>
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

export default Board;