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
  const [climbs, setClimbs] = useState(() => {
    const initialState = {};
    Object.keys(CLIMBING_GRADES).forEach(key => {
      initialState[key] = 0;
    })
    return initialState;
  });
  const [climbingGrade, setClimbingGrade] = useState('vb');

  function updateClimbingGrade(event) {
    setClimbingGrade(event.target.value);
  }

  function submitClimb(event) {
    setClimbs({
      ...climbs,
      [climbingGrade]: climbs[climbingGrade] ? climbs[climbingGrade] + 1 : 1,
    });
    event.preventDefault();
  }

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            {
              Object.keys(climbs).map(key => (
                <th key={key}>{CLIMBING_GRADES[key]}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              Object.keys(climbs).map(key => (
                <td key={key}>{climbs[key]}</td>
              ))
            }
          </tr>
        </tbody>
      </table>
      <form onSubmit={submitClimb}>
        <h2>Record Climb</h2>
        <label>
          Grade:
          <select value={climbingGrade} onChange={updateClimbingGrade}>
            {
              Object.keys(CLIMBING_GRADES).map(key => (
                <option key={key} value={key}>{CLIMBING_GRADES[key]}</option>
              ))
            }
          </select>
        </label>
        <input type="submit" value="Record Climb" />
      </form>
    </Fragment>
  );
}
