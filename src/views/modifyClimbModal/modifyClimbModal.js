import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

import { CLIMBING_GRADES } from '../../utility/constants';

export default function ModifyClimbModal({
  grade,
  onGradeChange,
  status,
  onStatusChange,
  onAddClimb,
  onRemoveClimb,
}) {
  // State
  const [openDialog, setOpenDialog] = useState(false);

  // Variables
  const onModifyClimb = onAddClimb ? onAddClimb : onRemoveClimb;

  // Functions
  const onOpenDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  }
  const onCloseAndModifyDialog = () => {
    setOpenDialog(false);
    onModifyClimb();
  }

  // Render
  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={onOpenDialog}>
        {onAddClimb ? 'Add Climb' : 'Remove Climb'}
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={onCloseDialog}>
        <DialogTitle>{onAddClimb ? 'Add Climb' : 'Remove Climb'}</DialogTitle>
        <DialogContent>
          <InputLabel>Grade:</InputLabel>
          <NativeSelect 
            value={grade}
            onChange={onGradeChange}>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <option key={key} value={key}>{CLIMBING_GRADES[key]}</option>
              ))
            }
          </NativeSelect >
          <RadioGroup
            row
            name="climbStatus"
            aria-label="Climb status"
            value={status}
            onChange={onStatusChange}>
            <FormControlLabel value="flashed" control={<Radio color="primary" />} label="Flashed" />
            <FormControlLabel value="completed" control={<Radio color="primary" />} label="Completed" />
            <FormControlLabel value="attempted" control={<Radio color="primary" />} label="Attempted" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
        <Button
            variant="contained"
            color="secondary"
            onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onCloseAndModifyDialog}>
            {onAddClimb ? 'Add Climb' : 'Remove Climb'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

ModifyClimbModal.defaultProps = {
  onAddClimb: null,
  onRemoveClimb: null,
};

ModifyClimbModal.propTypes = {
  grade: PropTypes.string.isRequired,
  onGradeChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onAddClimb: PropTypes.func,
  onRemoveClimb: PropTypes.func,
};
