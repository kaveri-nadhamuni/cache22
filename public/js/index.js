//Shows up hall of fame objects
function postHallOfFameDOMObject(postJSON) {
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

  const promptSpan = document.createElement('div');
  promptSpan.innerHTML = '<b>'+'prompt'+'<b>';
  contentSpan.appendChild(promptSpan);

  const storySpan = document.createElement('div');
  storySpan.innerHTML = '<br>'+postJSON.content+'<br><br>';
  storySpan.setAttribute('style', 'text-align:left')
  contentSpan.appendChild(storySpan); 

  return card;
}

//creates HTML element for a Submit button that executes based on status of user
function newPostSubmitButton(user) {
  saveButton = document.createElement('button');
  saveButton.setAttribute('style','border-radius:10px; border-width:0px; background-color:plum;padding: 15px 32px;');
  saveButton.setAttribute('id', 'btnShow1');
  saveButton.innerText = 'Submit';
  if(user._id !== undefined) {
    saveButton.addEventListener('click', function() {
        submitPostHandler(user)
    });
    saveButton.addEventListener('click',function(){ 
        alert("Congrats on your submission!"); //successful submission popup
    });
  }
  else{
      saveButton.addEventListener('click', function(){ 
          alert("You must be logged in to submit!");
      });
      
  }
  return(saveButton);
}

//creates HTML element for a Save To Drafts button that executes based on status of user
function newPostSaveButton(user){

  draftButton = document.createElement('button');
  draftButton.setAttribute('style','border-radius:10px;border-width:0px; background-color:plum;padding: 15px 32px;');
  draftButton.setAttribute('id', 'btnShow2');
  draftButton.innerText = 'Save To Drafts';
  if(user._id !== undefined) {
      draftButton.addEventListener('click', function() {
          saveDraftHandler(user)
        });
      draftButton.addEventListener('click',function(){ 
          alert("Saved to drafts.");
      });
      userSubmit = false;
  }
  else{
      draftButton.addEventListener('click',function(){ 
          alert("You must be logged in to submit a draft!");
      });
  }
  return(draftButton);
}

//submits user post to database
function submitPostHandler(user) {
  const newPostInput = document.getElementById('post-container');
  let currentPrompt = '';

  get('/api/getprompt', {}, function(prompt){
    currentPrompt = prompt.prompt;

    const currentDate = getCurrentDate();

    const input = {
        creator_id: user._id,
        creator_name: user.name,
        content: newPostInput.value,
        prompt: currentPrompt,
        date: currentDate,
        upvotes: 0,
    };

  post('/api/post', input);
  newPostInput.value = '';


  post('/api/submitStatusTrue', {'_id': user._id});

  updateNavBar(user);
  });
  

}

//submits user draft to database
function saveDraftHandler(user) {
  const newDraftInput = document.getElementById('post-container');
  console.log(newDraftInput.value + "<--- there should be the text");
  let currentPrompt = '';

  get('/api/getprompt', {}, function(prompt){
    currentPrompt = prompt.prompt;
    console.log(currentPrompt); //test draft

    const currentDate = getCurrentDate();

    const input = {
        creator_id: user._id,
        creator_name: user.name,
        content: newDraftInput.value,
        prompt: currentPrompt,
        date: currentDate,
    };    

  post('/api/draft', input);

  });

  
}

//returns current date
function getCurrentDate(){
    const current = new Date();
    const currentYearNum = current.getFullYear();
    const currentMonthNum = current.getMonth()+1;
    const currentDateNum = current.getDate(); 

    const currentYearStr = currentYearNum.toString();
    const currentMonthStr = currentMonthNum.toString();
    const currentDateStr = currentDateNum.toString();
    //change number type to string type
    today = currentMonthStr + '/' + currentDateStr + '/' + currentYearStr;
    console.log(today + "from index.js");

    return today
}

//appends buttons and passes in user 
function renderButtons(user) {
    console.log("renderButtons function called");
  const newPostSubmit = document.getElementById('btnPost');
  newPostSubmit.appendChild(newPostSubmitButton(user));
  const spanCard = document.createElement('span');
  spanCard.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
  newPostSubmit.appendChild(spanCard);
  newPostSubmit.appendChild(newPostSaveButton(user));
}

//appends prompt text to HTML and updates automatically using socket.io when prompt object changes
function renderPrompt(prompt) {
    const promptDiv = document.getElementById("prompt-container");
    promptDiv.innerHTML = prompt.prompt;
    console.log("reached initial prompt generate")

    const socket = io();
    socket.on('prompt', function(prompt){
        const promptDiv = document.getElementById("prompt-container");
        promptDiv.innerHTML = prompt.prompt;
    });
   
}



function main() {
        get('/api/whoami', {}, function(user) {
            console.log(user);
            //test
            if (user._id !== undefined){
                console.log("user defined");
            }
            else {
                console.log("user undefined");
            }   
            //append dynamic navbar
            renderNavBar(user);

            //append buttons 
            renderButtons(user);
        });
    
        get('/api/getprompt', {}, function(prompt){
            renderPrompt(prompt);
        });
      
    }
    
main();
