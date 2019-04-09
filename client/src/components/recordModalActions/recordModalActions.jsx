import React from 'react';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const RecordModalActions = ({
  data,
  setData,
  grade,
  status,
  setOpenDialog
}) => {
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onAdd = () => {
    setOpenDialog(false);
    setData({
      ...data,
      [grade]: {
        ...data[grade],
        [status]: data[grade][status] ? data[grade][status] + 1 : 1
      }
    });
  };
  const onRemove = () => {
    setOpenDialog(false);
    setData({
      ...data,
      [grade]: {
        ...data[grade],
        [status]: data[grade][status] > 0 ? data[grade][status] - 1 : 0
      }
    });
  };

  return (
    <DialogActions>
      <Button variant="contained" color="secondary" onClick={onCloseDialog}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={onRemove}>
        Remove
      </Button>
      <Button variant="contained" color="primary" onClick={onAdd}>
        Add
      </Button>
    </DialogActions>
  );
};

RecordModalActions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  grade: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setOpenDialog: PropTypes.func.isRequired
};

export default RecordModalActions;
