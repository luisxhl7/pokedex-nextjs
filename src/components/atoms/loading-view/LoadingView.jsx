import React, { useEffect } from 'react'
import images from '@/assets'
import Image from 'next/image'
import './loadingView.scss'

export const LoadingView = () => {

    useEffect(() => {
        const text = document.getElementById('animated-text');
        const letters = text.innerText.split('');
        text.innerText = '';
        letters.forEach((letter, index) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.style.position = 'relative';
          span.style.animation = `move 1s ${index / 7}s forwards infinite`;
          text.appendChild(span);
        });
    }, []);

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
