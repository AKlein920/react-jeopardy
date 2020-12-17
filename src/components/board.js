import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Board = ({ categories, numberOfClues }) => {
    const numberOfCluesArray = [...Array(numberOfClues).keys()]
    return (
        <Paper elevation={3}>
            <Grid container spacing={1}>
                {categories.length && categories.map(category => (
                    <Paper elevation={3} key={category.id}>
                        <Grid item>{category.title.toUpperCase()}</Grid>
                        {numberOfCluesArray.map(num => (
                            <div key={num}>{`$${num * 100}`}</div>
                        ))}
                    </Paper>
                ))}
            </Grid>
        </Paper>
    )
}

export default Board;