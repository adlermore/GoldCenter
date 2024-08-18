import IconArrowBottom from '@/public/icons/IconArrowBottom'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

function PriceToggle() {
    return (
        <Menu matchWidth={false} className="max-w-[50px]">
            <MenuButton>
                <div className='flex items-center cursor-pointer duration-300 hover:opacity-70 text-white gap-[7px]'>
                    AMD <IconArrowBottom />
                </div>
            </MenuButton>
            <MenuList>
                <MenuItem>AMD</MenuItem>
                <MenuItem>RUB</MenuItem>
                <MenuItem>USD</MenuItem>
                <MenuItem>EUR</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default PriceToggle