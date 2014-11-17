/*
 3. CRUD test cases part 2.
*/
var frisby = require('frisby');

frisby.globalSetup({
    request: {
        /*
         proxy: 'http://172.20.240.5:8080/',*/
        headers: {
            Authorization: 'Basic bGVvLmZjeEBnbWFpbC5jb206bGVvIUAjNDU2'
        },
        json: true,
        inspectOnFailure: true
    }
});

var request = {
    "Content": "ProjectCRUD",
    "Icon": 4
};

 //3.6 Negative veiry a user with the same email cannot be created.

 frisby.create('EmailAlreadyExist')
	.post('https://todo.ly/api/user.json', {
			"Email": "esther.yol06@gmail.com",
			"FullName": "Luna Test",
			"Password": "Control123"
	})
			.expectStatus(200)
			.expectJSON({
				"ErrorMessage": "Account with this email address already exists",
				"ErrorCode": 201
			})
		
.toss();

//3.7 Verify an item can be marked as done.
frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data.Id;

        frisby.create('Create a item')
            .post('https://todo.ly/api/items.json', {
                "Content": "ItemCRUD",
                "ProjectId": projectId
            })
            .expectStatus(200)
            .afterJSON(function(data){

                var itemId = data.Id;

                frisby.create('Verify if the item was created in the project selected and checked value false')
                    .get('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                        "Content": "ItemCRUD",
                        "ProjectId": projectId,
                        "Checked": false
                    })
                    .toss();

                    frisby.create('Update the checked option to done (checked)')
							.put('https://todo.ly/api/items/' + itemId + '.json', {
								"Checked": true
							})
								.expectStatus(200)
								.expectJSON({
									"Checked": true
								})
								.afterJSON(function(data) {
                        			expect(data.Deleted).toEqual(true);
                   				 })
                frisby.create('Delete the Item created')
                    .delete('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .toss();

                frisby.create('Delete the Project created')
                   	.delete('https://todo.ly/api/projects/' + projectId + '.json')
                   	.expectStatus(200)
                    .toss();   
            })
            .toss();

    })
    .toss()

//3.8 Verify an item marked as done can be removed from proyect.

frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data.Id;

        frisby.create('Create a item')
            .post('https://todo.ly/api/items.json', {
                "Content": "ItemCRUD",
                "ProjectId": projectId
            })
            .expectStatus(200)
            .afterJSON(function(data){

                var itemId = data.Id;

                frisby.create('Verify if the item was created in the project selected')
                    .get('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                        "Content": "ItemCRUD",
                        "ProjectId": projectId
                    })
                    .toss();

                    frisby.create('Update the checked option to done (checked)')
							.put('https://todo.ly/api/items/' + itemId + '.json', {
								"Checked": true
							})
								.expectStatus(200)
								.expectJSON({
									"Checked": true
								})
								.afterJSON(function(data) {
                        			expect(data.Checked).toEqual(true);
                   				 })
                frisby.create('Delete the Item created')
                    .delete('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .toss();

                frisby.create('Verify if the item was removed also from Project item list')
                    .get('https://todo.ly/api/projects/'+ projectId+ '/items.json')
                    .expectStatus(200)
                    .afterJSON(function(data) {
                        expect(data.length).toEqual(0);

                    })
                    .toss()

                frisby.create('Delete the Project created')
                    .delete('https://todo.ly/api/projects/' + projectId + '.json')
                    .expectStatus(200)
                    .toss();   
            })
            .toss();

    })
    .toss()

//3.9 verify a proyect can created only with the name.
var requestName = {
    "Content": "ProjectCRUD"
};

frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', requestName)
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data.Id;
            
            frisby.create('Verify if the proyect was creted,')
                .get('https://todo.ly/api/projects/' + projectId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                        "Content": "ProjectCRUD",
                        "ProjectId": projectId
                    })

            .toss();

             frisby.create('Delete the Project created')
                .delete('https://todo.ly/api/projects/' + projectId + '.json')
                .expectStatus(200)
            .toss();
            
    })
.toss()



//3.10  Verify  a proyect with at least one item can be renamed.

frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data.Id;

         frisby.create('Create a item')
            .post('https://todo.ly/api/items.json', {
                "Content": "ItemCRUD",
                "ProjectId": projectId
            })
            .expectStatus(200)
            .afterJSON(function(data){

                var itemId = data.Id;

                frisby.create('Verify if the item was created in the project selected')
                    .get('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                        "Content": "ItemCRUD",
                        "ProjectId": projectId
                    })
                    .toss();

                    frisby.create('Rename the Project created')
                    .put('https://todo.ly/api/projects/' + projectId + '.json',{
                                 "Content": "Renamed_ProjectCRUD"
                        })
                    .expectStatus(200)
                    .toss();
                    
                    frisby.create('Verify if the project name was upadted')
                    .get('https://todo.ly/api/projects/' + projectId + '.json')
                        .expectStatus(200)
                        .expectJSON({
                            "Content": "Renamed_ProjectCRUD"
                        })
                    .toss();
                frisby.create('Delete the Item created')
                    .delete('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .toss();

                frisby.create('Delete the Project created')
                    .delete('https://todo.ly/api/projects/' + projectId + '.json')
                    .expectStatus(200)
                    .toss();   
            })
            .toss();

    })
    .toss()

//   3.11  CRUD of a item

frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data.Id;

         frisby.create('Create a item')
            .post('https://todo.ly/api/items.json', {
                "Content": "ItemCRUD",
                "ProjectId": projectId
            })
            .expectStatus(200)
            .afterJSON(function(data){

                var itemId = data.Id;

                frisby.create('Verify if the item was created in the project selected')
                    .get('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                        "Content": "ItemCRUD",
                        "ProjectId": projectId
                    })
                    .toss();

                    frisby.create('Update the item name')
                            .put('https://todo.ly/api/items/' + itemId + '.json', {
                                "Content": "ItemNameRenamed"
                            })
                                .expectStatus(200)
                                .expectJSON({
                                    "Content": "ItemNameRenamed"
                                })
                        .toss();
                frisby.create('Delete the Item created')
                    .delete('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                                    "Deleted": true
                                })
                    .toss();

                frisby.create('Delete the Project created')
                    .delete('https://todo.ly/api/projects/' + projectId + '.json')
                    .expectStatus(200)
                    .expectJSON({
                                    "Deleted": true
                                })
                    .toss();   
            })
            .toss();

    })
    .toss()



 