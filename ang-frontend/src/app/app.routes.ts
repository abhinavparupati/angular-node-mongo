import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/person', pathMatch: 'full' },
  { path: 'person', component: PersonListComponent },
  { path: 'person/new', component: PersonEditComponent },
  { path: 'person/edit/:id', component: PersonEditComponent }
];
