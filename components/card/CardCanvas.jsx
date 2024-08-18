'use client'
import IconShop from '@/public/icons/IconShop'
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function CardCanvas() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    return (
        <>
            <div onClick={onOpen} className='duration-300 cursor-pointer hover:opacity-70'>
                <IconShop className='text-white [&>path]:fill-white' />
            </div>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Shopping Card
                    </DrawerHeader>ç
                    <DrawerBody>
                        <div>Card Is Empty</div>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Checkout</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CardCanvas