import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { AllComponent } from './components/all/all.component';
import { TopComponent } from './components/top/top.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page, AllComponent, TopComponent, ChartComponent]
})
export class Tab3PageModule {}
