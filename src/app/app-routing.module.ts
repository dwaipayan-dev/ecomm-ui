import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Views/cart/cart.component';
import { HistoryComponent } from './Views/history/history.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
