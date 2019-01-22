const API_ENDPOINT_START = 'http://google-catbook.herokuapp.com';

// GET /api/stories fetches all stories
// GET /api/comment fetches all comments for a story, given the story's id (passed as the 'parent' parameter)

// {
//   _id: "5a53b37189c7bb15141e9e40",
//   creator_name: "Danny Tang", 
//   content: "I don't have any cats now, but this web app has inspired me to adopt 10!"
// }

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
  creatorSpan.innerHTML = psotJSON.creator_name;
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
  upvoteButton.onClick = 'submitVoteHandler()';
  card.appendChild(upvoteButton);
  return card;
}

// {
//   _id: "5a53ba14a6078f28283eb9a1",
//   creator_name: "Rupayan Neogy", 
//   parent: "5a53b37189c7bb15141e9e40", 
//   content: "I think a good name is Winston"
// }

// Creates a comment block for a story
function votesDOMObject(postJSON) {
}

function submitPostHandler() {
}

function newPostDOMObject() {

}

function submitVoteHandler() {
    let el = document.getElementById('upvote-number');
    var integerVote = parseInt(postJSON.upvotes, 10);
    el.innerText = integerVote + 1;
    // code to increase the number of upvotes in database    
}


// Makes API requests and calls helper functions
function renderStories() {
}