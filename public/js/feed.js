const API_ENDPOINT_START = 'http://cache22.herokuapp.com';

// GET /api/stories fetches all stories
// GET /api/comment fetches all comments for a story, given the story's id (passed as the 'parent' parameter)


// Creates an html block for a story
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

  

  const upvoteSpan = document.createElement('div');
  upvoteSpan.className = 'col-sm-3 ';
  upvoteSpan.innerHTML= '<br>'+ postJSON.creator_name +'<br><br>'+ postJSON.upvotes + "  " + 'upvotes';
  rowSpan.appendChild(upvoteSpan);


  const contentSpan = document.createElement('div');
  contentSpan.className = 'col-sm-9';
  contentSpan.setAttribute('style','background-image:url(/static/images/page.jpg);');

  rowSpan.appendChild(contentSpan);

  const buttonSpan = document.createElement('button');
  buttonSpan.setAttribute('style','background:  transparent; border-width: 0px');
  buttonSpan.innerHTML = '<br><br>'+'<img src="/static/images/hearta.png">' + '<br><br>';
  buttonSpan.addEventListener('click',submitVoteHandler(postJSON));
  const x = postJSON.creator_id;
  buttonSpan.setAttribute('onclick','changePic(this)');
  upvoteSpan.appendChild(buttonSpan);
    

  const promptSpan = document.createElement('div');
  promptSpan.innerHTML = '<b>'+'prompt'+'<b>';
  contentSpan.appendChild(promptSpan);

  const storySpan = document.createElement('div');
  storySpan.innerHTML = '<br>'+postJSON.content+'<br><br>';
  storySpan.setAttribute('style', 'text-align:left')
  contentSpan.appendChild(storySpan); 

  return card;
}

function renderFeedNavBar(user){
    const nameDiv = document.getElementById("feed navbar name");
    console.log(user.name);
    nameDiv.innerHTML = user.name;
}

function changePic(e){
    e.innerHTML = '<br><br>'+'<img src="/static/images/hearti.png">' +  '<br><br>';
    e.disabled = true;
}

function submitVoteHandler(postJSON) {
    post('/api/upvote', postJSON)
    // code to increase the number of upvotes in database    
}

// Makes API requests and calls helper functions
function renderPosts(user) {
    const postsDiv = document.getElementById('today-feed-container');

    const currentDate = getCurrentDate();

    get('/api/todaysposts', {'date': currentDate}, function(postsArr){
        for (let i = 0; i < postsArr.length; i++) {
        const currentPost = postsArr[i];
        postsDiv.prepend(postDOMObject(currentPost, user));
        }
    });
}

    /*const postDummy = {
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

    dummyArr = [postDummy, postDummy2,postDummy3, postDummy4];*/

    function main()
    {
        get('/api/whoami', {}, function(user) {
            renderFeedNavBar(user);
            renderPosts(user);
          });
        
    }

    main();


