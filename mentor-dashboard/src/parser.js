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

const loginPattern = /.*github\.com\//;
function getGitHubLogin(gitHubLink) {
  return gitHubLink.replace(loginPattern,'').replace('/','');
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

mentors.forEach(item => {
  const login = getGitHubLogin(item[4]);  
  if (login == 'undefined') return;
  const mentor = {
    name: `${item[0]} ${item[1]}`,
    city: item[2],
    students: {}
  }
  school.mentors[login] = mentor;
  addLoginToPairs(mentor.name, login);
})

function addLoginToPairs(name, login) {
  pairs.forEach(item => {
    if(item.length > 0 && item[0] === name) item[2] = login;
  })
}

const mistakes = pairs.filter(item => item.length < 3)

pairs.forEach(item => {
  if(school.mentors[item[2]]) {
    school.mentors[item[2]].students[`${item[1]}`] = {score: []};
    // console.log(school.mentors[item[2]].students);
  } else {
    console.log(item);
  }
})

scores.forEach(item => {
  const mentorLogin = getGitHubLogin(item[1]);
  const mentor = school.mentors[mentorLogin];
  const studentLogin = getGitHubLogin(item[2]);
  const task = school.tasks.names.indexOf(item[3]);
  const student = mentor ? mentor.students[studentLogin] : 0;
  
  const score = {
    linkPR: item[4].toString(),
    mark: item[5],
    comment: item[6]
  }
  if (student && task >= 0) {
    student.score[task] = score;
  
   
  }
})
fs.writeFile('mynewfile3.json', JSON.stringify(school,null, ' '), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
// console.log(school);
// console.log(pairs);
// console.log(mistakes);
// console.log(school.mentors.maximuk);

