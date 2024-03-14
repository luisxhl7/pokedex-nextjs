import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/assets'
import './index.scss'

const NotFound = () => {
    return (
        <section className='not-found'>
            <div className='not-found__content'>
                <h1> 
                    Página no encontrada
                </h1>

                <Link href='/' className='not-found__link' title='Volver al inicio'>
                    Volver al inicio
                </Link>
                
                <div className='not-found__content__image'>
                    <Image
                        src={images.pikaTriste}
                        alt="Pokeball"
                        width='330'
                        height='330'
                    />
                </div>
            </div>
        </section>
    )
}

export default NotFound