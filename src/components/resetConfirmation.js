import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const ResetConfirmation = ({ handleClose, open, resetGame }) => (
    <Dialog maxWidth="xs" open={open}>
        <h3>Are you sure you want to reset the game?</h3>

        <Button color="primary" variant="contained" onClick={handleClose}>Cancel</Button>
        <Button color="secondary" variant="contained" onClick={() => { resetGame(); handleClose(); }}>Reset Game</Button>
    </Dialog >
);

ResetConfirmation.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    resetGame: PropTypes.func.isRequired,
}

export default ResetConfirmation;