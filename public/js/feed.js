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
  upvoteSpan.setAttribute('id', 'upvote id')
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
  buttonSpan.addEventListener('click',submitVoteHandler.bind(this,postJSON)); //updates votes in model
  //buttonSpan.addEventListener('click', updateVote.bind(this,postJSON) ) //user visually sees button update
  const x = postJSON.creator_id;
  buttonSpan.setAttribute('onclick','changePic(this)');
  upvoteSpan.appendChild(buttonSpan);

  const storySpan = document.createElement('div');
  storySpan.innerHTML = '<br>'+postJSON.content+'<br><br>';
  storySpan.setAttribute('style', 'text-align:left')
  contentSpan.appendChild(storySpan); 

  return card;
}

function renderFeedNavBar(user){
    const nameSpan = document.getElementById("feed navbar name");
    console.log(user.name);
    nameSpan.innerHTML = user.name;

    const profileSpan = document.getElementById("feed navbar profile");
    profileSpan.href = '/u/profile?'+user._id;

}

function changePic(e){
    e.innerHTML = '<br><br>'+'<img src="/static/images/hearti.png">' +  '<br><br>';
    e.disabled = true;
}

function updateVote(postJSON) {
    const upvoteSpan = document.getElementById('upvote id');
    upvoteSpan.innerHTML= '<br>'+ postJSON.creator_name +'<br><br>'+ (postJSON.upvotes+1) + "  " + 'upvotes'
}

function submitVoteHandler(postJSON) {
    /*post('/api/upvote', postJSON, function(post){
        const upvoteSpan = document.getElementById('upvote id');
        upvoteSpan.innerHTML= '<br>'+ post.creator_name +'<br><br>'+ (post.upvotes) + "  " + 'upvotes'
    })*/
    post('/api/upvote', postJSON);
    // code to increase the number of upvotes in database    
}

// Makes API requests and calls helper functions
function renderPosts() {
    const postsDiv = document.getElementById('today-feed-container');
    console.log("renderPosts called");

    const currentDate = getCurrentDate();
    console.log(currentDate);

    get('/api/todaysposts', {'date': currentDate}, function(postsArr){
        for (let i = 0; i < postsArr.length; i++) {
        const currentPost = postsArr[i];
        postsDiv.prepend(postDOMObject(currentPost));
        }
    });
}


    function main()
    {
        get('/api/whoami', {}, function(user) {
            if(user._id !== undefined){
                renderFeedNavBar(user);
                renderPosts();
            }
        });
    }

    main();


