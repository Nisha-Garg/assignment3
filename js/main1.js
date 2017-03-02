var rst = [];
function temp(){
    $.ajax({
        'url': "https://api.github.com/users",
        'typr': 'GET',
        success: function(response){
            for (var i=0; i<response.length; i++) {
                rst.push(response[i]['login'])
            }
            return rst;
        }
    })
}
//var username = $('#ghusername').val();
$(function() {
    temp();
    $("#autocomplete").autocomplete({
        source:rst,
        select:function(event,ui){
         console.log(ui.item.value)
        get_data(ui.item.value)
    },
    });
})

function get_data(username){
    $.ajax({
        'url':"https://api.github.com/users/"+username,
        'type': 'GET',
        data:
        {
            client_id:'',
            client_secret:'',
        }
        // success: function(mydata) {
        //     $("#profile").html(mydata);
                // function(){
                // console.log(username.name);
                // $("#username1").append(username.name)
                // $("#publicrepos").append{username.public_repos}

        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'',
                    client_secret:'',
                }
            }).done(function(repos){
                $.each(repos,function(index,repo){
                    $('repos').append(`
                        <strong>${repo.name}</strong>:${repo.description}
                        <a href="${repo.html_url}" target="_blank">Repo page</a>
                        `);
    });
});
$('#profile').html(`
    <h3 class="c3">${user.name}</h3>
    <div class="av">
    <img class="avatar" src="${user.avatar_url}">
    </div>
    <div class="sp">
        <span class="c4">Public Repos: ${user.public_repos}</span>&nbsp
        <span class="c5">Public gists: ${user.public_gists}</span>&nbsp
        <span class="c6">Followers: ${user.followers}</span>
        <span class="c7">Following: ${user.following}</span>
        <br><br>
        <ul class="ul1">
        <li>Company:${user.company}</li>
        <li>Website?blog:${user.blog}</li>
        <li>location:${user.location}</li>
        <li>Member since:${user.created_at}</li>
        </ul>
    </div>
    `);
});
};
