import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSelectModule } from '@angular/material/select'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTabsModule } from '@angular/material/tabs'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatGridListModule, MatSidenavModule, MatTabsModule, MatSelectModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
