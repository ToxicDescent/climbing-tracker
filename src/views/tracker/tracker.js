import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import ModifyClimbModal from '../modifyClimbModal/modifyClimbModal';
import { CLIMBING_GRADES, BOULDERING_STATUSES } from '../../utility/constants';

export default function Tracker({ sessionStarted }) {
  // State
  const [climbs, setClimbs] = useState(() => {
    const initialState = {};
    Object.keys(CLIMBING_GRADES).forEach(grade => {
      initialState[grade] = {};
      Object.keys(BOULDERING_STATUSES).forEach(status => {
        initialState[grade][status] = 0;
      });
    });
    return initialState;
  });

  // Functions
  const onModifyClimb = (type, grade, status) => {
    switch (type) {
      case 'add':
        setClimbs({
          ...climbs,
          [grade]: {
            ...climbs[grade],
            [status]: climbs[grade][status] ? climbs[grade][status] + 1 : 1
          }
        });
        break;
      case 'remove':
        setClimbs({
          ...climbs,
          [grade]: {
            ...climbs[grade],
            [status]: climbs[grade][status] > 0 ? climbs[grade][status] - 1 : 0
          }
        });
        break;
      default:
        break;
    }
  };

  // Render
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.keys(CLIMBING_GRADES).map(key => (
              <TableCell key={key} align="center">
                {CLIMBING_GRADES[key]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(BOULDERING_STATUSES).map(status => (
            <TableRow key={status}>
              <TableCell key={status}>{BOULDERING_STATUSES[status]}</TableCell>
              {Object.keys(CLIMBING_GRADES).map(grade => (
                <TableCell key={`${status}-${grade}`}>
                  {climbs[grade][status]}
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
