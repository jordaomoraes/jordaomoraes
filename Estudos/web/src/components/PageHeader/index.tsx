import React from 'react'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import logoImage from '../../assets/images/logo.svg'

import './styles.css'
interface PageHeaderProps {

    title: String,
    description?: String
    //a interrogação declara que não é obrigatoria
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to='/'>
                    <img src={backIcon} alt="" />
                </Link>
                <img src={logoImage} alt="" />
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                {/* declara que se exitir a description irá mostrar */}
                {props.description && <p>{props.description}</p>}
                {props.children}
            </div>

        </header>
    )
}

export default PageHeader