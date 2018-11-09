module.exports = function(app, db) {
    const Books = require('../controllers/book.controller.js'); 
    /*
	Test route to make sure everything is working (accessed at GET http://localhost:8080/api/test)	
	A simple get route
    */
	app.get('/test', Books.test);
    
    /** 
    *  @URL: GET http://localhost:8080/api/show	
    *  @desc: A show route to get all the data from books db and record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    app.get('/show', Books.show);

    /** 
    *  @URL: POST http://localhost:8080/api/post	
    *  @desc: A post route to add books in record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    app.post('/post', Books.create);

    /** 
    *  @URL: POST http://localhost:8080/api/bookdel/{id}	
    *  @desc: A post route to delete books from record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    app.delete('/bookdel/:id', Books.delete);   

    /** 
    *  @URL: POST http://localhost:8080/api/bookupdate/{id}	
    *  @desc: A post route to update a particular record from record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    app.put('/bookupdate/:id', Books.update);        
}