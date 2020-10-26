import { Component, OnInit } from '@angular/core';
import { SfLoginService } from '../sf-login.service';
import { SfRestApiService } from '../sf-rest-api.service';
import { Note } from '../models/sf.models';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NoteEditDialogComponent } from '../note-edit-dialog/note-edit-dialog.component';

@Component({
  selector: 'app-note-maker',
  templateUrl: './note-maker.component.html',
  styleUrls: ['./note-maker.component.css']
})
export class NoteMakerComponent implements OnInit {
  public listOfNotes: Note[] = [];
  public queryResults: any;

  constructor(
    private _sfRESTAPIService: SfRestApiService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // Fetch the list of Notes by Sales people on load of the page
    this.queryNotes();
  }

  showSessionId() {
    alert(this._sfRESTAPIService.showSessionId());
  }

  queryNotes() {
    this._sfRESTAPIService.queryRecords(this._sfRESTAPIService.getNotesQueryString()).subscribe(
      results => {
        this.queryResults = results;
        this.listOfNotes = results.records as Note[];
        this.showSnackBar('Notes have been loaded successfully!');
        console.log('Fetched list of Notes:');
        console.log(this.listOfNotes);
      }
    );
  }

  createNotes(noteRecord: Note) {
    this._sfRESTAPIService.createRecord('Note__c', noteRecord).subscribe(
      result => {
        if (result.success === true) {
          noteRecord.Id = result.id;  // assign the note record to the list of notes
          // Add the created note to the list of the Notes in the UI
          this.listOfNotes.push(noteRecord);
          this.showSnackBar('Note has been saved successfully!');
        }
      }
    );
  }

  updateNotes(noteRecord: any, noteRecordId: string) {
    this._sfRESTAPIService.updateRecord('Note__c', noteRecord, noteRecordId).subscribe(
      result => {
        console.log('Record update result:');
        console.log(result);
        this.showSnackBar('Note has been updated successfully!');
        // if (result.success === true) {
        //   // Just show an update that the record has been updated and need not update
        //   // the list of Notes in the UI as the change would be by reference.
        //   this.showSnackBar('Note has been updated successfully!');
        // }
      }
    );
  }

  private generateNoteObject(noteResult: any) {
    return {
      // Id : null,
      Name : noteResult.Name as string,
      Description__c : noteResult.Description__c as string,
      Email__c : noteResult.Email__c as string,
      Priority__c : noteResult.Priority__c as string,
      Remind_Later__c : noteResult.Remind_Later__c as boolean
    };
  }

  showSnackBar(message: string, action: string = 'Close') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      width: '450px',
      data: new Note()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        // Create the note record in Salesforce
        this.createNotes(result);
      }
    });
  }

  editDialog(currentNote: Note) {
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      width: '450px',
      data: currentNote
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        // Update the note record in Salesforce
        this.updateNotes(this.generateNoteObject(result), result.Id);
      }
    });
  }

}
