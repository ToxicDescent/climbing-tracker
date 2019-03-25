import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const CLIMBING_GRADES = {
  vb: 'VB',
  v0: 'V0',
  v1: 'V1',
  v2: 'V2',
  v3: 'V3',
  v4: 'V4',
  v5: 'V5',
  v6: 'V6',
  v7: 'V7',
  v8: 'V8',
  v9: 'V9',
};

export default function Tracker() {
  // State
  const [completedClimbs, setCompletedClimbs] = useState(() => {
    const initialState = {};
    Object.keys(CLIMBING_GRADES).forEach(key => {
      initialState[key] = 0;
    })
    return initialState;
  });
  const [attemptedClimbs, setAttemptedClimbs] = useState(() => {
    const initialState = {};
    Object.keys(CLIMBING_GRADES).forEach(key => {
      initialState[key] = 0;
    })
    return initialState;
  });
  const [grade, setGrade] = useState('vb');
  const [status, setStatus] = useState('completed');

  // Functions
  const onGradeChange = event => {
    setGrade(event.target.value);
  }
  const onStatusChange = event => {
    setStatus(event.target.value);
  }
  const onRecordClimb = event => {
    event.preventDefault();
    if (status === 'completed') {
      setCompletedClimbs({
        ...completedClimbs,
        [grade]: completedClimbs[grade] ? completedClimbs[grade] + 1 : 1,
      });
    } else if (status === 'attempted'){
      setAttemptedClimbs({
        ...attemptedClimbs,
        [grade]: attemptedClimbs[grade] ? attemptedClimbs[grade] + 1 : 1,
      });
    }
  }

  // Render
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <TableCell key={key} align="centre">{CLIMBING_GRADES[key]}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Completed</TableCell>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <TableCell key={key}>{completedClimbs[key]}</TableCell>
              ))
            }
          </TableRow>
          <TableRow>
            <TableCell>Attempted</TableCell>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <TableCell key={key}>{attemptedClimbs[key]}</TableCell>
              ))
            }
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h2">Record Climb</Typography>
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
        aria-label="Climb status"
        name="climbStatus"
        row
        value={status}
        onChange={onStatusChange}>
        <FormControlLabel value="completed" control={<Radio color="primary" />} label="Completed" />
        <FormControlLabel value="attempted" control={<Radio color="secondary" />} label="Attempted" />
      </RadioGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={onRecordClimb}>
        Record climb
      </Button>
    </Fragment>
  );
}
