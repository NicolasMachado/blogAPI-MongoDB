let server = "http://127.0.0.1:8080";
let method = "GET";
let methUrl = "/posts/"

$(function() {
	getAll();
    $('.posts-container').on("click", ".delete-button", function() {
    	deletePost($(this).data("id"));
    });
    $('.posts-container').on("click", ".edit-button", function() {
    	editPost($(this).data("id"));
    });
    $('#add-post').submit(function(event) {
    	addPost(event);
    	return false;
    });
});

function displayAll(query) {
	$('.posts-container').empty();
	query.forEach(object => {
		$('.posts-container').append(
			`<h3>${object.author} - ${object.created} - ${object.id}</h3>
			<h4>${object.title}</h4>
			<p>${object.content}</p>
			<span class="delete-button" data-id="${object.id}">DELETE</span> - 
			<span class="edit-button" data-id="${object.id}">EDIT</span>
			<br><br>`
			);
	});
}

function getAll() {
	let config = {
	    async: true,
	    crossDomain: false,
	    url: server + methUrl,
	    method: method,
	    headers: {},
	    data: {
	    },
	    success: displayAll,
	    error: function (result, status, error) {
	        console.log(result + " - " + status + " - " + error);
	    }
	};
    $.ajax(config);
}

function deletePost(postID) {
let config = {
    async: true,
    crossDomain: false,
    url: server + methUrl + postID,
    type: 'delete',
    headers: {},
    data: {
    },
    success: getAll,
    error: function (result, status, error) {
        console.log(result + " - " + status + " - " + error);
    }
};
    $.ajax(config);
}

function addPost(event) {
	let config = {
	    async: true,
	    crossDomain: false,
	    url: server + methUrl,
	    type: 'post',
	    headers: {},
    	contentType: 'application/json',
    	dataType: 'json',
	    data: JSON.stringify({
	    	"title": event.target[0].value,
	    	"content": event.target[3].value,
	    	"author": {
			    "firstName": event.target[1].value,
			    "lastName": event.target[2].value
	    	}
	    }),
	    success: getAll,
	    error: function (result, status, error) {
	        console.log(result + " - " + status + " - " + error);
	    }
	};
	$.ajax(config);
}

function editPost(postID) {
	let config = {
	    async: true,
	    crossDomain: false,
	    url: server + methUrl + postID,
	    type: 'put',
	    headers: {},
    	contentType: 'application/json',
    	dataType: 'json',
	    data: JSON.stringify({
	    	"id": postID,
	    	"title": "This is an Edited title",
	    	"content": "This is an Edited content. I was too lazy to implement user inputs. But it works!",
	    	"author": {
			    "firstName": "Edith",
			    "lastName": "Paf"
	    	}
	    }),
	    success: getAll,
	    error: function (result, status, error) {
	        console.log(result + " - " + status + " - " + error);
	    }
	};
	$.ajax(config);
}