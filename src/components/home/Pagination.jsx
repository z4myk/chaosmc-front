import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Pagination = ({page, increment, decrement, lastPage}) => {
    const prevPage = () => {
        if(page>1){
            decrement()
        }
    }

    const nextPage = () => {
        if(page<lastPage){
            increment()
        }
    }
    

    return (
    <>
        <div className="container d-flex justify-content-center  ">
        <a href="#"><button className='btn btn-outline-dark text-light' onClick={prevPage}> <FontAwesomeIcon icon={faArrowLeft} /></button></a> 
            
                <span className="m-2 text-light">Pagina <span className='text-light' >{page} de {lastPage}</span></span>
                <a href="#"><button className=' btn btn-outline-dark text-light ' onClick={nextPage} ><FontAwesomeIcon icon={faArrowRight} /></button></a> 
        </div>
        </>
    )
}