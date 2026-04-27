import {AppBar, Box, Container, LinearProgress, MenuList, Toolbar, Typography} from "@mui/material";
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
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
                position: 'relative',
            }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                        <Box component={NavLink} to='/' sx={{display: "flex", alignItems: "center"}}>
                            <Group fontSize="large"/>
                            <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                                Reactivities
                            </Typography>
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

                <Observer>
                    {() => uiStore.isLoading ? (
                        <LinearProgress
                            color={"secondary"}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 4
                            }}
                        />
                    ) : null}
                </Observer>

            </AppBar>
        </Box>
    );
}

export default NavBar;