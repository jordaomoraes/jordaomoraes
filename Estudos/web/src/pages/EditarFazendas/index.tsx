import React, { useState, FormEvent, useEffect } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom'
import api from '../../server/api';
import { useParams } from 'react-router-dom';

interface EditarFazendasProps {
    id: number;
}
 const  EditarFazendas: React.FC<EditarFazendasProps> =() => {
    const idFazenda = useParams();
    const history = useHistory()
    const [razao, setRazao] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [regiao, setRegiao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [id, setId] = useState('');    

    useEffect(() => {

        const valor = (Object.values(idFazenda))
        const valorfinal = valor[0]
        api.get('fazendas2/' + valorfinal).then(response =>{   
               console.log(response.data);   
            //   setFazendas(response.data)  
               setRazao(response.data[0].razao)
               setCnpj(response.data[0].cnpj)
               setRegiao(response.data[0].regiao)
               setEndereco(response.data[0].endereco)             
               setId(response.data[0].id)             
           })
    }, [idFazenda])   
  

    function atualizaFazenda(e: FormEvent) {
        e.preventDefault();
        api.put('fazendas/', {
            razao,
            cnpj,
            endereco,
            regiao,
            id,
        }).then(()=>{

                alert('Cadastro Alterado com Sucesso!')
                history.push('/')
        })
    }

    return (
        <div id="page-fazendas" className="container">
            <PageHeader title="Editar Dados da Fazenda" >
                <form onSubmit={atualizaFazenda} id="busca-fazendas">
                    <Input
                        label="Razão Social"
                        name="razao"
                        defaultValue={razao}
                        onChange={(e) => { setRazao(e.target.value) }}
                         />

                    <Input label="CNPJ" 
                        name="cnpj" 
                        defaultValue={cnpj} 
                        onChange={(e) => { setCnpj(e.target.value) }}
                         />

                    <Input label="Região" 
                        name="regiao" 
                        placeholder="Search..."
                        defaultValue={regiao} 
                        onChange={(e) => { setRegiao(e.target.value) }}
                         />

                    <Input label="Endereço" 
                        name="endereco" 
                        defaultValue={endereco} 
                        onChange={(e) => { setEndereco(e.target.value) }}
                         />
                        
                    <button type="submit">
                        Salvar Dados
                </button>
                </form>
            </PageHeader>
            <main>

            </main>
        </div>
    )
}

export default EditarFazendas