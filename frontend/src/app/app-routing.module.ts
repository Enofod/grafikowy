import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './core/components/user/user.component';
import { UserAuthGuard } from './core/guards/user-auth.guard';

const routes: Routes = [
  { path: 'users', component: UserComponent, canActivate: [UserAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
