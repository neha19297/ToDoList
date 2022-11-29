import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  firestoreCollection : AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todo');
   }

   addTodo(title: string){
     this.firestoreCollection.add({
       title,
       isDone : false
     })
   }
  //  after click on plus button firebase data added with new task

   updateTodoStatus(id:string, newStatus:boolean){
     this.firestoreCollection.doc(id).update({isDone:newStatus});
   }
// updating status of task ,is it done or not
   deleteTodo(id:string){
     this.firestoreCollection.doc(id).delete();
   }
// for delete
  }
