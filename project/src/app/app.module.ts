import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuilderCreateComponent } from './pages/builder/builder-create/builder-create.component';
import { RenderContentComponent } from './pages/content/render-content/render-content.component';

@NgModule({
  declarations: [
    AppComponent,
    BuilderCreateComponent,
    RenderContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }