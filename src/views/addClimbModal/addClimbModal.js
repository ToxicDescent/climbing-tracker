import React, { Fragment, useState } from 'react';
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

export default function AddClimbModal({
  grade,
  onGradeChange,
  status,
  onStatusChange,
  onAddClimb,
}) {
  // State
  const [openDialog, setOpenDialog] = useState(false);

  // Functions
  const onOpenDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  }
  const onCloseAndAddDialog = () => {
    setOpenDialog(false);
    onAddClimb();
  }

  // Render
  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={onOpenDialog}>
        Add Climb
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={onCloseDialog}>
        <DialogTitle>Add Climb</DialogTitle>
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
            onClick={onCloseAndAddDialog}>
            Add Climb
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
