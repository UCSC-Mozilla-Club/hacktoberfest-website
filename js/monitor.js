
function getGithub() {
    let username = document.getElementById("username-box").value;
    let teamname = document.getElementById("teamname-box").value;
    if (username == "") {
        alert("Invalid Username");
    } else if (teamname == "") {
        alert("Invalid Team name");
    } else {
        let urlbuilder = 'https://api.github.com/search/issues?q=created:>=2019-10-01+is:pr+is:public+author:' + username + '+label:\"' + teamname + '\"';
        
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

                //Welcome Text
                // document.getElementById("welcome-title").innerHTML = "Welcome " + response.items[0].user.login;

                //Profile Picture
                // document.getElementById("profile-pic").src = response.items[0].user.avatar_url;

                // Contributions Count
                document.getElementById("contributions").innerHTML = "Contributions on team " + teamname[0].toUpperCase() + teamname.slice(1).toLowerCase() + ": " + response.total_count;

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

        //Show the Div and scroll
        document.getElementById("cont-div").style.display = "block";
        window.scrollTo(0, 500);


        // Http Request
        // const Http = new XMLHttpRequest();
        // const url = urlbuilder;
        // Http.open("GET", url);
        // Http.send();
        // Http.onreadystatechange = (e) => {
        //     let response = JSON.parse(Http.responseText);
        //     //console.log(response.total_count)

        //     //Welcome Text
        //     document.getElementById("welcome-title").innerHTML = "Welcome " + response.items[0].user.login;

        //     //Profile Picture
        //     document.getElementById("profile-pic").src = response.items[0].user.avatar_url;

        //     // Contributions Count
        //     document.getElementById("contributions").innerHTML = "Contributions: " + response.total_count;

        //     //PRs
        //     for (let i = 0; i <= response.items.length; i++) {
        //         let element = document.getElementById("progress-list")
        //         element.innerHTML = element.innerHTML +
        //             " <li>" +
        //             "<div>" +
        //             "<h4>" + response.items[i].repository_url.substr(29) + "</h4>" +
        //             "<h6>" + response.items[i].title + "</h6>" +
        //             "</div>" +
        //             "</li>"
        //             ;
        //     }
        // }
    }
}
