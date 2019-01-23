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



//configures the buttons on a newPost
function newPostDOMObject(user) {
    const newPostSubmit = document.getElementById('btnPost');
    saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'btnShow1');
    saveButton.innerText = 'Submit';
    if(user._id !== undefined) {
        saveButton.addEventListener('click', submitPostHandler);
        saveButton.addEventListener('click',function(){ 
            alert("Congrats on your submission!"); //successful submission popup
        });
        userSubmit = true;
        
    }
    else{
        saveButton.addEventListener('click',function(){ 
            alert("You must be logged in to submit!");
        });
        
    }
    newPostSubmit.appendChild(saveButton);

    draftButton = document.createElement('button');
    draftButton.setAttribute('id', 'btnShow2');
    draftButton.innerText = 'Save To Drafts';
    if(user._id !== undefined) {
        draftButton.addEventListener('click', saveDraftHandler);
        saveButton.addEventListener('click',function(){ 
            alert("Saved to drafts.");
        });
        userSubmit = false;
    }
    else{
        newPostSubmitbutton.addEventListener('click',function(){ 
            alert("You must be logged in to submit a draft!");
        });
    }
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


function saveDraftHandler() {
    const newDraftInput = document.getElementById('post-container');

    const input = {
        content: newDraftInput.value,
    };

    post('/api/draft', input);
}

function submitVoteHandler(postJSON) {

    post('/api/upvote', postJSON)
    // code to increase the number of upvotes in database    
}


// Makes API requests and calls helper functions
function renderPosts() {
    const postsDiv = document.getElementById('today-feed-container');
    get('/api/posts', {}, function(postsArr){
        for (let i =0; i < postsArr.length; i++) {
        const currentPost = postsArr[i];
        postsDiv.prepend(postDOMObject(currentPost, user));
        }
    });
}