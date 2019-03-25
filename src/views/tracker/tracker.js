import React, { Fragment, useState } from 'react';

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
  const submitClimb = event => {
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
      <table>
        <thead>
          <tr>
            <th></th>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <th key={key}>{CLIMBING_GRADES[key]}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Completed</th>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <td key={key}>{completedClimbs[key]}</td>
              ))
            }
          </tr>
          <tr>
            <th>Attempted</th>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <td key={key}>{attemptedClimbs[key]}</td>
              ))
            }
          </tr>
        </tbody>
      </table>
      <form onSubmit={submitClimb}>
        <h2>Record Climb</h2>
        <label>
          Grade:
          <select value={grade} onChange={onGradeChange}>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <option key={key} value={key}>{CLIMBING_GRADES[key]}</option>
              ))
            }
          </select>
        </label>
        <label>
          Completed
          <input
            type="radio"
            name="climbStatus"
            value="completed"
            checked={status === 'completed'}
            onChange={onStatusChange} />
        </label>
        <label>
          Attempted
          <input
            type="radio"
            name="climbStatus"
            value="attempted"
            checked={status === 'attempted'}
            onChange={onStatusChange} />
        </label>
        <input type="submit" value="Record Climb" />
      </form>
    </Fragment>
  );
}
