import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { HomeComponent } from './template/home/home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    CadastrarMentorComponent
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
    MatSelectModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: traduzirLegendas() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
