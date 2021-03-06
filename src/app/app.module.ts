import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { HttpModule } from '@angular/http';
import {FormsModule} from "@angular/forms";
import { routing } from './app.routing'
import {GlobalService} from "./shared/global.service";
import {LocalStorage} from "./shared/localStorage.service";
import {SerialportService} from "./shared/serialport.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        SerialportService,
        GlobalService,
        LocalStorage
    ]
})
export class AppModule {
}

