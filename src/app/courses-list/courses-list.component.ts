import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})

export class CoursesListComponent implements OnInit {

  coursesObservable: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  description: string;
  title: string;
  url: string;

  // constructor(private db: AngularFireDatabase) {
  //   this.coursesObservable = db.list('/courses').valueChanges();
  // }

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('courses');
    // Use snapshotChanges().map() to store the key
    this.coursesObservable = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
    // this.coursesObservable = this.db.list('/courses').valueChanges();
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  // addItem(newName: string) {
  //   this.itemsRef.push({ title: newName });
  // }

  // testing
  addItem2() {

    this.itemsRef.push({
      title: this.title,
      description: this.description,
      url: this.url
    });

    this.description = '';
    this.title = '';
    this.url = '';

  }


}
