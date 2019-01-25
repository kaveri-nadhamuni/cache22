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
function renderPosts(postsArr) {
    /*const postsDiv = document.getElementById('today-feed-container');
    get('/api/posts', {}, function(postsArr){
        for (let i = 0; i < postsArr.length; i++) {
        const currentPost = postsArr[i];
        postsDiv.prepend(postDOMObject(currentPost, user));
        }
    });*/

    let postsDiv = document.getElementById("today-feed-container"); 
    for (let i = 0; i < postsArr.length; i++) {
        const currentPost = postsArr[i];
        postsDiv.prepend(postDOMObject(currentPost));
    }
}

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
    
    const postDummy3 = {
        creator_id: "12233445",
        creator_name: "anonymous1",
        content:"this is my story:The following list of cat breeds includes only domestic cat breeds and domestic × wild hybrids. The list includes established breeds recognized by various cat registries, new and experimental breeds, landraces being established as standardized breeds, distinct domestic populations not being actively developed, and lapsed (extinct) Inconsistency in breed classification and naming among registries means that an individual animal may be considered different breeds by different registries (though not necessarily eligible for registry in them all, depending on its exact ancestry). ",
        upvotes: 2,
        timestamp: "1:0:0"
    };
    
    const postDummy4 = {
        creator_id: "12233445",
        creator_name: "anonymous2",
        content: "This is my draft",
        upvotes: 4,
        timestamp: "1:0:0"
    };

    dummyArr = [postDummy, postDummy2,postDummy3, postDummy4];

    function main()
    {
        renderPosts(dummyArr);
    }

    main();


