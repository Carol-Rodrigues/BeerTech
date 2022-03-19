'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">empresa-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' : 'data-target="#xs-components-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' :
                                            'id="xs-components-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AtribuirCargoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtribuirCargoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AtribuirCargoMentorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtribuirCargoMentorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BonificacaoMentorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BonificacaoMentorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastrarBonificacaoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CadastrarBonificacaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastrarCargosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CadastrarCargosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastrarFuncComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CadastrarFuncComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastrarMentorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CadastrarMentorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CargosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CargosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarBonificacaoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarBonificacaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarCargosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarCargosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarFuncComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarFuncComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarMentorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarMentorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExcluirBonificacaoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExcluirBonificacaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExcluirCargosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExcluirCargosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExcluirFuncComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExcluirFuncComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExcluirMentorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExcluirMentorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FuncionariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaCargoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaCargoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaFuncCargoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaFuncCargoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaFuncComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaFuncComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaMentorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaMentorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MentoresCargoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MentoresCargoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MentoresComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MentoresComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' : 'data-target="#xs-injectables-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' :
                                        'id="xs-injectables-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' : 'data-target="#xs-pipes-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' :
                                            'id="xs-pipes-links-module-AppModule-dcabf64c8f7a92143d19387e0c64d369f8f41f8994d6c965a2b5ec3eb3a7c1f68d47246b56d16b61c48e94cc2eb72a1b2e6b410ffed23679419e7af97cec44b0"' }>
                                            <li class="link">
                                                <a href="pipes/CpfPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CpfPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BonificacaoService.html" data-type="entity-link" >BonificacaoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CargosService.html" data-type="entity-link" >CargosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuncionariosService.html" data-type="entity-link" >FuncionariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MentorService.html" data-type="entity-link" >MentorService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Bonificacao.html" data-type="entity-link" >Bonificacao</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cargo.html" data-type="entity-link" >Cargo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Funcionario.html" data-type="entity-link" >Funcionario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Mentor.html" data-type="entity-link" >Mentor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});