import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SfLoginComponent } from './sf.login/sf.login.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line: max-line-length
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatSelectModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NoteMakerComponent } from './note-maker/note-maker.component';
import { NoteEditDialogComponent } from './note-edit-dialog/note-edit-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SfLoginComponent,
    NoteMakerComponent,
    NoteEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule
  ],
  entryComponents: [
    NoteEditDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
