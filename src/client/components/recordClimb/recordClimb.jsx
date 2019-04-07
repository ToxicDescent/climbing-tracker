import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { CLIMBING_GRADES, CLIMBING_STATUSES } from '../../utility/constants';
import GradeSelector from '../gradeSelector';
import StatusSelector from '../statusSelector';

const RecordClimb = ({ sessionStarted, climbingData, setClimbingData }) => {
  if (!sessionStarted) return null;

  const [openDialog, setOpenDialog] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(
    Object.keys(CLIMBING_GRADES)[0]
  );
  const [currentStatus, setCurrentStatus] = useState(
    Object.keys(CLIMBING_STATUSES)[0]
  );

  const onOpenDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onAddClimb = () => {
    setOpenDialog(false);
    setClimbingData({
      ...climbingData,
      [currentGrade]: {
        ...climbingData[currentGrade],
        [currentStatus]: climbingData[currentGrade][currentStatus]
          ? climbingData[currentGrade][currentStatus] + 1
          : 1
      }
    });
  };
  const onRemoveClimb = () => {
    setOpenDialog(false);
    setClimbingData({
      ...climbingData,
      [currentGrade]: {
        ...climbingData[currentGrade],
        [currentStatus]:
          climbingData[currentGrade][currentStatus] > 0
            ? climbingData[currentGrade][currentStatus] - 1
            : 0
      }
    });
  };

  return (
    <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={onOpenDialog}>
        Record Climb
      </Button>
      <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>Record Climb</DialogTitle>
        <DialogContent>
          <GradeSelector
            grades={CLIMBING_GRADES}
            currentGrade={currentGrade}
            setCurrentGrade={setCurrentGrade}
          />
          <StatusSelector
            statuses={CLIMBING_STATUSES}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onCloseDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onRemoveClimb}>
            Remove Climb
          </Button>
          <Button variant="contained" color="primary" onClick={onAddClimb}>
            Add Climb
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

RecordClimb.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  climbingData: PropTypes.object.isRequired,
  setClimbingData: PropTypes.func.isRequired
};

export default RecordClimb;
