import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './comps/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './comps/register/register.component';
import { LayoutComponent } from './comps/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate: [authGuard]
    },
];
