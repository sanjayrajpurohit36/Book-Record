<template>
  <div class="container-fluid out_box">
    <div>
      <div class="heading">
        <h1>Books</h1><hr>
      </div> 
      <div class="alert alert-success" v-if="message">
        <p id="message"> Book Added </p>
      </div>
      <button id="show-modal" class="btn btn-success" v-on:click="showModal">Add Book</button>
      <div class="table-responsive" id="data">
        <table class="table text-center table-striped table-bordered">
          <caption name="records">Records<span>: {{totalRecords}} </span></caption>
          <thead class="thead-dark">
            <tr>
              <th scope="col">  
                S.No
              </th>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Author
              </th>
              <th scope="col">
                Read
              </th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
              <td>
                {{todo.id + 1}}
              </td>
              <td>
                {{todo.title}}
              </td>
              <td>
                {{todo.author}}
              </td>
              <td v-if="todo.read">
                Yes
              </td>
              <td v-else>
                No
              </td>

              <td>
                <button type="button" class="text-center button btn-sm btn-warning" v-on:click="updateRow(todo)">
                  Update
                </button>
                <button type="button" class="text-center button btn-sm btn-danger" v-bind:id="todo.id" v-on:click="showConfirmModal(todo.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>  
      <div id="create-item" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" id="myLargeModalLabel">Add a new book</h4>
                  </div>
                  <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="createItem">
                      <div class="modal-body">
                          <div class="form-group">
                              <label for="title">Title:</label>
                              <input type="text" placeholder="Enter Title" class="form-control" name="title" v-model="newItem.title" required>
                          </div>
                          <div class="form-group">
                              <label for="author">Author:</label>
                              <input type="text" placeholder="Enter Author" class="form-control" name="author" v-model="newItem.author" required>                          
                          </div>
                      </div>
                      <div class="form-group buttons">
                        <input type="checkbox" name="read" v-model="newItem.read"> Read?<br>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="button" class="btn btn-danger" v-on:click="resetData(newItem)">Reset</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title" id="myModalLabel">Update</h4>
                      </div>
                      <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="updateItem(fillItem.id)">
                          <div class="modal-body">
                              <div class="form-group">
                                  <label for="title">Title:</label>
                                  <input type="text" placeholder="Name" class="form-control" name="title" v-model="fillItem.title" required >                
                              </div>
                              <div class="form-group">
                                  <label for="author">Author:</label>
                                  <input type="text" placeholder="Author" class="form-control" name="author" v-model="fillItem.author" required>
                              </div>                        
                          </div>
                          <div class="form-group buttons">
                              <div class="form-group">
                                  <input type="checkbox" name="read" v-model="fillItem.read"> Read?<br>
                                  <button type="submit" class="btn btn-primary">Update</button>
                                  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      <div id="confirm-item" class="modal fade" tabindex="-1" v-on:submit.prevent="deleteRow()">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" id="myLargeModalLabel">Confirmation</h4>
                  </div>
                  <form method="POST" enctype="multipart/form-data">
                      <div class="modal-body">
                          <div class="form-group">
                              <label for="author">Are You sure, you want to delete this data?</label>                              
                          </div>
                      </div>
                      <div class="form-group buttons">
                        <button type="submit" class="btn btn-danger">Yes, Delete</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  </div>                       
</template>

<script>
import axios from 'axios';
export default {
  name: 'TodoList',
  data () {
    return {
      message: false,
      newId: 1,         // starting id for books
      newItem: {        // Object for books
        id: '',
        title: '',
        read: false,
        author: '',
      },
      fillItem: {       // object for updated data
        'id':'',
        'title': '',
        'author': '',
        'read': false
      },
      delId: -1,
      totalRecords: 0,
      todos: {},        // for keeping all books data
      errors: []
    }
  },
  methods:{
    // function for creating books
    createItem: function() {  
      let vm = this;  // defining object
      if(vm.newItem.title.trim().length == 0 || vm.newItem.author.trim().length == 0) 
      {
        alert('You canno\'t enter empty fields.');
        return ;
      }
      vm.newItem.id = vm.newId;
      axios.post('http://localhost:8000/api/post', {
        data: vm.newItem
      }).then(response => {})
      .catch(e => {
        vm.errors.push(e)
      }).then(function (result){
        vm.message = true;
        $('#message').html("Book Added");
        $('#create-item').modal('hide');
        vm.newItem = {
          id : '',
          title : '',
          author : '',
          read : false
        }
        vm.showTable();
      }) 
    },
    // function for deleting book
    deleteRow: function() { 
      let vm = this;
      axios.delete('http://localhost:8000/api/bookdel/' + vm.delId, {

      }).then(response => {})
      .catch(e => {
        vm.errors.push(e)
      }).then(function() {
        $('#confirm-item').modal('hide');
        vm.showTable();
        $('#message').html("Book Removed");
      })
    },
    // function for printing data in update model
    updateRow: function (item) {    
      let vm = this;
      vm.fillItem.id = item.id;
      vm.fillItem.title = item.title;
      vm.fillItem.author = item.author;
      vm.fillItem.read = item.read;      
      $('#edit-item').modal('show');
    },
    // function for updating the book data
    updateItem: function (id) {
      let vm = this;
      axios.put('http://localhost:8000/api/bookupdate/' + id, {
        data: vm.fillItem    
      }).then(responce => {})
      .catch(e => {
        vm.errors.push(e)
      }).then(function (result){
        $('#edit-item').modal('hide');
        vm.showTable();
        $('#message').html("Book Updated");     
      
      })    
    },
    resetData: function(item) {
      let vm = this;  
       vm.newItem = {
        id : '',
        title : '',
        author : '',
        read : false
      } 
    },
    // function for showing model
    showModal: function() {
      $('#create-item').modal('show');        
    },
    showConfirmModal: function(id) {
      let vm = this;
      vm.delId = id;
      $('#confirm-item').modal('show');
    },
    showTable: function() {
      let vm = this;  
      axios.get(`http://localhost:8000/api/show`)
      .then(response => {
        // JSON responses are automatically parsed.
        vm.todos = response.data.data;  
        })
      .catch(e => {
        vm.errors.push(e)
      }).then(function (result){
        vm.totalRecords = vm.todos.length;
        if(vm.totalRecords == 0) {
          vm.newId = 0;
        }
        else {
          vm.newId = vm.todos[vm.todos.length-1].id+1;  //set newId as lastid +1
        }
        // console.log(vm.newId);     
        if(vm.todos.length == 0) {
          $('#data').hide();
        }
        else {
          $('#data').show();    
        }    
      }) 
    },
  },
  mounted() {
    let vm = this;
    vm.showTable(); 
  }
}
</script>
