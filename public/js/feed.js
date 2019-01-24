const API_ENDPOINT_START = 'http://cache22.herokuapp.com';

// GET /api/stories fetches all stories
// GET /api/comment fetches all comments for a story, given the story's id (passed as the 'parent' parameter)


// Creates an html block for a story
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


  const upvoteButton = document.createElement('button');
  upvoteButton.innerText = 'Upvote';
  upvoteButton.className = 'upvote-button(postJSON)';
  upvoteButton.addEventListener('click', submitVoteHandler(postJSON));
  card.appendChild(upvoteButton);
  return card;
}

function submitVoteHandler(postJSON) {
    post('/api/upvote', postJSON)
    // code to increase the number of upvotes in database    
}

// Makes API requests and calls helper functions
function renderPosts() {
    const postsDiv = document.getElementById('today-feed-container');
    get('/api/posts', {}, function(postsArr){
        for (let i = 0; i < postsArr.length; i++) {
        const currentPost = postsArr[i];
        postsDiv.prepend(postDOMObject(currentPost, user));
        }
    });
}