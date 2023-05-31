document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', event => {
      event.preventDefault();
      const searchValue = searchInput.value.trim();
  
      if (searchValue !== '') {
        searchUsers(searchValue);
      }
    });
  
    function searchUsers(username) {
      fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(data => {
          userList.innerHTML = ''; // Clear previous search results
          data.items.forEach(user => {
            const userItem = document.createElement('li');
            const userLink = document.createElement('a');
            const userAvatar = document.createElement('img');
  
            userLink.href = user.html_url;
            userLink.textContent = user.login;
            userAvatar.src = user.avatar_url;
            userAvatar.alt = `${user.login}'s Avatar`;
  
            userItem.appendChild(userAvatar);
            userItem.appendChild(userLink);
            userList.appendChild(userItem);
  
            userLink.addEventListener('click', event => {
              event.preventDefault();
              showUserRepos(user.login);
            });
          });
        })
        .catch(error => {
          console.error('Error searching users:', error);
        });
    }
  
    function showUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
          reposList.innerHTML = ''; // Clear previous user's repositories
          data.forEach(repo => {
            const repoItem = document.createElement('li');
            const repoLink = document.createElement('a');
  
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.name;
  
            repoItem.appendChild(repoLink);
            reposList.appendChild(repoItem);
          });
        })
        .catch(error => {
          console.error('Error fetching user repositories:', error);
        });
    }
  });
  