(async () => {
    const userRawData = await fetch('../api/userData/')
    const userData = await userRawData.json()
    localStorage.setItem('userData', JSON.stringify(userData))
    username_field.innerText = userData.username

    const postsRawData = await fetch('../api/userPosts')
    const userPosts = await postsRawData.json()
    if(userPosts.posts.length == 0) return posts_list.innerHTML = '<p>No posts yet!</p>'
    userPosts.posts.forEach(post => {
        const li = document.createElement('li')
        li.innerHTML = `<div><h2>${post.post_name}</h2><div class="content"><p>${post.post_content}</p></div>
        <p>Date: ${post.post_timestamp.split('T')[0].split('-').reverse().join('/')}</p>
        <button onClick="(() => {
            fetch('../api/deletePost/${post.id}', { method: 'DELETE' })
            window.location.reload()
        })()" 
        id="${post.id}" class="delete-button">Delete</button>
        </div>`
        posts_list.appendChild(li)
    })
})()

function logoutUser(){
  fetch('../api/logout', {
    method: 'PUT',
    body: localStorage.getItem('userData')
  })
  localStorage.removeItem('userData')
  window.location.href = '../'
}

function deleteUser(){
  fetch('../../api/deleteUser', {
    method: 'DELETE',
  })
  window.location.href = '../'
}


function setMenu(){
  const menu = document.querySelector('#mobile-menu')
  if(menu.classList.toString().includes('show')){
    menu.classList.remove('show')
  }else{
    menu.classList.add('show')
  }
}