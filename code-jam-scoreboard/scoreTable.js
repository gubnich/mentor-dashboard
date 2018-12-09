import chart from './chart.js';

function rsschool(session){
  const scoreTable = document.getElementById('scoreTable');
  const container = document.createDocumentFragment();
  
  function createTHead(rsschool){
    const scoreTHead = document.createElement('thead');
    const scoreTHeadRow = document.createElement('tr');
    const userColumn = document.createElement('td');
    const puzzleColumns = document.createDocumentFragment();
    const totalColumn = document.createElement('td');
    const comparisonColumn = document.createElement('td');
    userColumn.innerText = 'Participant';
    totalColumn.innerText = 'Total';
    comparisonColumn.innerText = 'Comparison';
    for(let k = 0; k < rsschool.puzzles.length; k++){
      const nextColumn = document.createElement('td');
      nextColumn.innerText = rsschool.puzzles[k].name;
      chart.data.labels.push(nextColumn.innerText);
      puzzleColumns.append(nextColumn);
    }
    scoreTHeadRow.append(userColumn);
    scoreTHeadRow.append(puzzleColumns);
    scoreTHeadRow.append(totalColumn);
    scoreTHeadRow.append(comparisonColumn);
    scoreTHead.append(scoreTHeadRow);
    container.append(scoreTHead);
  }

  function createTBody(users, rsschool){
    const scoreTBody = document.createElement('tbody');
    for(let i = 0; i < users.length; i++){
      const scoreTR = document.createElement('tr');
      const nameTD = document.createElement('td');
      const timeTD = document.createElement('td');
      const comparisonTD = document.createElement('td');
      const puzzlesTDs = document.createDocumentFragment();
      let total = 0;
      const userStat = [];
      for(let j = 0; j < rsschool.puzzles.length; j++){
        const puzzleTD = document.createElement('td');
        const answer = document.createElement('span');
        if(rsschool.rounds.length > 0){
          const userSolution = rsschool.rounds[j].solutions[users[i].uid];
            if(userSolution && userSolution.correct === 'Correct'){
              puzzleTD.innerText = userSolution.time['$numberLong'];
              total += Number(puzzleTD.innerText);
              answer.innerText = userSolution.code;
            } else {
              total += 150;
              puzzleTD.innerText = '150';
              answer.innerText = 'no answer';
            }
            userStat.push(Number(puzzleTD.innerText));
            answer.classList.add('tooltip');
            puzzleTD.append(answer);
        } else {
            puzzleTD.innerText = 'no answers';
        }
        puzzlesTDs.append(puzzleTD);
      }
      nameTD.innerText = users[i].displayName;
      timeTD.innerText = total;
      comparisonTD.innerHTML = '<input type="checkbox">';
      comparisonTD.data = userStat;
      scoreTR.append(nameTD);
      scoreTR.append(puzzlesTDs);
      scoreTR.append(timeTD);
      scoreTR.append(comparisonTD);
      scoreTBody.append(scoreTR);
    }
    container.append(scoreTBody);
  }

  fetch(session)
  .then(response => response.json()
  .then(rsschool => {
    fetch('./users.json')
    .then(response => response.json()
    .then(users => {
      createTHead(rsschool);
      createTBody(users, rsschool);
      scoreTable.innerHTML = null;
      scoreTable.append(container);
    }))
  })
  )
}

export default rsschool;
