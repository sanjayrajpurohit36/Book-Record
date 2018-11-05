module.exports = function(app, db) {
	/*
	Test route to make sure everything is working (accessed at GET http://localhost:8080/api)	
	A simple get route
	*/
	app.get('/', function(req, res) {
		res.json({ message: 'This is a get route' });   
    });
    
    /*
    URL: GET http://localhost:8080/api/show	
    desc: A show route to get all the data from books db and record collection 
    Auhor: Sanjay Rajpurohit
	*/
    app.get('/show', function(req, res) {
        var dbo = db.db("books");
        var test = dbo.collection('record');        
        test.find().toArray().then(function (result){
            res.json({
                message : 'Success', 
                data : result,
            })    
        });        
    })
}