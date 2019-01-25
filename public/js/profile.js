function postDOMObject(postJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', postJSON._id);
  card.className = 'post card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const creatorSpan = document.createElement('div');
  creatorSpan.className = 'story-creator card-title';
  creatorSpan.innerHTML = postJSON.creator_name;
  cardBody.appendChild(creatorSpan);

  const contentSpan = document.createElement('p');
  contentSpan.className = 'story-content card-text';
  contentSpan.innerHTML = postJSON.content;
  cardBody.appendChild(contentSpan);

  const numberOfUpvotes = document.createElement('span');
  numberOfUpvotes.className = 'upvote-number';
  numberOfUpvotes.innerHTML = postJSON.upvotes;
  card.appendChild(numberOfUpvotes);

  return card;
}

function draftDOMObject(draftJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', draftJSON._id);
  card.className = 'post card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const creatorSpan = document.createElement('div');
  creatorSpan.className = 'story-creator card-title';
  creatorSpan.innerHTML = draftJSON.creator_name;
  cardBody.appendChild(creatorSpan);

  const contentSpan = document.createElement('p');
  contentSpan.className = 'story-content card-text';
  contentSpan.innerHTML = draftJSON.content;
  cardBody.appendChild(contentSpan);

  return card;
}




function renderUserData(user) {
    // rendering name
	const nameContainer = document.getElementById('name-container');
	nameContainer.innerText = user.creator_name;
	const bioContainer = document.getElementById('bio-container');
	bioContainer.innerText = user.bio;

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
    postsDiv.prepend(draftDOMObject(currentPost));
  }

}
//call get function that specifies all posts with creator_id that matches user._id

function main() {
  /*const profileId = window.location.search.substring(1);
  get('/api/user', {'_id': profileId}, function(profileUser) {

  
    renderUserData(profileUser);
  });
  get('/api/whoami', {}, function(user) {
    renderNavbar(user);
  });

  get('/api/userposts', {'creator_id': user._id}, function(userPosts){
    renderUserPosts(userPosts);
  });

  get('/api/userdrafts', {'creator_id': user._id}, function(userDrafts){
    renderUserDrafts(userDrafts);
  });

});*/


  const dummyUser = {
    _id: 'anonid',
    name: 'Anonymous-test',
    bio: 'Anon was here',
  };

  const postDummy = {
    creator_id: "12345667",
    creator_name: "anonnnymous",
    content: "this is my story",
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
    content: "This is my draft",
    timestamp: "1:0:0"
  };

  const draftDummy2 = {
    creator_id: "12233445",
    creator_name: "anonymous2",
    content: "This is my draft",
    timestamp: "1:0:0"
  };

  renderUserData(dummyUser);
  renderNavBar(dummyUser);
  postDOMObject(postDummy);
  draftDOMObject(draftDummy);
}

main();