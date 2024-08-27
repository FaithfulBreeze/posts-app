(async () => {

    const postsRawData = await fetch('../api/feedPosts')
    const postsData = await postsRawData.json()
    if(postsData.posts.length == 0) return posts_list.innerHTML = '<p>No posts yet!</p>'
    postsData.posts.forEach(post => {
        const li = document.createElement('li')
        li.innerHTML = `<div><h2>${post.post_name}</h2>
          <p><a href="/author/${post.owner}">Author: ${post.users.username}</p></a><div class="content"><p>${post.post_content}</p></div>
          <p>Date: ${post.post_timestamp.split('T')[0].split('-').reverse().join('/')}</p>
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

function setMenu(){
  const menu = document.querySelector('#mobile-menu')
  if(menu.classList.toString().includes('show')){
    menu.classList.remove('show')
  }else{
    menu.classList.add('show')
  }
}