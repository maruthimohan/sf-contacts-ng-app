import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../models/sf.models';

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.css']
})
export class NoteEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
