import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';
import GradeSelector from '../gradeSelector';
import StatusSelector from '../statusSelector';
import RecordModalActions from '../recordModalActions';

const RecordBoulder = ({
  sessionStarted,
  boulderingData,
  setBoulderingData
}) => {
  if (!sessionStarted) return null;

  const [openDialog, setOpenDialog] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(
    Object.keys(BOULDERING_GRADES)[0]
  );
  const [currentStatus, setCurrentStatus] = useState(
    Object.keys(BOULDERING_STATUSES)[0]
  );

  const onOpenDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={onOpenDialog}>
        Record Boulder
      </Button>
      <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>Record Boulder</DialogTitle>
        <DialogContent>
          <GradeSelector
            grades={BOULDERING_GRADES}
            currentGrade={currentGrade}
            setCurrentGrade={setCurrentGrade}
          />
          <StatusSelector
            statuses={BOULDERING_STATUSES}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
        </DialogContent>
        <RecordModalActions
          data={boulderingData}
          setData={setBoulderingData}
          grade={currentGrade}
          status={currentStatus}
          setOpenDialog={setOpenDialog}
        />
      </Dialog>
    </Grid>
  );
};

RecordBoulder.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  boulderingData: PropTypes.object.isRequired,
  setBoulderingData: PropTypes.func.isRequired
};

export default RecordBoulder;
