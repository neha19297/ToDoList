import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import *as jspdf from 'jspdf';
// import *XLSX from 'xlsx';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todo: any[] = [];
  array:any=[
    ["id","title","isDone"]
  ];

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todo = item.sort((a:any,b:any) => 
        {return a.isDone -b.isDone } );
      })
      // whenever there is any change then callback invoked obserable method
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }
  fileExcel(){
for (let index = 0; index < this.todo.length; index++) {
  // console.log(this.todo[index]);
  
  var o;
  var newArray:any=[];
  for(o in this.todo[index]){
newArray.push(o);

  }
break;
}
this.array.push(newArray);
for (let index = 0; index < this.todo.length; index++) {
  this.array.push(Object.values(this.todo[index]));
  
}
// console.log(this.array);
var csvString="";
this.array.forEach((RowItem:any,RowIndex:any)=>{
  RowItem.forEach((colItem:any,colIndex:any)=>{
    csvString+= colItem + ',';
    // console.log(csvString);
    
  });
  csvString +="\r\n";
})
csvString="data:application/csv," +encodeURIComponent(csvString);
var x=document.createElement("A");
x.setAttribute("href",csvString)
x.setAttribute("download","tasks.csv");
document.body.appendChild(x);
x.click();
this.array=[];
}

filePDF(){
  for (let index = 0; index < this.todo.length; index++) {
    // console.log(this.todo[index]);
    
    var p;
    var newArray:any=[];
    for(p in this.todo[index]){
  newArray.push(p);
  
    }
  break;
  }
  this.array.push(newArray);
  for (let index = 0; index < this.todo.length; index++) {
    this.array.push(Object.values(this.todo[index]));
    
  }
  // console.log(this.array);
  var pdfString="";
  this.array.forEach((RowItem:any,RowIndex:any)=>{
    RowItem.forEach((colItem:any,colIndex:any)=>{
      pdfString+= colItem + ',';
      // console.log(csvString);
      
    });
    pdfString +="\r\n";
  })
  pdfString="data:application/pdf," +encodeURIComponent(pdfString);
  var x=document.createElement("A");
  x.setAttribute("href",pdfString)
  x.setAttribute("download","tasks.pdf");
  document.body.appendChild(x);
  x.click();
  this.array=[];
  }
  
}