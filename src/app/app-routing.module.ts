import { EditarMentorComponent } from './componentes/mentor/editar-mentor/editar-mentor.component';
import { ExcluirMentorComponent } from './componentes/mentor/excluir-mentor/excluir-mentor.component';
import { ExcluirBonificacaoComponent } from './componentes/bonificacao/excluir-bonificacao/excluir-bonificacao.component';
import { EditarBonificacaoComponent } from './componentes/bonificacao/editar-bonificacao/editar-bonificacao.component';
import { CadastrarBonificacaoComponent } from './componentes/bonificacao/cadastrar-bonificacao/cadastrar-bonificacao.component';
import { BonificacaoMentorComponent } from './componentes/bonificacao/bonificacao-mentor/bonificacao-mentor.component';
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
  {path: "home", component: HomeComponent},

  // Cargo
  {path: "cargo", component: CargosComponent},
  {path: "cargo/excluir/:id_cargo", component: ExcluirCargosComponent},
  {path: "cargo/editar/:id_cargo", component: EditarCargosComponent},
  {path: "cargo/cadastrar", component: CadastrarCargosComponent},
  {path: "cargo/funcionario/:id_cargo", component: ListaFuncComponent},
  {path: "cargo/:id_cargo/funcionario/cadastro", component: CadastrarFuncComponent},

  // Funcionário
  {path: "funcionario/cadastrar", component: CadastrarFuncComponent},
  {path: "funcionario/editar/:id_funcionario/:id_cargo", component: EditarFuncComponent},
  {path: "funcionario/excluir/:id_funcionario", component: ExcluirFuncComponent},
  {path: "funcionario/cargo/:id_cargo", component: ListaFuncCargoComponent},
  {path: "funcionarios", component: FuncionariosComponent},
  {path: "funcionarios/atribuirCargo/:id_funcionario/:id_cargo", component: AtribuirCargoComponent},

  // Mentor
  {path: "mentores", component: MentoresComponent},
  {path: "mentor/:id_cargo", component: MentoresCargoComponent},
  {path: "mentor/atribuirCargo/:id_mentor", component: AtribuirCargoMentorComponent},
  {path: "mentores/cadastrar", component: CadastrarMentorComponent},
  {path: "mentores/excluir/:id_mentor", component: ExcluirMentorComponent},
  {path: "mentores/editar/:id_mentor/:id_cargo", component: EditarMentorComponent},

  // Bonificação
  {path:"mentores/bonificacao/:id_mentor/cadastrar", component:CadastrarBonificacaoComponent},
  {path:"mentores/bonificacao/:id_mentor/editar/:codigo", component:EditarBonificacaoComponent},
  {path:"mentores/bonificacao/:id_mentor/excluir/:codigo", component:ExcluirBonificacaoComponent},
  {path:"mentores/bonificacao/:id_mentor", component:BonificacaoMentorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
