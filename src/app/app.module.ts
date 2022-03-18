import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './template/home/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para estilização da moeda
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from "@angular/common/locales/pt";
import { CurrencyPipe, registerLocaleData } from "@angular/common"
registerLocaleData(localePt)

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { traduzirLegendas } from './template/traducaoPag';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';

import { LoginComponent } from './template/login/login.component';
import { HeaderComponent } from './template/header/header.component';
import { ExcluirCargosComponent } from './componentes/cargo/excluir-cargos/excluir-cargos.component';
import { EditarCargosComponent } from './componentes/cargo/editar-cargos/editar-cargos.component';
import { CadastrarCargosComponent } from './componentes/cargo/cadastrar-cargos/cadastrar-cargos.component';
import { FooterComponent } from './template/footer/footer.component';
import { CargosComponent } from './componentes/cargo/cargos/cargos.component';
import { FormsModule } from '@angular/forms';
import { ListaFuncComponent } from './componentes/funcionario/lista-func/lista-func.component';
import { EditarFuncComponent } from './componentes/funcionario/editar-func/editar-func.component';
import { CadastrarFuncComponent } from './componentes/funcionario/cadastrar-func/cadastrar-func.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ExcluirFuncComponent } from './componentes/funcionario/excluir-func/excluir-func.component';
import { FuncionariosComponent } from './componentes/funcionario/funcionarios/funcionarios.component';
import { MentoresComponent } from './componentes/mentor/mentores/mentores.component';
import { MentoresCargoComponent } from './componentes/mentor/mentores-cargo/mentores-cargo.component';
import { AtribuirCargoMentorComponent } from './componentes/mentor/atribuir-cargo-mentor/atribuir-cargo-mentor.component';
import { AtribuirCargoComponent } from './componentes/funcionario/atribuir-cargo/atribuir-cargo.component';
import { ListaFuncCargoComponent } from './componentes/funcionario/lista-func-cargo/lista-func-cargo.component';
import { CadastrarMentorComponent } from './componentes/mentor/cadastrar-mentor/cadastrar-mentor.component';
import { CadastrarBonificacaoComponent } from './componentes/bonificacao/cadastrar-bonificacao/cadastrar-bonificacao.component';
import { ExcluirBonificacaoComponent } from './componentes/bonificacao/excluir-bonificacao/excluir-bonificacao.component';
import { EditarBonificacaoComponent } from './componentes/bonificacao/editar-bonificacao/editar-bonificacao.component';
import { BonificacaoMentorComponent } from './componentes/bonificacao/bonificacao-mentor/bonificacao-mentor.component';

import { NgxCurrencyModule } from "ngx-currency";
import { EditarMentorComponent } from './componentes/mentor/editar-mentor/editar-mentor.component';
import { ExcluirMentorComponent } from './componentes/mentor/excluir-mentor/excluir-mentor.component';

import { CpfPipe } from './pipes/cpf.pipes';
import { HomeComponent } from './template/home/home.component';
import { HeaderUserComponent } from './template/header-user/header-user.component';
import { ListaMentorComponent } from './componentes/mentor/lista-mentor/lista-mentor.component';
import { ListaCargoComponent } from './componentes/cargo/lista-cargo/lista-cargo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ExcluirCargosComponent,
    EditarCargosComponent,
    CadastrarCargosComponent,
    FooterComponent,
    CargosComponent,
    ListaFuncComponent,
    EditarFuncComponent,
    CadastrarFuncComponent,
    ExcluirFuncComponent,
    FuncionariosComponent,
    MentoresComponent,
    MentoresCargoComponent,
    AtribuirCargoMentorComponent,
    AtribuirCargoComponent,
    ListaFuncCargoComponent,
    CadastrarMentorComponent,
    CadastrarBonificacaoComponent,
    ExcluirBonificacaoComponent,
    EditarBonificacaoComponent,
    BonificacaoMentorComponent,
    EditarMentorComponent,
    ExcluirMentorComponent,
    CpfPipe,
    HomeComponent,
    HeaderUserComponent,
    ListaMentorComponent,
    ListaCargoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    NgxCurrencyModule,
    MatRadioModule,
    MatDividerModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: traduzirLegendas() },
              {provide: LOCALE_ID, useValue: "pt-BR"},
              {provide: DEFAULT_CURRENCY_CODE, useValue: "BRL"},
              CurrencyPipe,
              AuthService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
