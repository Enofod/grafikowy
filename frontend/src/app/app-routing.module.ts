import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './core/components/user/user.component';
import { ScheduleComponent } from './features/components/schedule/schedule.component';
import { CalendarComponent } from './features/components/calendar/calendar.component';
import { LandingComponent } from './core/components/landing/landing.component';

import { UserAuthGuard } from './core/guards/user-auth.guard';
import { AdminAuthGuard } from './core/guards/admin-auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UserComponent, canActivate: [UserAuthGuard] },
  { path: 'scheduler/:groupName', component: ScheduleComponent, canActivate: [UserAuthGuard] },
  { path: 'calendar/:groupName', component: CalendarComponent, canActivate: [UserAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
