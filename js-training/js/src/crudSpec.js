/*
 3. CRUD test cases.
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

//3.1 Verify if a Item can be created for a specific project.
frisby.create('Get all projects')
    .get('https://todo.ly/api/projects.json')
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data[0].Id;

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

                frisby.create('Delete the Item created')
                    .delete('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .toss();
            })
            .toss();

    })
    .toss()

//3.2 Verify if a Item Deleted is not listed in the project items.

var request = {
    "Content": "ProjectCRUD",
    "Icon": 4
};
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

//3.3 Verify after delete an Item the Deleted field is updated to true

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

                frisby.create('Delete the Item created')
                    .delete('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .toss();

                frisby.create('Verify if the item was created in the project selected')
                    .get('https://todo.ly/api/items/' + itemId + '.json')
                    .expectStatus(200)
                    .afterJSON(function(data) {
                        expect(data.Deleted).toEqual(true);
                    })
                    .toss();
                frisby.create('Delete the Project created')
                    .delete('https://todo.ly/api/projects/' + projectId + '.json')
                    .expectStatus(200)
                    .toss();
            })
            .toss();

    })
    .toss()

// 3.4 verify a item can be updated to done(checked) and after it can be updated to undone(unchecked).

frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .expectStatus(200)
    .afterJSON(function(data){

        var projectId = data.Id;
            
            frisby.create('Verify if an item can be Created')
                .post('https://todo.ly/api/items.json', {
                    "Content": "ItemCrud",
                    "ProjectId": projectId
                })
                    .expectStatus(200)
                    .expectJSON({
                        "Content": "ItemCrud",
                        "ProjectId": projectId,
                        "Checked": false
                    })
                    .afterJSON(function(data){
                    
                        var itemId = data.Id;

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
                        .toss();
                        frisby.create('Update the checked option to undone (unchecked)')
                            .put('https://todo.ly/api/items/' + itemId + '.json', {
                                "Checked": false
                            })
                                .expectStatus(200)
                                .expectJSON({
                                    "Checked": false
                                })
                                .afterJSON(function(data) {
                                    expect(data.Deleted).toEqual(false);
                                 })
                        .toss();
                        frisby.create('Delete the Item that was created and updated')
                            .delete('https://todo.ly/api/items/' + itemId + '.json')
                                .expectStatus(200)
                                .inspectJSON()
                                .expectJSON({
                                    "Content": "ItemCrud"
                                })
                        .toss();

                        frisby.create('Delete the Project created')
                            .delete('https://todo.ly/api/projects/' + projectId + '.json')
                            .expectStatus(200)
                        .toss();
                    })
            .toss();
        
        })
.toss()

// 3.5 Negative:verify a program cannot be created with empty name.
var requestEmpty = {
    "Content": "",
    "Icon": 4
};

frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', requestEmpty)
        .expectStatus(200)
        .expectJSON({
                "ErrorMessage": "Too Short Project Name",
                "ErrorCode": 305
        })
 .toss();
