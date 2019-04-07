import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const StatusSelector = ({ statuses, currentStatus, setCurrentStatus }) => {
  return (
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
  );
};

StatusSelector.propTypes = {
  statuses: PropTypes.objectOf(String).isRequired,
  currentStatus: PropTypes.string.isRequired,
  setCurrentStatus: PropTypes.func.isRequired
};

export default StatusSelector;
