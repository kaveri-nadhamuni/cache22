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
  upvoteButton.onClick = 'submitVoteHandler()';
  card.appendChild(upvoteButton);
  return card;
}


/*function votesDOMObject(postJSON) {
}*/


//configures the buttons on a newPost
function newPostDOMObject(user) {
    const newPostSubmit = document.getElementById('btnPost');
    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'btnShow1');
    saveButton.innerText = 'Submit';
    if(user._id !== undefined) {
        saveButton.addEventListener('click', submitPostHandler);
        userSubmit = true;
        //successful submission popup
    }
    else{
        newPostSubmitbutton.addEventListener('click',function(){ alert("I am an alert box!");});
        
    }
        //finish code
    newPostSubmit.appendChild(saveButton);

    draftButton = document.createElement('button');
    draftButton.setAttribute('id', 'btnShow2');
    saveButton.innerText = 'Save To Drafts';
    newPostSubmit.appendChild(draftButton);


  
      /*<button id="btnShow1">Submit</button>
        <div id="alert1" class="alert alert-danger alert-dismissable">
            <button type="submit" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            You have to login first
        </div>
        <button id="btnShow2">Save To Drafts</button>
        <div id="alert2" class="alert alert-danger alert-dismissable">
            <button type="submit" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            You have to login first
        </div>*/

}

function submitPostHandler() {
    const newPostInput = document.getElementById('post-container');

    const input = {
        content: newPostInput.value,
    };

    post('/api/post', input);
    newPostInput.value = '';

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