import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderCreateComponent } from './pages/builder/builder-create/builder-create.component';
import { RenderContentComponent } from './pages/content/render-content/render-content.component';

const routes: Routes = [
  {
    path: 'create-builder',
    component: BuilderCreateComponent
  },
  {
    path: 'render-content',
    component: RenderContentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
