import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './core/components/user/user.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

import { UserAuthGuard } from './core/guards/user-auth.guard';
import { AdminAuthGuard } from './core/guards/admin-auth.guard';

const routes: Routes = [
  { path: 'users', component: UserComponent, canActivate: [UserAuthGuard] },
  { path: 'scheduler', component: SchedulerComponent, canActivate: [UserAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
