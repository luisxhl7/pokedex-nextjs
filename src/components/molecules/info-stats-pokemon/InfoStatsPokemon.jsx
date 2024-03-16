import React, { useEffect, useState } from 'react'
import typesPokemons from "@/assets/typesPokemons";
import Image from 'next/image';
import './InfoStatsPokemon.scss'

const UpNumbers = (numeroTotal) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentNumber(prevNumber => {
                const nextNumber = prevNumber + 1;
                if (nextNumber <= numeroTotal) {
                    return nextNumber;
                } else {
                    return prevNumber; // Mantener el número actual si ya alcanzamos el número total
                }
            });
        }, 5);``

        return () => clearTimeout(timeoutId);
    }, [currentNumber, numeroTotal]);

    return currentNumber;
};


export const InfoStatsPokemon = ({types, stats, isLoad}) => {

    return (
        <div className='info-stats-pokemon__section-2'>
            <h2 className='info-stats-pokemon__title-type'>Type</h2>
            <div className='info-stats-pokemon__type'>
                {isLoad ? 
                    <p className='info-stats-pokemon__type__text'>????</p>
                    :
                    types?.map( (item, index) => (
                        <p key={index} className={`info-stats-pokemon__type__text --color${item?.type?.name}`}>
                            <Image
                                src={typesPokemons[item?.type?.name]}
                                alt="icono tipo de pokemon"
                                width={20}
                                height={20}
                                title={item?.type?.name}
                                className="cardPokemon__type-pokemon"
                            />
                           {item?.type?.name}
                        </p>
                    ))
                }
            </div>

            <h2 className='info-stats-pokemon__title-skills'>Skills</h2>
            {isLoad ?
                Array.from({ length: 6 }, (_, index) => (
                    <div className='info-stats-pokemon__ability' key={index}>
                        <p className='info-stats-pokemon__ability__name'>
                            ???
                        </p>
                        <div className='info-stats-pokemon__ability__content'>
                            <div className='info-stats-pokemon__ability__stat'>
                                <p >
                                    ???
                                </p>
                            </div>
                        </div>
                    </div>
                ))
                :
                stats?.map( (item, index) => (
                    <div className='info-stats-pokemon__ability' key={index}>
                        <p className='info-stats-pokemon__ability__name' >
                            {item?.stat?.name}
                        </p>
                        <div className='info-stats-pokemon__ability__content'>
                            <div className='info-stats-pokemon__ability__stat' style={{ width: `${item?.base_stat}px` }}>
                                <p>
                                    {item?.base_stat ? UpNumbers(item?.base_stat) : '???'} 
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
