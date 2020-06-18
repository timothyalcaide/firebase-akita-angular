import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isAuth$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.afAuth.authState.pipe(map((user) => !!user));
  }
}
