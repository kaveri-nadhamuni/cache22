function postDOMObject(postJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', postJSON._id);
  card.innerHTML = '<br><br><br>'
  card.className = 'post card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.setAttribute('style','background-image:url(/static/images/paper.jpg);');

  card.appendChild(cardBody);

  const rowSpan = document.createElement('div');
  rowSpan.className = 'row ';
  rowSpan.setAttribute('style','display:flex');
  cardBody.appendChild(rowSpan);  

  const creatorSpan = document.createElement('span');
  rowSpan.appendChild(creatorSpan);


  const upvoteSpan = document.createElement('div');
  upvoteSpan.className = 'col-sm-3 ';
  upvoteSpan.innerHTML= '<br>'+postJSON.date+'<br>'+ postJSON.upvotes + "  ";
  creatorSpan.appendChild(upvoteSpan);

  const imageSpan = document.createElement('img');
  imageSpan.setAttribute('src','/static/images/heart.png');
  upvoteSpan.appendChild(imageSpan);

  const contentSpan = document.createElement('div');
  contentSpan.className = 'col-sm-9';
  contentSpan.setAttribute('style','background-image:url(/static/images/page.jpg);');

  creatorSpan.appendChild(contentSpan);

  const promptSpan = document.createElement('div');
  promptSpan.innerHTML = '<b>'+postJSON.prompt+'<b>';
  contentSpan.appendChild(promptSpan);

  const storySpan = document.createElement('div');
  storySpan.innerHTML = '<br>'+postJSON.content+'<br><br>';
  storySpan.setAttribute('style', 'text-align:left')
  contentSpan.appendChild(storySpan); 

  return card;
}

function draftDOMObject(draftJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', draftJSON._id);
  card.innerHTML = '<br><br><br>'
  card.className = 'post card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.setAttribute('style','background-image:url(/static/images/paper.jpg);');

  card.appendChild(cardBody);

  const rowSpan = document.createElement('div');
  rowSpan.className = 'row';
  rowSpan.setAttribute('style','display:flex');
  cardBody.appendChild(rowSpan);  

  const creatorSpan = document.createElement('span');
  rowSpan.appendChild(creatorSpan);

  const timeSpan = document.createElement('div');
  timeSpan.className = 'col-sm-3';
  timeSpan.innerHTML= '<br><br>'+ draftJSON.date + "  ";
  creatorSpan.appendChild(timeSpan);


  const contentSpan = document.createElement('div');
  contentSpan.className = 'col-sm-9';
  contentSpan.setAttribute('style','background-image:url(/static/images/page.jpg);');
  creatorSpan.appendChild(contentSpan);

  const promptSpan = document.createElement('div');
  promptSpan.innerHTML = '<b>'+draftJSON.prompt+'<b>';
  contentSpan.appendChild(promptSpan);

  const storySpan = document.createElement('div');
  storySpan.innerHTML = '<br>'+draftJSON.content+'<br><br>';
  storySpan.setAttribute('style', 'text-align:left')
  contentSpan.appendChild(storySpan); 

  return card;
}




function renderUserData(user) {
    // rendering name
  const nameContainer = document.getElementById('name-container');
  nameContainer.innerHTML = user.name;
  
}

function renderUserPosts(postsArr) {
  console.log("renderUserPosts");
  const postsDiv = document.getElementById('user-story-container'); 
  for (let i = 0; i < postsArr.length; i++) {
    const currentPost = postsArr[i];
    postsDiv.prepend(postDOMObject(currentPost));
  }
  
}

function renderUserDrafts(draftsArr) {
  console.log("renderUserDrafts");
  const draftsDiv = document.getElementById('user-draft-container');
  for (let i = 0; i < draftsArr.length; i++) {
    const currentPost = draftsArr[i];
    draftsDiv.prepend(draftDOMObject(currentPost));
  }

}
//call get function that specifies all posts with creator_id that matches user._id

function renderProfile() {
  const profileId = window.location.search.substring(1);
  get('/api/user', {'_id': profileId}, function(profileUser) {
    renderUserData(profileUser);
  });

  get('/api/whoamiprofile', {}, function(user) {
    console.log("profile navbar loaded");
    renderNavBar(user);
  });


  get('/api/userposts', {'creator_id': profileId}, function(userPosts){
    renderUserPosts(userPosts);
  });

  get('/api/userdrafts', {'creator_id': profileId}, function(userDrafts){
    renderUserDrafts(userDrafts);
  });

}

renderProfile();
