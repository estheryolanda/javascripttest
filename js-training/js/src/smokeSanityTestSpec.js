var frisby = require('frisby');

// 1. Smoke test
frisby.globalSetup({
    request: {
        //proxy: 'http://172.20.240.5:8080/',
        headers: {
            Authorization: 'Basic ZXN0aGVyLnlvbDA2QGdtYWlsLmNvbTphZ3VzdGluPzA2'
        },
        json: true,
        inspectOnFailure: true
    }
});
//1.1 Verify Get List filters is executed.
frisby.create('getListFilterExecuted')
    .get('https://todo.ly/api/filters.json')
    .expectStatus(200)


    .toss();
// 1.2 smoke test: Get user is executed without problem
frisby.create('getUserExecuted')
    .get('https://todo.ly/api/user.json')
    .expectStatus(200)


    .toss();


//1.3 Verify project can be deleted.
var request = {
    "Content": "ProjectTest",
    "Icon": 4
};
frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .expectStatus(200)

    .afterJSON(function(data){
        var projectId = data.Id;
        frisby.create('Verify if a project can be deleted')
            .delete('https://todo.ly/api/projects/'+ projectId +'.json')
            .expectStatus(200)

    })
    .toss();

//1.4 create a item is executed
frisby.create('CreateItemExecuted')
    .post('https://todo.ly/api/items.json', {
        "Content":"Elevator2",
        "Checked": true
    })
    .expectStatus(200)

    .afterJSON(function(data) {

        var itemId = data.Id;
        frisby.create('Delete Item created')
            .delete('https://todo.ly/api/items/' + itemId + '.json')
            .expectStatus(200)
            .toss();
    })
    .toss();
//1.5 is authenticated executed

frisby.create('CreateItemExecuted')
    .get('https://todo.ly/api/authentication/isauthenticated.json')
    .expectStatus(200)

    .toss();
    var frisby = require('frisby');

// 2. Sanity Test:
frisby.globalSetup({
    request: {
        //proxy: 'http://172.20.240.5:8080/',
        headers: {
            Authorization: 'Basic ZXN0aGVyLnlvbDA2QGdtYWlsLmNvbTphZ3VzdGluPzA2'
        },
        json: true,
        inspectOnFailure: true
    }
});
// 2.1 Verify the values types getting are correct, for a specific filter.
frisby.create('getListFilterExecuted')
    .get('https://todo.ly/api/filters/0.json')
    .inspectBody()
    .expectStatus(200)
    //.inspectJSON()
    .expectJSONTypes({
        Content: String,
        Icon: Number
    })

    .toss();
// 2.2 sanity test: Get user return types correctly.
frisby.create('getUserExecuted')
    .get('https://todo.ly/api/user.json')
    .expectStatus(200)
    .inspectBody()
    .expectJSONTypes({
        Email: String,
        Password: null,
        FullName: String,
        TimeZone: Number,
        IsProUser: Boolean,
        DefaultProjectId: Number,
        EditDueDateMoreExpanded: Boolean,
        ListSortType: Number,
        TimeZoneId:String

    })

    .toss();
//2.3 Verify get project return the expected types.
var request = {
    "Content": "ProjectTest",
    "Icon": 4
};
frisby.create('CreateProject')
    .post('https://todo.ly/api/projects.json', request)
    .inspectJSON()
    .expectStatus(200)
    .expectJSONTypes({
        Content: String,
        ItemsCount: Number,
        Icon: Number,
        Children: Array,
        Collapsed: Boolean,
        ProjectShareOwnerName: null,
        IsShareApproved: Boolean,
        LastSyncedDateTime: String
    })

    .afterJSON(function(data){
        var projectId = data.Id;
        frisby.create('Verify if a project can be deleted')
            .delete('https://todo.ly/api/projects/'+ projectId +'.json')
            .expectStatus(200)

    })
    .toss();
//2.4 create a item is executed
frisby.create('CreateItemExecuted')
    .post('https://todo.ly/api/items.json', {
        "Content":"Elevator2",
        "Checked": true
    })
    .expectStatus(200)
    .inspectBody()
    .expectJSONTypes({
        Content: String,
        ItemType: Number,
        Checked: Boolean,
        ProjectId: null,
        Path: String,
        LastSyncedDateTime: String,
        Children: Array
    })
    .afterJSON(function(data) {

        var itemId = data.Id;
        frisby.create('Delete Item created')
            .delete('https://todo.ly/api/items/' + itemId + '.json')
            .expectStatus(200)
            .toss();
    })
    .toss();
//2.5 Get Item  return the expected types

frisby.create('getAllItems')
    .get('https://todo.ly/api/items.json')
    .expectStatus(200)
    .afterJSON(function(data) {
        var itemId = data[0].Id;
        frisby.create('GetSpecificItem')
            .delete('https://todo.ly/api/items/' + itemId + '.json')
            .expectStatus(200)
            .inspectBody()
            .expectJSONTypes({
                Content: String,
                ItemType: Number,
                Checked: Boolean,
                ProjectId: null,
                Path: String,
                LastSyncedDateTime: String,
                Children: Array
            })
            .toss();
    })
    .toss();
