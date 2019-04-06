import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const SessionTable = ({ data, columnKeys, rowKeys }) => {
  return (
    <Grid item xs={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Grades</TableCell>
            {Object.keys(columnKeys).map(key => (
              <TableCell key={key} align="center">
                {columnKeys[key]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(rowKeys).map(status => (
            <TableRow key={status}>
              <TableCell key={status}>{rowKeys[status]}</TableCell>
              {Object.keys(columnKeys).map(grade => (
                <TableCell key={`${status}-${grade}`}>
                  {data[grade][status]}
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
  data: PropTypes.object.isRequired,
  columnKeys: PropTypes.objectOf(String).isRequired,
  rowKeys: PropTypes.objectOf(String).isRequired
};

export default SessionTable;
