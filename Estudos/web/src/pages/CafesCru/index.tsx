import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../server/api';




import './styles.css'

function CafesCru() {

    const [tipo, setTipo] = useState('');
    const [qtd_atual, setQtd_atual] = useState('');
    const [qtd_minima, setQtd_minima] = useState('');
    const [fazenda, setFazenda] = useState('');

    function createCafeCru(e: FormEvent) {
        e.preventDefault();
        api.post('cafescrus', {
            tipo,
            qtd_atual : Number(qtd_atual),
            qtd_minima: Number(qtd_minima),
            fazenda_id: Number(fazenda)
        }).then(()=>{

            alert('Cadastro Realizado com Sucesso!')
        })
        console.log({
            tipo,
            qtd_atual : Number(qtd_atual),
            qtd_minima: Number(qtd_minima),
            fazenda: Number(fazenda)
        })
    }


    return (
        <div id="page-cafesCru" className="container">
            <form onSubmit={createCafeCru} id="create-cafeCru">
            <PageHeader
                title="Cadastrar aqui Seus Cafés"
                description="Insira aqui todos os dados!"
            />
            <main>            
                <fieldset>
                    <legend>Dados do Café</legend>
                    <Select 
                    label = "Tipo do Café" 
                    name="tipo" 
                    value={tipo}
                    onChange={(e) => {setTipo(e.target.value) }}
                    options = {[
                        { value: 'Conilon', label:'Conilon' },
                        { value: 'Arábica', label:'Arábica' },
                        {value: 'Extra-Forte', label:'Extra-Forte' },
                    ]}                    
                    />  
                    <Input label = "Quantidade Atual" name="qtd_atual" value={qtd_atual} onChange={(e) => {setQtd_atual(e.target.value) }} />
                    <Input label = "Quantidade Mínima" name="qtd_minima" value={qtd_minima} onChange={(e) => {setQtd_minima(e.target.value) }} /> 
                    <Input label = "Fazenda Produtora" name="fazenda" value={fazenda} onChange={(e) => {setFazenda(e.target.value) }} /> 
                </fieldset>
                <footer>
                    <p>
                        <img alt="Aviso Importante"/>
                        Importante! <br />
                        Preencha Todos os Dados
                    </p>
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </footer>   
                          
            </main>

            </form> 
           

        </div>
    )
}

export default CafesCru