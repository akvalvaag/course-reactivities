import {AppBar, Box, Button, Container, LinearProgress, MenuList, Toolbar, Typography} from "@mui/material";
import {Group} from "@mui/icons-material";
import {NavLink} from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink.tsx";
import {useStore} from "../../lib/hooks/useStore.ts";
import {Observer} from "mobx-react-lite";

function NavBar() {

    const {uiStore} = useStore();

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
                            {['activities', 'createActivity', 'counter'].map((item) => (
                                <MenuItemLink key={item} to={`/${item}`}>
                                    {item}
                                </MenuItemLink>
                            ))}
                        </MenuList>
                        <Button size="large" variant="contained" color="warning" onClick={() => {
                        }}>User menu</Button>
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