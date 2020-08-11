import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";
import { QuizComponent } from "./quiz/quiz.component";
import { HomeComponent } from "./home/home.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'leaderboard', component: LeaderboardComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}