import React from 'react'

import {Link} from "react-router-dom"

import './styles.css'

import logoIgm from '../../assets/images/logo.svg'
import landingIgm from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'

function Landing() {

  
    return (
        <div id="page-landing">
            <div id="page-landing-contente" className="container">
                <div className="logo-container">
                    <img src={logoIgm} alt="Proffy" />
                    <h2>Cadastro de Cafés e Fazendas!</h2>
                </div>
                <img src={landingIgm} alt="" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/fazendas" className='study'>
                        <img src={studyIcon} alt="" />
                        Cadastrar Fazendas
                    </Link>

                    <Link to="/cafecru" className='give-classes'>
                        <img src={giveClassesIcon} alt="" />
                        Cadastrar Cafés
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing