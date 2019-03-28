import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import ModifyClimbModal from '../modifyClimbModal/modifyClimbModal';
import { CLIMBING_GRADES } from '../../utility/constants';

export default function Tracker({ sessionStarted }) {
  // State
  const [flashedClimbs, setFlashedClimbs] = useState(() => {
    const initialState = {};
    Object.keys(CLIMBING_GRADES).forEach(key => {
      initialState[key] = 0;
    })
    return initialState;
  });
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

  // Functions
  const onAddClimb = (grade, status) => {
    if (status === 'flashed') {
      setFlashedClimbs({
        ...flashedClimbs,
        [grade]: flashedClimbs[grade] ? flashedClimbs[grade] + 1 : 1,
      });
    } else if (status === 'completed') {
      setCompletedClimbs({
        ...completedClimbs,
        [grade]: completedClimbs[grade] ? completedClimbs[grade] + 1 : 1,
      });
    } else if (status === 'attempted') {
      setAttemptedClimbs({
        ...attemptedClimbs,
        [grade]: attemptedClimbs[grade] ? attemptedClimbs[grade] + 1 : 1,
      });
    }
  }
  const onRemoveClimb = (grade, status) => {
    if (status === 'flashed') {
      setFlashedClimbs({
        ...flashedClimbs,
        [grade]: flashedClimbs[grade] > 0 ? flashedClimbs[grade] - 1 : 0,
      });
    } else if (status === 'completed') {
      setCompletedClimbs({
        ...completedClimbs,
        [grade]: completedClimbs[grade] > 0 ? completedClimbs[grade] - 1 : 0,
      });
    } else if (status === 'attempted') {
      setAttemptedClimbs({
        ...attemptedClimbs,
        [grade]: attemptedClimbs[grade] > 0 ? attemptedClimbs[grade] - 1 : 0,
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
                <TableCell key={key} align="center">{CLIMBING_GRADES[key]}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Flashed</TableCell>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <TableCell key={key}>{flashedClimbs[key]}</TableCell>
              ))
            }
          </TableRow>
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
      {
        sessionStarted &&
        <Fragment>
          <ModifyClimbModal
            type="add"
            onModifyClimb={onAddClimb} />
          <ModifyClimbModal
            type="remove"
            onModifyClimb={onRemoveClimb} />
        </Fragment>
      }
    </Fragment>
  );
}

Tracker.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
};
