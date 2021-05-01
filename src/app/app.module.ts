import { LayoutModule as CdkLayoutModule} from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { OrgModule } from './org/org.module';
import { SharedModule } from './shared/shared.module';
import { HttpBaseUrlInterceptor } from './core/http/http-base-url.interceptor';
import { CoreModule } from './core/core.module';
import { HttpBaseHeadersInterceptor } from './core/http/http-base-headers.interceptor';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkLayoutModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    OrgModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBaseHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBaseUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
