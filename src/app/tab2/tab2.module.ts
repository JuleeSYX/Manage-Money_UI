import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HeaderModule } from "../header/header.module";

@NgModule({
    declarations: [Tab2Page],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab2PageRoutingModule,
        HeaderModule,
    ]
})
export class Tab2PageModule {}
