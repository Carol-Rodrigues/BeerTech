import { ListaCargoComponent } from './componentes/cargo/lista-cargo/lista-cargo.component';
import { ListaMentorComponent } from './componentes/mentor/lista-mentor/lista-mentor.component';
import { HomeComponent } from './template/home/home.component';
import { AuthGuard } from './guards/auth.guard';
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
import { LoginComponent } from './template/login/login.component';
import { CadastrarCargosComponent } from './componentes/cargo/cadastrar-cargos/cadastrar-cargos.component';
import { EditarCargosComponent } from './componentes/cargo/editar-cargos/editar-cargos.component';
import { ExcluirCargosComponent } from './componentes/cargo/excluir-cargos/excluir-cargos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './componentes/cargo/cargos/cargos.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},

  // Cargo
  {path: "card-cargo", component: CargosComponent},
  {path: "cargo", component: ListaCargoComponent, canActivate: [AuthGuard]},
  {path: "cargo/excluir/:id_cargo", component: ExcluirCargosComponent, canActivate: [AuthGuard]},
  {path: "cargo/editar/:id_cargo", component: EditarCargosComponent, canActivate: [AuthGuard]},
  {path: "cargo/cadastrar", component: CadastrarCargosComponent, canActivate: [AuthGuard]},
  {path: "cargo/funcionario/:id_cargo", component: ListaFuncComponent},
  {path: "cargo/:id_cargo/funcionario/cadastro", component: CadastrarFuncComponent, canActivate: [AuthGuard]},

  // Funcionário
  {path: "funcionario/cadastrar", component: CadastrarFuncComponent, canActivate: [AuthGuard]},
  {path: "funcionario/editar/:id_funcionario/:id_cargo", component: EditarFuncComponent, canActivate: [AuthGuard]},
  {path: "funcionario/excluir/:id_funcionario", component: ExcluirFuncComponent, canActivate: [AuthGuard]},
  {path: "funcionario/cargo/:id_cargo", component: ListaFuncCargoComponent, canActivate: [AuthGuard]},
  {path: "funcionarios", component: FuncionariosComponent, canActivate: [AuthGuard]},
  {path: "funcionarios/atribuirCargo/:id_funcionario/:id_cargo", component: AtribuirCargoComponent, canActivate: [AuthGuard]},

  // Mentor
  {path: "mentores", component: MentoresComponent, canActivate: [AuthGuard]},
  {path: "card-mentores", component: ListaMentorComponent},
  {path: "mentor/:id_cargo", component: MentoresCargoComponent, canActivate: [AuthGuard]},
  {path: "mentor/atribuirCargo/:id_mentor", component: AtribuirCargoMentorComponent, canActivate: [AuthGuard]},
  {path: "mentores/cadastrar", component: CadastrarMentorComponent, canActivate: [AuthGuard]},
  {path: "mentores/excluir/:id_mentor", component: ExcluirMentorComponent, canActivate: [AuthGuard]},
  {path: "mentores/editar/:id_mentor/:id_cargo", component: EditarMentorComponent, canActivate: [AuthGuard]},

  // Bonificação
  {path:"mentores/bonificacao/:id_mentor/cadastrar", component:CadastrarBonificacaoComponent, canActivate: [AuthGuard]},
  {path:"mentores/bonificacao/:id_mentor/editar/:codigo", component:EditarBonificacaoComponent, canActivate: [AuthGuard]},
  {path:"mentores/bonificacao/:id_mentor/excluir/:codigo", component:ExcluirBonificacaoComponent, canActivate: [AuthGuard]},
  {path:"mentores/bonificacao/:id_mentor", component:BonificacaoMentorComponent, canActivate: [AuthGuard]},


  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", redirectTo: "/home", pathMatch: "full"}, //testar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
