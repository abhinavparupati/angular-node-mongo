import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>People List</h2>
      <button class="btn btn-primary mb-3" routerLink="/person/new">Add New Person</button>
      <div *ngIf="people.length === 0" class="alert alert-info">
        No people found. Add some people to get started.
      </div>
      <table class="table" *ngIf="people.length > 0">
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
              <button class="btn btn-sm btn-info me-2" (click)="editPerson(person)">Edit</button>
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

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getAllPeople().subscribe({
      next: (data) => {
        console.log('People data:', data); // Debug log
        this.people = data;
      },
      error: (error) => console.error('Error loading people:', error)
    });
  }

  deletePerson(id: string | undefined) {
    if (id && confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe(
        () => this.loadPeople(),
        (error) => console.error('Error deleting person:', error)
      );
    }
  }

  editPerson(person: Person) {
    console.log('Editing person:', person); // Debug log
    if (person._id) {
      this.router.navigate(['/person/edit', person._id]);
    }
  }
} 