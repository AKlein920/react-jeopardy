import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Board = ({ categories, numberOfClues }) => {
    const numberOfCluesArray = Array.from({ length: numberOfClues }, (_, i) => i + 1)
    return (
        <Paper elevation={3}>
            <Grid container style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {categories.length && categories.map(category => (
                    <Paper elevation={3} key={category.id} style={{ width: '10em' }}>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4em' }}>
                            <span>{category.title.toUpperCase()}</span>
                        </Grid>
                        {numberOfCluesArray.map(num => (
                            <div key={num} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '6em', width: '100%', border: '1px solid #000000' }}>
                                <span>{`$${num * 100}`}</span>
                            </div>
                        ))}
                    </Paper>
                ))}
            </Grid>
        </Paper>
    )
}

export default Board;