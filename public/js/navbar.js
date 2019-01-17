function addDropDownMenu(user) {
    const listItem = document.createElement('LI');
    listItem.className = "dropdown";

    const itemLink = document.createElement('a');
    itemLink.className = "dropdown-toggle"
    $(".dropdown-toggle").attr("data-toggle","dropdown"); //itemLink.data-toggle = "dropdown"
    itemLink.href = "#";
    itemLink.innerHTML = user.name; //need to give name attribute to user
    listItem.appendChild(itemLink);

    const dropdownSpan = document.createElement("span");
    dropdownSpan.className = "caret";
    itemLink.appendChild(dropdownSpan);

    const dropMenu = document.createElement('UL');
    dropMenu.className = "dropdown-menu";
    listItem.appendChild(dropMenu);

    const menuProfileItem = document.createElement('LI');
    dropMenu.appendChild(menuProfileItem);

    const menuProfileSpan = document.createElement('a');
    menuProfileSpan.href = "#";
    menuProfileSpan.innerHTML = "Profile";
    menuProfileItem.appendChild(menuProfileSpan);

    const menuLogoutItem = document.createElement('LI');
    dropMenu.appendChild(menuLogoutItem);

    const menuLogoutSpan = document.createElement('a');
    menuLogoutSpan.href = "index.html";
    menuLogoutSpan.className = "logout-tab"
    $(".logout-tab").attr("data-toggle","modal");
    $(".logout-tab").attr("data-target","#logoutModal");
    menuLogoutSpan.innerHTML = "Logout";
    menuLogoutItem.appendChild(menuLogoutSpan);

    return listItem;
}

function renderNavBar(user, userSubmit) { //will need to define userSubmit as a boolean elsewhere
    const navbarDiv = document.getElementById("nav navbar-nav navbar-right")
    
    if (user._id !== undefined && userSubmit) {
        navbarDiv.appendChild(addDropDownMenu(user));
        //code for adding profile to navBar
    }
    else if (user._id !== undefined){
        navbarDiv.appendChild(addDropDownMenu(user));
    }
    else {
        //code for login button
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