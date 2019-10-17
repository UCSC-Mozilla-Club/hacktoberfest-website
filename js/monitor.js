
function getGithub() {
    let username = document.getElementById("username-box").value;
    let teamname = document.getElementById("teamname-box").value;
    if (username == "") {
        alert("Invalid Username");
    } else if (teamname == "") {
        alert("Invalid Team name");
    } else {

        //TODO: set time bound
        let urlbuilder = 'https://api.github.com/search/issues?q=created:>=2019-10-18..2019-10-22+is:pr+is:public+author:' + username + '+label:\"' + teamname + '\"';
        
        let teamUrlBuilder = 'https://api.github.com/search/issues?q=created:>=2019-10-18..2019-10-22+is:pr+is:public+label:\"' + teamname + '\"';
        
        let userUrlBuilder = 'https://api.github.com/users/' + username;

        // render user.error cause if there isn't any pr
        $.ajax({
            method: "GET",
            url: userUrlBuilder,
            dataType: "json",
            cache: false,
            success: function (response) {
                
                    if(response.message != "Not Found"){

                    //Welcome Text
                    document.getElementById("welcome-title").innerHTML = "Welcome " + response.name;

                    //Profile Picture
                    document.getElementById("profile-pic").src = response.avatar_url;

                }
            }
        });

        $.ajax({
            method: "GET",
            url: urlbuilder,
            dataType: "json",
            cache: false,
            success: function (response) {
                console.log(response.total_count);

                // Contributions Count
                document.getElementById("contributions-user").innerHTML = "Your Contributions: " + response.total_count;
                

                //CleanUP Div
                document.getElementById("progress-list").innerHTML = "";

                //PRs
                for (let i = 0; i < response.items.length; i++) {
                    let element = document.getElementById("progress-list")
                    element.innerHTML = element.innerHTML +
                        " <li class='mb2'>" +
                        "<div>" +
                        "<h4>" + response.items[i].repository_url.substr(29) + "</h4>" +
                        "<h6>" + response.items[i].title + "</h6>" +
                        "</div>" +
                        "</li>"
                        ;
                }
            }
        });

        $.ajax({
            method: "GET",
            url: teamUrlBuilder,
            dataType: "json",
            cache: false,
            success: function (response) {
                console.log(response.total_count);

                //team name
                document.getElementById("contributions-team-name").innerHTML = "Team: " + teamname[0].toUpperCase() + teamname.slice(1).toLowerCase();

                // Contributions Count
                document.getElementById("contributions-team").innerHTML = "Team Contributions: " + response.total_count;
                

                //CleanUP Div
                document.getElementById("progress-list-team").innerHTML = "";

                //PRs
                for (let i = 0; i < response.items.length; i++) {
                    let element = document.getElementById("progress-list-team")
                    element.innerHTML = element.innerHTML +
                        " <li class='mb2'>" +
                        "<div>" +
                        "<h4>" + response.items[i].repository_url.substr(29) + "<span style=\"color: #5c5c5c\"> ("+ response.items[i].user.login +")<span></h4>" +
                        "<h6>" + response.items[i].title + "</h6>" +
                        "</div>" +
                        "</li>"
                        ;
                }
            }
        });

        //Show the Div and scroll
        document.getElementById("cont-div").style.display = "block";
        window.scrollTo(0, 500);
    }
}
