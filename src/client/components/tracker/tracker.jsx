import React, { Fragment, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import ModifyClimbModal from '../modifyClimbModal';
import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';
import usePrevious from '../../hooks/usePrevious';

export default function Tracker({ sessionStarted }) {
  const previousSessionStarted = usePrevious(sessionStarted);

  const initialState = useMemo(() => {
    const state = {};
    Object.keys(BOULDERING_GRADES).forEach(grade => {
      state[grade] = {};
      Object.keys(BOULDERING_STATUSES).forEach(status => {
        state[grade][status] = 0;
      });
    }, []);
    return state;
  });

  const [tracker, setTracker] = useState(initialState);

  useEffect(() => {
    if (sessionStarted && !previousSessionStarted) {
      setTracker(initialState);
    }
  }, [sessionStarted]);

  const onModifyClimb = (type, grade, status) => {
    switch (type) {
      case 'add':
        setTracker({
          ...tracker,
          [grade]: {
            ...tracker[grade],
            [status]: tracker[grade][status] ? tracker[grade][status] + 1 : 1
          }
        });
        break;
      case 'remove':
        setTracker({
          ...tracker,
          [grade]: {
            ...tracker[grade],
            [status]:
              tracker[grade][status] > 0 ? tracker[grade][status] - 1 : 0
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.keys(BOULDERING_GRADES).map(key => (
              <TableCell key={key} align="center">
                {BOULDERING_GRADES[key]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(BOULDERING_STATUSES).map(status => (
            <TableRow key={status}>
              <TableCell key={status}>{BOULDERING_STATUSES[status]}</TableCell>
              {Object.keys(BOULDERING_GRADES).map(grade => (
                <TableCell key={`${status}-${grade}`}>
                  {tracker[grade][status]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sessionStarted && (
        <Fragment>
          <ModifyClimbModal type="add" onModifyClimb={onModifyClimb} />
          <ModifyClimbModal type="remove" onModifyClimb={onModifyClimb} />
        </Fragment>
      )}
    </Fragment>
  );
}

Tracker.propTypes = {
  sessionStarted: PropTypes.bool.isRequired
};
