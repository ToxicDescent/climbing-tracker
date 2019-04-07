import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

const GradeSelector = ({ grades, currentGrade, setCurrentGrade }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

GradeSelector.propTypes = {
  grades: PropTypes.objectOf(String).isRequired,
  currentGrade: PropTypes.string.isRequired,
  setCurrentGrade: PropTypes.func.isRequired
};

export default GradeSelector;
