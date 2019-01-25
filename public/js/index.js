//configures the buttons on a newPost
function newPostSubmitButton(user) {
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
  return(saveButton);
}

function newPostSaveButton(user){

  draftButton = document.createElement('button');
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
  newPostSubmit.appendChild(newPostSaveButton(user));
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
    


    /*const user = {
        _id: 'anonid',
        name: 'Anonymous',
        bio: 'Anon was here',
      };*/

    console.log("api/whoami success");
    renderNavBar(user, userSubmitStatus);
    renderButtons(user);
});
  
}

main();