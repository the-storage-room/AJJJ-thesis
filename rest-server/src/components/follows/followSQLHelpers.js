export const fetchStarredMatchesHelper = () => {
  return `
  SELECT username, gender, matchid FROM follow
  INNER JOIN MATCH ON follow.matchid = match.id
  INNER JOIN users ON match.user1_id = users.id OR match.user2_id = users.id
  WHERE starred = '1' 
  `;
};

export const fetchUnstarredMatchesHelper = () => {
  return `
  SELECT username, matchid FROM follow
  INNER JOIN MATCH ON follow.matchid = match.id
  INNER JOIN users ON follow.userid = users.id OR match.user1_id = users.id OR match.user2_id = users.id
  WHERE starred = '0' 
  `;
};

export const starSingleMatchHelper = (body) => {
  return `
  UPDATE follow
  SET starred = ${body.starred}
  WHERE matchid=${body.matchid}
  `;
}

export const unstarSingleMatchHelper = (body) => {
  return `
  UPDATE follow
  SET starred = ${body.starred}
  WHERE matchid=${body.matchid}
  `;
};