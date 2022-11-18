import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/person/person.component';
import { PreviewComponent } from './components/preview/preview.component';

import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    OthersComponent,
    PeopleComponent,
    PersonComponent,
    PreviewComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
