import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ModifyClimbModal from '../modifyClimbModal';

export default function SessionRecordClimb({
  sessionStarted,
  sessionClimbs,
  setSessionClimbs
}) {
  if (!sessionStarted) return null;

  const onModifyClimb = (type, grade, status) => {
    switch (type) {
      case 'add':
        setSessionClimbs({
          ...sessionClimbs,
          [grade]: {
            ...sessionClimbs[grade],
            [status]: sessionClimbs[grade][status]
              ? sessionClimbs[grade][status] + 1
              : 1
          }
        });
        break;
      case 'remove':
        setSessionClimbs({
          ...sessionClimbs,
          [grade]: {
            ...sessionClimbs[grade],
            [status]:
              sessionClimbs[grade][status] > 0
                ? sessionClimbs[grade][status] - 1
                : 0
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <ModifyClimbModal type="add" onModifyClimb={onModifyClimb} />
      <ModifyClimbModal type="remove" onModifyClimb={onModifyClimb} />
    </Fragment>
  );
}

SessionRecordClimb.propTypes = {
  sessionStarted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sessionClimbs: PropTypes.object.isRequired,
  setSessionClimbs: PropTypes.func.isRequired
};
