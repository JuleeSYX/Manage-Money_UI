import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Page } from './tab4.page';
import { CookieService } from 'ngx-cookie-service';
import { CookieModule } from 'ngx-cookie';

@NgModule({
    declarations: [Tab4Page],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Tab4PageRoutingModule,
        CookieModule
    ],
    providers:[CookieService]
})
export class Tab4PageModule {}
