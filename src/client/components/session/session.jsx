import React, { Fragment, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import SessionTimer from '../sessionTimer';
import SessionTable from '../sessionTable';
import ModifyClimbModal from '../modifyClimbModal';
import {
  BOULDERING_GRADES,
  BOULDERING_STATUSES
} from '../../utility/constants';
import usePrevious from '../../hooks/usePrevious';

export default function Session({ sessionStarted }) {
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

  const [session, setSession] = useState(initialState);

  useEffect(() => {
    if (sessionStarted && !previousSessionStarted) {
      setSession(initialState);
    }
  }, [sessionStarted]);

  const onModifyClimb = (type, grade, status) => {
    switch (type) {
      case 'add':
        setSession({
          ...session,
          [grade]: {
            ...session[grade],
            [status]: session[grade][status] ? session[grade][status] + 1 : 1
          }
        });
        break;
      case 'remove':
        setSession({
          ...session,
          [grade]: {
            ...session[grade],
            [status]:
              session[grade][status] > 0 ? session[grade][status] - 1 : 0
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <SessionTimer sessionStarted={sessionStarted} />
      <SessionTable session={session} />
      {sessionStarted && (
        <Fragment>
          <ModifyClimbModal type="add" onModifyClimb={onModifyClimb} />
          <ModifyClimbModal type="remove" onModifyClimb={onModifyClimb} />
        </Fragment>
      )}
    </Fragment>
  );
}

Session.propTypes = {
  sessionStarted: PropTypes.bool.isRequired
};
