import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';

const SessionTable = ({ sessionClimbs }) => {
  return (
    <Grid item xs={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Grades</TableCell>
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
                  {sessionClimbs[grade][status]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

SessionTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sessionClimbs: PropTypes.object.isRequired
};

export default SessionTable;
