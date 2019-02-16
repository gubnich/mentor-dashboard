const fs = require('fs');
const xlsx = require('node-xlsx');

function getExcelSheet(excelFile, sheetIndex) {
  let sheet = xlsx.parse(`${__dirname}/${excelFile}`)[sheetIndex];
  sheet = sheet.data.slice(1).filter(item => item.length)
  return sheet;
}

const scores = getExcelSheet('data/Mentor score.xlsx', 0);
const pairs = getExcelSheet('data/Mentor-students pairs.xlsx', 0);
const mentors = getExcelSheet('data/Mentor-students pairs.xlsx', 1);
const tasks = getExcelSheet('data/Tasks.xlsx', 0);

const mistakes = {
  inPairs: {
    description: 'Отсутствует GitHub для менторов: ',
    cases: new Set()
  },
  inScores: {
    description: 'Не назначен ментор для студентов: ',
    cases: new Set()
  },
  inTasks: {
    description: 'Отсутствует описание для тасков: ',
    cases: new Set()
  }
};

const loginPattern = /.*rolling-scopes-school\/|.*github\.com\//;
const replacePattern = /-2018Q3/;
function getGitHubLogin(gitHubLink) {
  return gitHubLink.replace(loginPattern,'').replace(replacePattern, '').replace('/', '');
}

const school = {
  tasks: {
    names: [],
    links: [],
    statuses: []
  },
  mentors: {}
}

tasks.forEach(item => {
  const [name, link, status] = item;
  school.tasks.names.push(name.trim());
  school.tasks.links.push(link);
  school.tasks.statuses.push(status);
})

mentors.forEach((item, i) => {
  const mentorLogin = getGitHubLogin(item[4]); 
// console.log(mentorLogin);

  // const studentLogin = getGitHubLogin(item[4]); 
  if (mentorLogin == 'undefined') return;
  const mentor = {
    name: `${item[0]} ${item[1]}`,
    login: mentorLogin,
    city: item[2],
    students: {}
  }
  school.mentors[mentorLogin.toLowerCase()] = mentor;
  addLoginToPairs(mentor.name, mentorLogin.toLowerCase());
  // console.log(login);
  
})

function addLoginToPairs(name, login) {
  pairs.forEach(item => {
    if(item.length > 0 && item[0] === name) {
      item[2] = login;
      addLoginToScores(item[1].toString().toLowerCase(), login);
    }
  })
}

function addLoginToScores(studentLogin, mentorLogin) {
  scores.forEach(item => {
    if(item.length > 0 && getGitHubLogin(item[2]).toLowerCase().trim() === studentLogin) item[8] = mentorLogin;
    
  })
}
// console.log(scores);

pairs.forEach(item => {
  if(item.length < 3) mistakes.inPairs.cases.add(item[0]);
})

console.log(mistakes.inPairs.description, mistakes.inPairs.cases);

pairs.forEach(item => {
  if(school.mentors[item[2]]) {
    school.mentors[item[2]].students[`${item[1]}`] = {score: Array(school.tasks.names.length)};
    // console.log(school.mentors[item[2]].students);
  } else {
    console.log('!!!!!!!!!!!!!!!!!!!',item);
  }
})

// fs.writeFile('public/pairs.json', JSON.stringify(school, null, ' '), function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// function isMentor(login) {
//   return 
// }

scores.forEach((item, i) => {
  // const mentorLogin = getGitHubLogin(item[1]).toLowerCase();
  const mentorLogin = item[8];
  const studentLogin = getGitHubLogin(item[2]);
  let mentor;
  let task;
  let student;
  if (school.mentors[mentorLogin]) {
    mentor = school.mentors[mentorLogin];
  } else {
    mistakes.inScores.cases.add(item[2])
    // console.log('ошибка 1', mentorLogin, item[2]);
  }
  if (school.tasks.names.indexOf(item[3]) >= 0) {
    task = school.tasks.names.indexOf(item[3]);
  } else {
    mistakes.inTasks.cases.add(item[3]);
    // console.log('ошибка 2', item[3], mentorLogin);
  }
  if (mentor) {
    student = mentor.students[studentLogin];
  } else {
    console.log('ошибка 3', mentorLogin);
  }
  
  // console.log(studentLogin);
  const score = {
    linkPR: item[4].toString(),
    mark: item[5],
    comment: item[6]
  }
  if (student && task >= 0) {
    student.score[task] = score;
    // console.log(i, student);
  }
   
})

console.log(mistakes.inScores.description, mistakes.inScores.cases);
console.log(mistakes.inTasks.description, mistakes.inTasks.cases);


fs.writeFile('public/school.json', JSON.stringify(school, null, ' '), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
fs.writeFile('public/scores.json', JSON.stringify(scores, null, ' '), function (err) {
  if (err) throw err;
  console.log('Saved!!');
});
// console.log(school);
// console.log(pairs);
// console.log(mistakes);
// console.log(school.mentors.maximuk);

