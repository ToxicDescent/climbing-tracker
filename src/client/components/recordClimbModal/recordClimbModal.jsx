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

const RecordClimbModal = ({ mainText, callback, grades, statuses }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(Object.keys(grades)[0]);
  const [currentStatus, setCurrentStatus] = useState(Object.keys(statuses)[0]);

  const onOpenDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onCloseDialogAndCallback = () => {
    setOpenDialog(false);
    callback(currentGrade, currentStatus);
  };

  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={onOpenDialog}>
        {mainText}
      </Button>
      <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>{mainText}</DialogTitle>
        <DialogContent>
          <InputLabel>Grade:</InputLabel>
          <NativeSelect
            value={currentGrade}
            onChange={event => {
              setCurrentGrade(event.target.value);
            }}
          >
            {Object.keys(grades).map(key => (
              <option key={key} value={key}>
                {grades[key]}
              </option>
            ))}
          </NativeSelect>
          <RadioGroup
            row
            name="climbStatus"
            aria-label="Climb status"
            value={currentStatus}
            onChange={event => {
              setCurrentStatus(event.target.value);
            }}
          >
            {Object.keys(statuses).map(status => (
              <FormControlLabel
                key={status}
                value={status}
                control={<Radio color="primary" />}
                label={statuses[status]}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onCloseDialogAndCallback}
          >
            {mainText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

RecordClimbModal.propTypes = {
  mainText: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  grades: PropTypes.objectOf(String).isRequired,
  statuses: PropTypes.objectOf(String).isRequired
};

export default RecordClimbModal;
