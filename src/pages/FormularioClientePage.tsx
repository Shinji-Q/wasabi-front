import { useState } from 'react';
import { api } from "../shared/services/api";
import Input from 'react-input-auto-format';
import wasabiLogo from "../assets/wasabi-logo.png";

import "../../style/tailwind.css"
import WasabiDBApi, { cliente, endereco, usuario } from '../wasabiDB';
//import "../../js/input_phone.js"

export function FormularioClientePage(){
    const [endereco, setEndereco] = useState<endereco>({
         enderecoBairro: "",
         enderecoCep: "",
         enderecoCidade: "",
         enderecoEstado: "",
         enderecoPais: "Brasil",
         enderecoRua: "",
         id: null
    })

    const [clientevar, setCliente] = useState<cliente>({
        clienteCpf: "",
        clienteNome: "",
        clienteTelefone: "",
        clienteSobrenome: "",
        clienteId: null,
        cartaos: null,
        enderecos: [ endereco ]
    })

    const [usuario, setUsuario] = useState<usuario>({
        usuarioId: null,
        usuarioEmail: "",
        usuarioTipo: "CONSUMIDOR",
        usuarioSenha: "",
        cliente: clientevar
    });

    const sumbitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        clientevar.enderecos = [endereco];
        usuario.cliente = clientevar;
        console.log(usuario)

        WasabiDBApi.createUsuario(usuario).then((response) => {
          setUsuario(response)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }


    const onChangeHandlerUsuario = (event: HTMLInputElement) => {
        const { name, value } = event
        setUsuario((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const onChangeHandlerCliente = (event: HTMLInputElement) => {
        const { name, value } = event
        setCliente((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const onChangeHandlerEndereco = (event: HTMLInputElement) => {
        const { name, value } = event
        setEndereco((prev) => {
            return { ...prev, [name]: value }
        })
    }


    return (

        <>
        
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img className="mx-auto h-32 w-auto" src={wasabiLogo} />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Cadastre-se
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Ou
							<a className="font-medium text-indigo-600 hover:text-indigo-500" href="/login   "> entrar</a>
						</p>
					</div>
						<form className="new_user" onSubmit={sumbitForm} accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" />

							<div className="mb-4 md:flex md:justify-between">
								<div className="flex-grow">
									<label className="sr-only" htmlFor="user_perfil_attributes_nome">Nome</label>
									<input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nome" type="text" name="clienteNome"  onChange={(e) => onChangeHandlerCliente(e.target)}/>

								</div>
								<div className="flex-grow">
									<label className="sr-only">Sobrenome</label>
									<input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Sobrenome" type="text" name="clienteSobrenome" onChange={(e) => onChangeHandlerCliente(e.target)}/>

								</div>
							</div>
							<div className="mb-6 md:flex md:justify-between">
								<div className="flex-grow">
									<label className="sr-only">Telefone</label>
                                    <Input format="(##) #####-####" placeholder="(00) 00000-0000" className="appearance-none rounded-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-l-md" name="clienteTelefone" onChange={(e) => onChangeHandlerCliente(e.target)} type="text" id="telefone" ></Input>
								</div>

								<div className="flex-grow">
									<label className="sr-only">CPF</label>
                                    <Input format="###.###.###-##" placeholder="000.000.000-00" className="appearance-none rounded-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-l-md" name="clienteCpf" onChange={(e) => onChangeHandlerCliente(e.target)} type="text"></Input>
								</div>
							</div>

							<div className="rounded-md shadow-sm -space-y-px">
								<div className="mb-6 md:flex md:justify-between">
									<div className="flex-grow">
										<label className="sr-only">Rua</label>
										<input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-0" placeholder="Rua" type="text" name="enderecoRua" onChange={(e) => onChangeHandlerEndereco(e.target)} />

									</div>
									<div className="flex-grow w-1/6">
										<label className="sr-only">CEP</label>
                                        <Input format="##.###-###" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-0" placeholder="CEP" type="text" name="enderecoCep" onChange={(e) => onChangeHandlerEndereco(e.target)}></Input>

									</div>
								</div>
								<div className="mb-6 md:flex md:justify-between">
									<div className="flex-grow">
										<label className="sr-only">Bairro</label>
										<input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Bairro" type="text" name="enderecoBairro" onChange={(e) => onChangeHandlerEndereco(e.target)}/>

									</div>
									<div className="flex-grow">
										<label className="sr-only">Cidade</label>
										<input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Cidade" type="text" name="enderecoCidade" onChange={(e) => onChangeHandlerEndereco(e.target)}/><br/>


									</div>
									<div className="flex-grow w-2/6">
										<label className="sr-only">Estado</label>
										<input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="PA" maxLength={2} size={2} type="text" name="enderecoEstado" onChange={(e) => onChangeHandlerEndereco(e.target)} /><br/>

									</div>
								</div>
							</div>
							<div className="rounded-md shadow-sm -space-y-px mb-5">
								<div>
									<label className="sr-only" htmlFor="email-address">Email</label>
									<input autoComplete="email" id="email-address" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-5" placeholder="Email address" type="email" name="usuarioEmail" onChange={(e) => onChangeHandlerUsuario(e.target)} />

								</div>
								<p className="text-center text-sm text-gray-500">6 characters minimum</p>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input autoComplete="current-password" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" type="password" name="usuarioSenha" onChange={(e) => onChangeHandlerUsuario(e.target)} />
                                </div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input name="remember-me" type="hidden" value="0" autoComplete="off" /><input className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" name="remember-me" id="remember-me" type="checkbox" value="1" />
									<label className="ml-2 block text-sm text-gray-900" htmlFor="user_remember_me">Lembrar-me</label>
								</div>

								<div className="text-sm">
									<a className="font-medium text-indigo-600 hover:text-indigo-500" href="#">Esqueceu sua senha?</a>
								</div>
							</div>
							<br/>
								<div className="actions">
									<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            
											<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
											</svg>
										</span>
										<input type="submit" name="commit" value="Cadastrar-se" data-disable-with="Cadastrar-se" />
									</button>
								</div>
						</form>
				</div>
			</div>
        
        </>


    );
}