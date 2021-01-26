import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

export interface Fazenda {

  razao?: string;
  cnpj?: string;
  endereco?: string;
  regiao?: string;
  id?: number
}
interface FazendaItemProps {
  fazenda: Fazenda
}

const FazendaItem: React.FC<FazendaItemProps> = ({ fazenda }) => {
  return (
    <header className="fazenda-item">

      <p><strong>Id - </strong>{fazenda.id}</p>
      <p><strong> Razão Social - </strong> {fazenda.razao}</p>
      <p> <strong>Região -</strong> {fazenda.regiao}</p>
      <p> <strong> CNPJ - </strong>{fazenda.cnpj}</p>
      <p><strong>Endereço - </strong> {fazenda.endereco}</p>
      <div className="buttons-container">
      <Link to={"/editfazendas/" + fazenda.id} className='study'> Editar Informações </Link>
      </div>   
    </header>
  );
}

export default FazendaItem;
