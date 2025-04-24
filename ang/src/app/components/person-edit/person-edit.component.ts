import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>{{ isNewPerson ? 'Create Person' : 'Edit Person' }}</h2>
      <form (ngSubmit)="onSubmit()" #personForm="ngForm">
        <div class="form-group mb-3">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" name="name" [(ngModel)]="person.name" required>
        </div>
        <div class="form-group mb-3">
          <label for="age">Age</label>
          <input type="number" class="form-control" id="age" name="age" [(ngModel)]="person.age" required>
        </div>
        <div class="form-group mb-3">
          <label for="gender">Gender</label>
          <select class="form-control" id="gender" name="gender" [(ngModel)]="person.gender" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="mobileNumber">Mobile Number</label>
          <input type="tel" class="form-control" id="mobileNumber" name="mobileNumber" [(ngModel)]="person.mobileNumber" required>
        </div>
        <button type="submit" class="btn btn-primary me-2" [disabled]="!personForm.form.valid">Save</button>
        <button type="button" class="btn btn-secondary" routerLink="/person">Cancel</button>
      </form>
    </div>
  `
})
export class PersonEditComponent implements OnInit {
  person: Person = {
    name: '',
    age: 0,
    gender: '',
    mobileNumber: ''
  };
  isNewPerson = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewPerson = false;
      this.personService.getPerson(id).subscribe(
        (person) => this.person = person,
        (error) => console.error('Error loading person:', error)
      );
    }
  }

  onSubmit() {
    if (this.isNewPerson) {
      this.personService.createPerson(this.person).subscribe(
        () => this.router.navigate(['/person']),
        (error) => console.error('Error creating person:', error)
      );
    } else {
      if (this.person._id) {
        this.personService.updatePerson(this.person._id, this.person).subscribe(
          () => this.router.navigate(['/person']),
          (error) => console.error('Error updating person:', error)
        );
      }
    }
  }
} 