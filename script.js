function showUser(user) {
	//console.log('jee')  
    $('#profile').append('<h2>' + user.login + ' is GitHub user #' + user.id + '</h2>')
    var link = $('#profile .information').append(`<button><a href ="${user.html_url}" target="_blank">Go to profile</a></button>`)
    $('#profile .avatar').append(`<img src="${user.avatar_url}" alt="${user.login}" >`)
    $('#profile').append('<h2> User type: ' + user.type + '</h2>')
    $('#profile').append('<h2> Public repos: ' + user.public_repos + '</h2>')    
    link.addClass('profile');
    console.log(user);  
}

function showRepos(repos) {

var table = document.getElementById("userrepos");
table.classList.remove("d-none");
    var tbody = document.getElementById("reporows");
    repos.forEach(repo => {
      var row = tbody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = repo.name
      cell2.innerHTML = repo.open_issues_count
    });

      
}

function fetchGithubUser(username) {
  return fetch('https://api.github.com/users/' + username)
  .then(response => response.json())
  .catch(error => {
    console.error('Github user fetch failed!', error)
  })
}

function fetchUserRepos(user) {
  return fetch(user.repos_url)
  .then(response => response.json())
  .catch(error => {
    console.error('Github user repos fetch failed!', error)
  })
}

const fetchAndFill = async function() {
  var input = $('#username');
  var username = input.val();
  const user = await fetchGithubUser(username)
  if(user && user.id > 0) {
    showUser(user)
    const repos = await fetchUserRepos(user)
    console.log(repos)
    showRepos(repos)
  } else {
    var alert = document.getElementById("alert");
    alert.classList.remove("d-none");
    $('#alert').append('<h2>No such user found!</h2>');
  }
  console.log('username was: ' + username); 
};


$(document).ready(function() {
  $('#userform').submit(function(event) {
    event.preventDefault();    
  fetchAndFill();
  })
});

