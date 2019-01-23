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
      newPostSubmitbutton.addEventListener('click',function(){ 
          alert("You must be logged in to submit a draft!");
      });
  }
  return(draftButton);
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

function renderButtons(user) {
  const newPostSubmit = document.getElementById('btnPost');
  newPostSubmit.appendChild(newPostSubmitButton(user));
  newPostSubmit.appendChild(newPostSaveButton(user));
}

function main() {
  userSubmit = false;
  const user = {
    _id: 'anonid',
    name: 'Anonymous',
    last_post: 'Anon was here',
  };
  renderNavBar(user);
  renderButtons(user);
}

main();