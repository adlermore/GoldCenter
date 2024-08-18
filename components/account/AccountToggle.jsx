'use client'
import { JsonContext } from '@/context/jsonContext';
import IconUser from '@/public/icons/IconUser'
import { setAuthenticated } from '@/redux/authSlice';
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function AccountToggle() {

    const { setActivePopup } = useContext(JsonContext);

    // Get the authentication status from Redux
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user); // Optional: user data
    const dispatch = useDispatch();


    //Login Popup Open
    const loginPopupOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setActivePopup("login");
        setTimeout(() => {
            document.body.classList.add("login_opened");
            // document.body.style.overflow = "hidden";
        }, 100);
    };

    //Registr Popup Open
    const registerPopupOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setActivePopup("register");
        const documentWidth = document.documentElement.clientWidth;
const windowWidth = window.innerWidth;
const scrollBarWidth = windowWidth - documentWidth;

        setTimeout(() => {
            document.body.classList.add("register_opened");
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = scrollBarWidth+'px';
        }, 100);
    };

    // Handle logout
    const handleLogout = () => {
        // Clear authentication
        dispatch(setAuthenticated(false));
        localStorage.removeItem('access_token'); // Clear token if stored
        // Optional: Add other logout processes
    };


    return (
        <div className='account_toggle flex justify-center items-center'>
            <Menu>
                <MenuButton>
                    <IconUser className='text-white [&>path]:fill-white' />
                </MenuButton>
                {
                    isAuth ?
                        <MenuList>
                            <MenuGroup title={`Hi ${user?.name || 'User'}`}>
                                <MenuItem>My Account</MenuItem>
                                <MenuItem>Order History</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup>
                                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
                            </MenuGroup>
                        </MenuList>
                        :
                        <MenuList>
                            <a href='/' className='text-base laptopHorizontal:text-sm mobile:whitespace-nowrap mobile:px-8  uppercase flex mobile:text-xs bg-white px-16 laptopHorizontal:px-10 items-center  text-black h-40  font-semibold ' onClick={(e) => registerPopupOpen(e)} >Registration</a>
                            <a href='/' className='text-base laptopHorizontal:text-sm mobile:whitespace-nowrap mobile:px-8  uppercase flex mobile:text-xs bg-white px-16 laptopHorizontal:px-10 items-center  text-black h-40  font-semibold ' onClick={(e) => loginPopupOpen(e)} >Login</a>
                        </MenuList>
                }

            </Menu>
        </div>
    )
}

export default AccountToggle