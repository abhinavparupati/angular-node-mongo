import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>People List</h2>
      <button class="btn btn-primary mb-3" routerLink="/person/new">Add New Person</button>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let person of people">
            <td>{{ person.name }}</td>
            <td>{{ person.age }}</td>
            <td>{{ person.gender }}</td>
            <td>{{ person.mobileNumber }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" [routerLink]="['/person/edit', person._id]">Edit</button>
              <button class="btn btn-sm btn-danger" (click)="deletePerson(person._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getAllPeople().subscribe(
      (data) => this.people = data,
      (error) => console.error('Error loading people:', error)
    );
  }

  deletePerson(id: string | undefined) {
    if (id && confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe(
        () => this.loadPeople(),
        (error) => console.error('Error deleting person:', error)
      );
    }
  }
} 