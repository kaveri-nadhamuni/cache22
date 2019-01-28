function postDOMObject(postJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', postJSON._id);
  card.innerHTML = '<br><br><br>'
  card.className = 'post card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.setAttribute('style','background-image:url(/static/images/notebook.jpg);');

  card.appendChild(cardBody);

  const rowSpan = document.createElement('div');
  rowSpan.className = 'row ';
  cardBody.appendChild(rowSpan);  

  const creatorSpan = document.createElement('span');
  rowSpan.appendChild(creatorSpan);

  const upvoteSpan = document.createElement('div');
  upvoteSpan.className = 'col-sm-3 ';
  upvoteSpan.innerHTML= '<br><br>'+ postJSON.upvotes + "  ";
  creatorSpan.appendChild(upvoteSpan);

  const imageSpan = document.createElement('img');
  imageSpan.setAttribute('src','/static/images/heart.png');
  upvoteSpan.appendChild(imageSpan);

  const contentSpan = document.createElement('div');
  contentSpan.className = 'col-sm-9';
  contentSpan.setAttribute('style','background-image:url(/static/images/page.jpg);');

  creatorSpan.appendChild(contentSpan);

  const promptSpan = document.createElement('div');
  promptSpan.innerHTML = '<b>'+'prompt'+'<b>';
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
  cardBody.setAttribute('style','background-image:url(/static/images/notebook.jpg);');

  card.appendChild(cardBody);

  const rowSpan = document.createElement('div');
  rowSpan.className = 'row';
  cardBody.appendChild(rowSpan);  

  const creatorSpan = document.createElement('span');
  rowSpan.appendChild(creatorSpan);

  const upvoteSpan = document.createElement('div');
  upvoteSpan.className = 'col-sm-3';
  upvoteSpan.innerHTML= '<br><br>'+ draftJSON.timestamp + "  ";
  creatorSpan.appendChild(upvoteSpan);


  const contentSpan = document.createElement('div');
  contentSpan.className = 'col-sm-9';
  contentSpan.setAttribute('style','background-image:url(/static/images/page.jpg);');
  creatorSpan.appendChild(contentSpan);

  const promptSpan = document.createElement('div');
  promptSpan.innerHTML = '<b>'+'prompt'+'<b>';
  contentSpan.appendChild(promptSpan);

  const storySpan = document.createElement('div');
  storySpan.innerHTML = '<br>'+draftJSON.content+'<br><br>';
  storySpan.setAttribute('style', 'text-align:left')
  contentSpan.appendChild(storySpan); 

  return card;
  return card;
}




function renderUserData(user) {
    // rendering name
  const nameContainer = document.getElementById('name-container');
  nameContainer.innerText = user.name;
  

  // rendering profile image
  /*const profileImage = document.getElementById('profile-image');
  profileImage.style = 'background-image:url(https://i.pinimg.com/736x/98/e0/7d/98e07decc7c1ca58236995de3567e46a--cat-shirts-kitties-cutest.jpg)';*/

  // rendering total upvotes
  /*const latestPostCard = document.getElementById('latest-post-card');

  const creatorSpan = document.createElement('a');
  creatorSpan.className = 'story-creator card-title';
  creatorSpan.innerHTML = user.name;
  creatorSpan.setAttribute('href', '/u/profile?'+user._id);
  latestPostCard.appendChild(creatorSpan);

  const latestPost = document.createElement('p');
  latestPost.className = 'story-content card-text';
  latestPost.innerHTML = user.last_post;
  latestPostCard.appendChild(latestPost);*/ //copied and pasted from catbook
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
  const draftsDiv = document.getElementById('user-draft-container');
  for (let i = 0; i < draftsArr.length; i++) {
    const currentPost = draftsArr[i];
    draftsDiv.prepend(draftDOMObject(currentPost));
  }

}
//call get function that specifies all posts with creator_id that matches user._id

function main() {
  const profileId = window.location.search.substring(1);
  get('/api/user', {'_id': profileId}, function(profileUser) {
    renderUserData(profileUser);
  });

  get('/api/whoami', {}, function(user) {
    renderNavbar(user);
  });

  console.log(profileId);
  get('/api/userposts', {'creator_id': profileId}, function(userPosts){
    renderUserPosts(userPosts);
  });

  get('/api/userdrafts', {'creator_id': profileId}, function(userDrafts){
    renderUserDrafts(userDrafts);
  });

}


  /*const dummyUser = {
    _id: 'anonid',
    name: 'Anonymous-test',
    bio: 'Anon was here',
  };

  const postDummy = {
    creator_id: "12345667",
    creator_name: "anonnnymous",
    content: "this is my story:The following list of cat breeds includes only domestic cat breeds and domestic × wild hybrids. The list includes established breeds recognized by various cat registries, new and experimental breeds, landraces being established as standardized breeds, distinct domestic populations not being actively developed, and lapsed (extinct) Inconsistency in breed classification and naming among registries means that an individual animal may be considered different breeds by different registries (though not necessarily eligible for registry in them all, depending on its exact ancestry). ",

    upvotes: 3,
    timestamp: "0:0:0"
  };

  const postDummy2 = {
    creator_id: "13434533",
    creator_name: "anonnnymous2",
    content: "this is my story2",
    upvotes: 3,
    timestamp: "0:0:0"
  };

  const draftDummy = {
    creator_id: "12233445",
    creator_name: "anonymous1",
    content:"this is my story:The following list of cat breeds includes only domestic cat breeds and domestic × wild hybrids. The list includes established breeds recognized by various cat registries, new and experimental breeds, landraces being established as standardized breeds, distinct domestic populations not being actively developed, and lapsed (extinct) Inconsistency in breed classification and naming among registries means that an individual animal may be considered different breeds by different registries (though not necessarily eligible for registry in them all, depending on its exact ancestry). ",
    timestamp: "1:0:0"
  };

  const draftDummy2 = {
    creator_id: "12233445",
    creator_name: "anonymous2",
    content: "This is my draft",
    timestamp: "1:0:0"
  };*/

  /*let dummyPostArr = [postDummy, postDummy2];
  let dummyDraftArr = [draftDummy, draftDummy2]; 
  renderUserData(dummyUser);
  renderNavBar(dummyUser);
  renderUserPosts(dummyPostArr);
  renderUserDrafts(dummyDraftArr);*/


main();
