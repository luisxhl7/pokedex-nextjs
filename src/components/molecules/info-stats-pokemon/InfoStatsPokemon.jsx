import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './InfoStatsPokemon.scss'

const Text = ({ className, url }) => {
    const [text, setText] = useState()
    
    const getInfoUrl = async() => {
        const resp = await axios.get(url)
        setText(resp?.data?.names[5]?.name)
    }

    useEffect(() => {
        if (url) {
            getInfoUrl()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <p className={`${className} --color${text}`}>
            {text ? text : '???'}
        </p>
    )
}

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
            <h2 className='info-stats-pokemon__title-type'>Tipo</h2>
            <div className='info-stats-pokemon__type'>
                {isLoad? 
                    <>
                        <Text 
                            className='info-stats-pokemon__type__text' 
                            url={false}
                        />
                    </> 
                    :
                    types?.map( (item, index) => (
                        <Text 
                            key={index} 
                            className='info-stats-pokemon__type__text' 
                            url={item?.type?.url}
                        />
                    ))
                }
            </div>
            <h2 className='info-stats-pokemon__title-skills'>Habilidades</h2>
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
                        <Text 
                            key={index} 
                            className='info-stats-pokemon__ability__name' 
                            url={item?.stat?.url}
                        />
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
