const sessionToBackend = sessionData => {
  const climbs = [];
  Object.keys(sessionData.climbs).forEach(grade => {
    const climb = {
      grade
    };
    let statusIsEmpty = 0;
    const statuses = Object.keys(sessionData.climbs[grade]);
    statuses.forEach(status => {
      climb[status] = sessionData.climbs[grade][status];
      if (climb[status] === 0) statusIsEmpty += 1;
    });
    if (statusIsEmpty !== statuses.length) {
      climbs.push(climb);
    }
  });
  const backendData = {
    username: 'toxicdescent',
    session: {
      location: sessionData.location,
      length: sessionData.length,
      climbs
    }
  };
  return backendData;
};

export default sessionToBackend;
