function addDropDownMenuTrue(user) {
    const listItem = document.createElement('LI');
    listItem.className = 'dropdown';
   
    const itemLink = document.createElement('a');
    itemLink.className = 'dropdown-toggle';
    itemLink.setAttribute('data-toggle','dropdown'); //itemLink.data-toggle = "dropdown" using jQuery library
    itemLink.href = '#';
    itemLink.innerHTML = user.name; //need to give name attribute to user
    listItem.appendChild(itemLink);

    const dropdownSpan = document.createElement('span');
    dropdownSpan.className = 'caret';
    itemLink.appendChild(dropdownSpan);

    const dropMenu = document.createElement('UL');
    dropMenu.className ='dropdown-menu';
    dropMenu.setAttribute('style','background-color:rgb(123, 198, 233)');
    listItem.appendChild(dropMenu);

    //$(".dropdown-menu").append('<li><a href="/u/profile">Profile</a></li>');
    //$(".dropdown-menu").append('<li><a href="index.html" data-toggle="modal" data-target="#logoutModal">Logout</a></li>')


    const menuProfileItem = document.createElement('LI');
    dropMenu.appendChild(menuProfileItem);

    const menuProfileSpan = document.createElement('a');
    menuProfileSpan.href = '/u/profile?'+user._id;
    menuProfileSpan.innerHTML = 'Profile';
    menuProfileItem.appendChild(menuProfileSpan);


    const menuFeedItem = document.createElement('LI');
    dropMenu.appendChild(menuFeedItem);

    const menuFeedSpan = document.createElement('a');
    menuFeedSpan.href = '/u/todays-feed';
    menuFeedSpan.innerHTML = "Today's Feed";
    menuFeedItem.appendChild(menuFeedSpan);

    const menuFeedLock = document.createElement('img');
    menuFeedLock.className = "lock-asset";
    menuFeedLock.src = '/static/images/unlocked.png'
    menuFeedSpan.appendChild(menuFeedLock);

    const menuLogoutItem = document.createElement('LI');
    dropMenu.appendChild(menuLogoutItem);

    const menuLogoutSpan = document.createElement('a');
    //menuLogoutSpan.href = "#logoutModal";
    menuLogoutSpan.href = '/logout';
    menuLogoutSpan.className = "logout-tab";
    //$('.menuLogoutSpan').attr("data-toggle","modal");
    //$('.menuLogoutSpan').attr("data-target","#logoutModal");
    //menuLogoutSpan.setAttribute("data-toggle","modal");
    //menuLogoutSpan.setAttribute("data-target","#logoutModal");
    //$("#logoutModal").modal()
    menuLogoutSpan.innerHTML = 'Logout';
    menuLogoutItem.appendChild(menuLogoutSpan);

    return listItem;
}

function addDropDownMenuFalse(user) {
    const listItem = document.createElement('LI');
    listItem.className = 'dropdown';
   
    const itemLink = document.createElement('a');
    itemLink.className = 'dropdown-toggle';
    itemLink.setAttribute('data-toggle','dropdown'); //itemLink.data-toggle = "dropdown" using jQuery library
    itemLink.href = '#';
    itemLink.innerHTML = user.name; //need to give name attribute to user
    listItem.appendChild(itemLink);

    const dropdownSpan = document.createElement('span');
    dropdownSpan.className = 'caret';
    itemLink.appendChild(dropdownSpan);

    const dropMenu = document.createElement('UL');
    dropMenu.className ='dropdown-menu';
    dropMenu.setAttribute('style','background-color:rgb(123, 198, 233)');
    listItem.appendChild(dropMenu);

    const menuProfileItem = document.createElement('LI');
    dropMenu.appendChild(menuProfileItem);

    const menuProfileSpan = document.createElement('a');
    menuProfileSpan.href = '/u/profile?'+user._id;
    menuProfileSpan.innerHTML = 'Profile';
    menuProfileItem.appendChild(menuProfileSpan);


    const menuFeedItem = document.createElement('LI');
    dropMenu.appendChild(menuFeedItem);

    const menuFeedSpan = document.createElement('a');
    menuFeedSpan.onclick = function(){
        alert("You must submit a story to view today's feed.")};
    menuFeedSpan.innerHTML = "Today's Feed";
    menuFeedItem.appendChild(menuFeedSpan);

    const menuFeedLock = document.createElement('img');
    menuFeedLock.className = "lock-asset";
    menuFeedLock.src = '/static/images/locked.png';
    menuFeedSpan.appendChild(menuFeedLock);


    const menuLogoutItem = document.createElement('LI');
    dropMenu.appendChild(menuLogoutItem);

    const menuLogoutSpan = document.createElement('a');
    menuLogoutSpan.href = '/logout';
    menuLogoutSpan.className = "logout-tab";

    menuLogoutSpan.innerHTML = 'Logout';
    menuLogoutItem.appendChild(menuLogoutSpan);

    return listItem;
}


function renderLoginButton() {
    const listItem = document.createElement('LI');

    const itemLink = document.createElement('a');
    listItem.appendChild(itemLink);
    itemLink.href = '/auth/google';
    itemLink.innerText = "Login";

    return listItem;
}

function renderNavBar(user) { 
    console.log("render nav bar called");
    const navbarDiv = document.getElementById("innerNavBar");
    const currentDate = getCurrentDate();

    let currentSubmitStat = false;
    if(user._id !== undefined){
        get('/api/getsubmitstat', {'date': currentDate}, function(submitusers){
            console.log("after get submit stat and before for loop");
            for (let i=0; i<submitusers.length; i++) {
                if (submitusers[i].user_id === user._id){
                    console.log("matching user id found");
                    navbarDiv.appendChild(addDropDownMenuTrue(user));
                    currentSubmitStat = true;
                    console.log("user id defined & userSubmit true");
                    break;
                }
            }
            if(currentSubmitStat === false){
                navbarDiv.appendChild(addDropDownMenuFalse(user));
                console.log("usersubmit false");
            }
        });
        
    }          
    else {
        navbarDiv.appendChild(renderLoginButton());
    }
}
    
    


function updateNavBar(user) {
    const navbarDiv = document.getElementById("innerNavBar");
    navbarDiv.replaceChild(addDropDownMenuTrue(user),navbarDiv.children[3]);
    console.log("update navbar run");
}

