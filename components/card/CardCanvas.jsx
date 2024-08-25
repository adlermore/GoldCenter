'use client'
import IconShop from '@/public/icons/IconShop'
import React from 'react'

function CardCanvas() {

    return (
        <>
            <div className='duration-300 cursor-pointer hover:opacity-70'>
                <IconShop className='text-white [&>path]:fill-white' />
            </div>
        </>
    )
}

export default CardCanvas