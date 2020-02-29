import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {User} from '../../services/auth.service';

@Component({
  selector: 'app-helpers-list',
  templateUrl: './helpers-list.component.html',
  styleUrls: ['./helpers-list.component.scss']
})
export class HelpersListComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<HelpersListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {currentUserName: string, helpers: User[]}
  ) {}

  pickHelper(event: MouseEvent, username: string): void {
    this.bottomSheetRef.dismiss(username);
    event.preventDefault();
  }

  ngOnInit() {
  }

}
