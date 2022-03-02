import { MentoresCargoComponent } from './componentes/mentor/mentores-cargo/mentores-cargo.component';
import { MentoresComponent } from './componentes/mentor/mentores/mentores.component';
import { FuncionariosComponent } from './componentes/funcionario/funcionarios/funcionarios.component';
import { ExcluirFuncComponent } from './componentes/funcionario/excluir-func/excluir-func.component';
import { EditarFuncComponent } from './componentes/funcionario/editar-func/editar-func.component';
import { CadastrarFuncComponent } from './componentes/funcionario/cadastrar-func/cadastrar-func.component';
import { ListaFuncComponent } from './componentes/funcionario/lista-func/lista-func.component';
import { HomeComponent } from './componentes/views/home/home.component';
import { CadastrarCargosComponent } from './componentes/cargo/cadastrar-cargos/cadastrar-cargos.component';
import { EditarCargosComponent } from './componentes/cargo/editar-cargos/editar-cargos.component';
import { ExcluirCargosComponent } from './componentes/cargo/excluir-cargos/excluir-cargos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './componentes/cargo/cargos/cargos.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "cargos", component: CargosComponent},
  {path: "excluirCargo/:id_cargo", component: ExcluirCargosComponent},
  {path: "editarCargo/:id_cargo", component: EditarCargosComponent},
  {path: "cadastrarCargo", component: CadastrarCargosComponent},
  {path: "funcCargo/:id_cargo", component: ListaFuncComponent},
  {path: "cadastrarFunc/:id_cargo", component: CadastrarFuncComponent},
  {path: "editarFunc/:id_funcionario/:id_cargo", component: EditarFuncComponent},
  {path: "excluirFunc/:id_funcionario", component: ExcluirFuncComponent},
  {path: "funcionario", component: FuncionariosComponent},
  {path: "mentores", component: MentoresComponent},
  {path: "mentor/:id_cargo", component: MentoresCargoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
