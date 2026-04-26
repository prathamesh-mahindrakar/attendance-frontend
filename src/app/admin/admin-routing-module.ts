import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageProjects } from '../components/manage-projects/manage-projects';
import { AdminDashboard } from '../components/admin-dashboard/admin-dashboard';
import { ManageManagers } from '../components/manage-managers/manage-managers';
import { ManageEmployees } from '../components/manage-employees/manage-employees';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboard },
  { path: 'manage-projects', component: ManageProjects },
  { path: 'manage-managers', component: ManageManagers },
  { path: 'manage-employees', component: ManageEmployees }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
