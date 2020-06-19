import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { action } from '@datorama/akita';
import { VISIBILITY_FILTER } from '../filter/filter.model';
import { createTodo, Todo } from './todo.model';
import { TodosStore } from './todos.store';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private todosCollection: AngularFirestoreCollection<Todo>;

  constructor(private todosStore: TodosStore, private afs: AngularFirestore) {
    this.todosCollection = afs.collection<Todo>('todos');
    this.fetch();
  }

  fetch() {
    this.todosCollection.valueChanges().subscribe((todos: Todo[]) => {
      this.todosStore.set(todos);
    });
  }

  @action('Update filter')
  updateFilter(filter: VISIBILITY_FILTER) {
    this.todosStore.update({
      ui: {
        filter,
      },
    });
  }

  complete({ id, completed }: Todo) {
    this.todosStore.update(id, { completed });
    this.todosCollection.doc(id as string).update({ completed });
  }

  add(title: string) {
    const id = this.afs.createId();
    const todo = { id, title };
    this.todosCollection
      .doc(id)
      .set(todo)
      .then(() => {
        this.todosStore.add(createTodo(todo));
      });
  }

  delete(id: string) {
    this.todosCollection
      .doc(id)
      .delete()
      .then(() => {
        this.todosStore.remove(id);
      });
  }

  update(id: string, title: string) {
    this.todosCollection
      .doc(id)
      .update({ title })
      .then(() => {
        this.todosStore.update(id, { title });
      });
  }

  checkAll(completed: boolean) {
    this.todosStore.update(null, {
      completed,
    });
  }

  move(index: number) {
    console.log('TCL: move -> index', index);
    this.todosStore.move(index, index - 1);
  }
}
