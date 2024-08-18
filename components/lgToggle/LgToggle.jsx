import IconArrowBottom from '@/public/icons/IconArrowBottom'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

function LgToggle() {
    return (

        <Menu matchWidth={false}>
            <MenuButton>
                <div className='flex items-center cursor-pointer duration-300 hover:opacity-70 text-white gap-[7px]'>
                    EN <IconArrowBottom />
                </div>
            </MenuButton>
            <MenuList>
                <MenuItem>EN</MenuItem>
                <MenuItem>Հայ</MenuItem>
                <MenuItem>Рус</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default LgToggle