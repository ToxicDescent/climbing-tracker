import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { SESSION_LOCATIONS } from '../../utility/constants';

const SessionLocation = ({
  sessionStarted,
  sessionLocation,
  setSessionLocation
}) => {
  if (sessionStarted) return null;

  const onSessionLocationChange = event => {
    setSessionLocation(event.target.value);
  };

  return (
    <Grid item xs={12}>
      <RadioGroup
        aria-label="Session location"
        name="sessionLocation"
        row
        value={sessionLocation}
        onChange={onSessionLocationChange}
      >
        {Object.keys(SESSION_LOCATIONS).map(location => (
          <FormControlLabel
            key={location}
            value={location}
            control={<Radio color="primary" />}
            label={SESSION_LOCATIONS[location]}
          />
        ))}
      </RadioGroup>
    </Grid>
  );
};

SessionLocation.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  sessionLocation: PropTypes.string.isRequired,
  setSessionLocation: PropTypes.func.isRequired
};

export default SessionLocation;
