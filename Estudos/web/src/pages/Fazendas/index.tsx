import React, { useState, FormEvent, useEffect } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import FazendaItem, { Fazenda } from '../../components/FazendaItem'
import api from '../../server/api';
import { useHistory } from 'react-router-dom'

import './styles.css'

// interface Fazenda {

//     id:number;
// }

function Fazendas() {
    const history = useHistory()
    useEffect(() => {

        api.get('fazendas').then(response => {           

            setFazendas(response.data)

        })


    }, [])

    const [razao, setRazao] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [regiao, setRegiao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [fazendas, setFazendas] = useState([]);

    function createFazenda(e: FormEvent) {
        e.preventDefault();

        api.post('fazendas', {
            razao,
            cnpj,
            endereco,
            regiao,
        }).then(() => {

            alert('Cadastro Efetuado com Sucesso!')
            history.push('/')
        })
    }
    async function busca_teste(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('/')
        console.log(response.data)
    }

    async function listaFazendas(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('fazendas')
        console.log(response.data)
        // setFazendas(response.data)
    }
    return (
        <div id="page-fazendas" className="container">
            <PageHeader title="Cadastre aqui suas Fazendas" >
                <form onSubmit={createFazenda} id="busca-fazendas">
                    <Input
                        label="Razão Social"
                        name="razao"
                        value={razao}
                     onChange={(e) => { setRazao(e.target.value) }}
                    />

                    <Input label="CNPJ"
                        name="cnpj"
                        value={cnpj}
                    onChange={(e) => { setCnpj(e.target.value) }}
                    />
                    <Input label="Região"
                        name="regiao"
                        value={regiao}
                      onChange={(e) => { setRegiao(e.target.value) }}
                    />
                    <Input label="Endereço"
                        name="endereco"
                        value={endereco}
                      onChange={(e) => { setEndereco(e.target.value) }}
                    />
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </form>
            </PageHeader>
            <main>
                {fazendas.map((fazenda: Fazenda) => {
                    return <FazendaItem key={fazenda.id} fazenda={fazenda} />
                })}
            </main>
        </div>
    )
}

export default Fazendas