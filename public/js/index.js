//configures the buttons on a newPost
function newPostSubmitButton(user) {
  saveButton = document.createElement('button');
  saveButton.setAttribute('style','border-radius:10px; border-width:0px; background-color:plum;padding: 15px 32px;');
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
  return(saveButton);
}

function newPostSaveButton(user){

  draftButton = document.createElement('button');
  draftButton.setAttribute('style','border-radius:10px;border-width:0px; background-color:plum;padding: 15px 32px;');
  draftButton.setAttribute('id', 'btnShow2');
  draftButton.innerText = 'Save To Drafts';
  if(user._id !== undefined) {
      draftButton.addEventListener('click', saveDraftHandler);
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

function submitPostHandler() {
  const newPostInput = document.getElementById('post-container');

  const input = {
      content: newPostInput.value,
      upvotes: 0,
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

function renderButtons(user) {
  const newPostSubmit = document.getElementById('btnPost');
  newPostSubmit.appendChild(newPostSubmitButton(user));
  const spanCard = document.createElement('span');
  spanCard.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
  newPostSubmit.appendChild(spanCard);
  newPostSubmit.appendChild(newPostSaveButton(user));
}

function renderPrompt(prompt) {
    const promptDiv = document.getElementById("prompt-container");
    promptDiv.innerHTML = prompt.prompt;

    const socket =io();
    socket.on('prompt', function(prompt){
        const promptDiv = document.getElementById("prompt-container");
        promptDiv.innerHTML = prompt.prompt;
    });
   
}


function main() {

userSubmitStatus = false;
    get('/api/whoami', {}, function(user) {
        console.log(user);
        //test
        if (user._id !== undefined){
            console.log("user defined");
        }
        else {
            console.log("user undefined");
        }   
        renderNavBar(user, userSubmitStatus);
        renderButtons(user);
    });

    get('/api/getprompt', {}, function(prompt){
        renderPrompt(prompt);

});
  
}

main();