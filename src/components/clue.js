import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

const Clue = ({ handleClueDone, selectedClue }) => {
    const [isShowingAnswer, setIsShowingAnswer] = useState(false);

    return (
        <>
            {selectedClue.isDailyDouble && <h1>DAILY DOUBLE!</h1>}
            <div style={{ height: '67vh', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>{isShowingAnswer ? selectedClue.answer : selectedClue.question}</h1>
            </div>
            <Button ariant="contained" color="primary" onClick={() => setIsShowingAnswer(!isShowingAnswer)}>{isShowingAnswer ? `Show Question` : `Show Answer`}</Button>
            <Button variant="contained" color="primary" onClick={() => handleClueDone()} style={{ position: 'absolute', right: '10vw' }}>Done</Button>
        </>
    )
}

export default Clue;