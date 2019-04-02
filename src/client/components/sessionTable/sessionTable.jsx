import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';

export default function SessionTable({ sessionClimbs }) {
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Grade</TableCell>
            {Object.keys(BOULDERING_GRADES).map(grade => {
              if (
                sessionClimbs.find(climb => {
                  return grade === climb.grade;
                })
              ) {
                return (
                  <TableCell key={grade} align="center">
                    {BOULDERING_GRADES[grade]}
                  </TableCell>
                );
              }
              return null;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(BOULDERING_STATUSES).map(status => (
            <TableRow key={status}>
              <TableCell key={status}>{BOULDERING_STATUSES[status]}</TableCell>
              {Object.keys(BOULDERING_GRADES).map(grade => {
                const index = sessionClimbs.findIndex(climb => {
                  return climb.grade === grade;
                });
                if (index > -1) {
                  return (
                    <TableCell key={`${status}-${grade}`}>
                      {sessionClimbs[index][status]}
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}

SessionTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sessionClimbs: PropTypes.array.isRequired
};
