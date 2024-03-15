import React from 'react'
import images from '@/assets'
import Image from 'next/image'
import './loadingView.scss'

export const LoadingView = () => {

    return (
        <div className="loading-view">
            <Image
                src={images.pikachuRunnig}
                alt="Cargando"
                title="Cargando"
                width={300}
                height={300}
                loading="lazy"
            />
            <h1 className="home__description__title" id="animated-text">
                Cargando...
            </h1>
        </div>
    )
}
