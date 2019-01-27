function addDropDownMenu(user) {
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

    const menuLogoutItem = document.createElement('LI');
    dropMenu.appendChild(menuLogoutItem);

    const menuLogoutSpan = document.createElement('a');
    //menuLogoutSpan.href = "#logoutModal";
    //menuLogoutSpan.href = '/logout';
    menuLogoutSpan.className = "logout-tab";
    //$('.menuLogoutSpan').attr("data-toggle","modal");
    //$('.menuLogoutSpan').attr("data-target","#logoutModal");
    //menuLogoutSpan.setAttribute("data-toggle","modal");
    //menuLogoutSpan.setAttribute("data-target","#logoutModal");
    $("#logoutModal").modal()
    menuLogoutSpan.innerHTML = 'Logout';
    menuLogoutItem.appendChild(menuLogoutSpan);

    return listItem;
}

function updateTodaysFeed(userSubmit) {
    //const navbarDiv = document.getElementById("nav navbar-nav navbar-right");
    //$('li').eq(2).before('<li'>This is the text in new element. </li>');

}

function renderLoginButton() {
    const listItem = document.createElement('LI');

    const itemLink = document.createElement('a');
    listItem.appendChild(itemLink);
    itemLink.href = '/auth/google';
    itemLink.innerText = "Login";

    return listItem;
}

function renderNavBar(user, userSubmit) { //will need to define userSubmit as a boolean elsewhere
    const navbarDiv = document.getElementById("innerNavBar")
    
    if (user._id !== undefined && userSubmit) {
        navbarDiv.appendChild(addDropDownMenu(user));
        //code for adding profile to navBar
        console.log("user id defined & userSubmit true");
        
    }
    else if (user._id !== undefined){
        navbarDiv.appendChild(addDropDownMenu(user));
    }
    else {
        navbarDiv.appendChild(renderLoginButton());
        console.log("reached login button");
    }
}



/*<li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">username
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Profile</a></li>
              <li><a href="index.html" data-toggle="modal" data-target="#logoutModal">logout</a></li>
              <li><a class="isDisabled" href=''>Feed <img src="images/locked.png"></a></li>
          </ul>

<li><a href="index.html" data-toggle="modal" data-target="#registerModal">login</a></li> */


/* if (user is not undefined && userSubmit) {
    user dropdown bar
    today's feed image turns to unlock and button redirects to link

    }
    else if (user is not undefined) {
        user dropdown bar
    }
    else {
        login button
    } */