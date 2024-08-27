(async () => {
    const userRawData = await fetch(`../api/userData/${window.location.pathname.split('/')[2]}`)
    const userData = await userRawData.json()
    author_field.innerText = userData.username

    const postsRawData = await fetch(`../api/userPosts/${window.location.pathname.split('/')[2]}`)
    const userPosts = await postsRawData.json()
    userPosts.posts.forEach(post => {
        const li = document.createElement('li')
        li.innerHTML = `<div><h2>${post.post_name}</h2><div class="content"><p>${post.post_content}</p></div>
        <p>Date: ${post.post_timestamp.split('T')[0].split('-').reverse().join('/')}</p></div>`
        posts_list.appendChild(li)
    })
})()

function setMenu(){
  const menu = document.querySelector('#mobile-menu')
  if(menu.classList.toString().includes('show')){
    menu.classList.remove('show')
  }else{
    menu.classList.add('show')
  }
}