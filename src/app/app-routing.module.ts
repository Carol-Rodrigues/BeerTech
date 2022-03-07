import { CadastrarMentorComponent } from './componentes/mentor/cadastrar-mentor/cadastrar-mentor.component';
import { ListaFuncCargoComponent } from './componentes/funcionario/lista-func-cargo/lista-func-cargo.component';
import { AtribuirCargoComponent } from './componentes/funcionario/atribuir-cargo/atribuir-cargo.component';
import { AtribuirCargoMentorComponent } from './componentes/mentor/atribuir-cargo-mentor/atribuir-cargo-mentor.component';
import { MentoresCargoComponent } from './componentes/mentor/mentores-cargo/mentores-cargo.component';
import { MentoresComponent } from './componentes/mentor/mentores/mentores.component';
import { FuncionariosComponent } from './componentes/funcionario/funcionarios/funcionarios.component';
import { ExcluirFuncComponent } from './componentes/funcionario/excluir-func/excluir-func.component';
import { EditarFuncComponent } from './componentes/funcionario/editar-func/editar-func.component';
import { CadastrarFuncComponent } from './componentes/funcionario/cadastrar-func/cadastrar-func.component';
import { ListaFuncComponent } from './componentes/funcionario/lista-func/lista-func.component';
import { HomeComponent } from './template/home/home.component';
import { CadastrarCargosComponent } from './componentes/cargo/cadastrar-cargos/cadastrar-cargos.component';
import { EditarCargosComponent } from './componentes/cargo/editar-cargos/editar-cargos.component';
import { ExcluirCargosComponent } from './componentes/cargo/excluir-cargos/excluir-cargos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './componentes/cargo/cargos/cargos.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent}, //
  {path: "cargo", component: CargosComponent}, //
  {path: "cargo/excluir/:id_cargo", component: ExcluirCargosComponent}, //
  {path: "cargo/editar/:id_cargo", component: EditarCargosComponent}, //
  {path: "cargo/cadastrar", component: CadastrarCargosComponent}, //
  {path: "cargo/funcionario/:id_cargo", component: ListaFuncComponent}, //
  {path: "funcionario/cadastrar", component: CadastrarFuncComponent},
  {path: "cargo/:id_cargo/funcionario/cadastro", component: CadastrarFuncComponent},
  {path: "funcionario/editar/:id_funcionario/:id_cargo", component: EditarFuncComponent},
  {path: "funcionario/excluir/:id_funcionario", component: ExcluirFuncComponent},
  {path: "funcionario/cargo/:id_cargo", component: ListaFuncCargoComponent}, //ListaAlunosDaTurma
  {path: "funcionarios", component: FuncionariosComponent}, //alunosComTurma
  {path: "funcionario/atribuirCargo/:id_funcionario/:id_cargo", component: AtribuirCargoComponent},
  {path: "mentores/listaMentor", component: MentoresComponent}, //listaProfessor
  {path: "mentor/:id_cargo", component: MentoresCargoComponent}, //ProfessorDaTurma
  {path: "mentor/atribuirCargo/:id_mentor", component: AtribuirCargoMentorComponent},
  {path: "mentores/cadastrar", component: CadastrarMentorComponent}, //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
