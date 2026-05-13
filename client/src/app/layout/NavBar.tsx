import {AppBar, Box, CircularProgress, Container, MenuList, Toolbar, Typography} from "@mui/material";
import {Group} from "@mui/icons-material";
import {NavLink} from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink.tsx";
import {useStore} from "../../lib/hooks/useStore.ts";
import {Observer} from "mobx-react-lite";
import {useAccount} from "../../lib/hooks/useAccount.ts";
import UserMenu from "./UserMenu.tsx";

function NavBar() {

    const {uiStore} = useStore();
    const {currentUser} = useAccount()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
            }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                        <Box component={NavLink} to='/' sx={{display: "flex", alignItems: "center"}}>
                            <Group fontSize="large"/>
                            <Typography variant="h4" sx={{position: 'relative', fontWeight: 'bold'}}>
                                Reactivities
                            </Typography>
                            <Observer>
                                {() => uiStore.isLoading ? (
                                    <CircularProgress
                                        size={20}
                                        thickness={7}
                                        sx={{
                                            color: 'white',
                                            position: 'absolute',
                                            top: '30%',
                                            left: '105%'
                                        }}
                                    />
                                ) : null}
                            </Observer>
                        </Box>
                        <MenuList sx={{display: "flex"}}>
                            {['activities', 'counter', 'errors'].map((item) => (
                                <MenuItemLink key={item} to={`/${item}`}>
                                    {item}
                                </MenuItemLink>
                            ))}
                        </MenuList>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            {currentUser ? (
                                <UserMenu/>
                            ) : (
                                <MenuList sx={{display: 'flex'}}>
                                    <MenuItemLink to={'/login'}>Login</MenuItemLink>
                                    <MenuItemLink to={'/register'}>Register</MenuItemLink>
                                </MenuList>
                            )
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default NavBar;