import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { ClaseDetalleComponent } from './pages/clase-detalle/clase-detalle.component';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminFormTemplateComponent } from './pages/admin-form-template/admin-form-template.component';
import { AdminContactoComponent } from './pages/admin-contacto/admin-contacto.component';
import { RulesComponent } from './pages/rules/rules.component';
import { GraficaComponent } from './pages/grafica/grafica.component';
import { BloqueoComponent } from './shared/bloqueo/bloqueo.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clases', component: ClasesComponent },
  { path: 'clases/:id', component: ClaseDetalleComponent },
  { path: 'inscripcion', component: InscripcionComponent,canActivate: [authGuard]  },
  { path: 'contacto', component: ContactoComponent, canActivate: [authGuard]  },
  { path: 'acceso-denegado', component: BloqueoComponent },
  { path: 'videos', loadComponent: () => import('./pages/videos/videos.component').then(m => m.VideosComponent) },
  { path: 'reglas', component: RulesComponent},
  { path: 'recovery', component: RecoveryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/grafica', component: GraficaComponent},
  { path: 'admin/form-template', component: AdminFormTemplateComponent, canActivate: [authGuard] },
  { path: 'admin/contacto', component: AdminContactoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' } // ruta comodín por si no encuentra coincidencias
];
