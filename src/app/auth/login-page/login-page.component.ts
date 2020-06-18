import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  user$: Observable<User>;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.user$.subscribe((p) => console.log(p));
  }

  onLoginWithGoogle() {
    this.auth.googleSignin();
  }

  onSignOut() {
    this.auth.signOut();
  }
}
