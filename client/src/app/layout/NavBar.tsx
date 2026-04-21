import {AppBar, Box, Button, Container, MenuList, Toolbar, Typography} from "@mui/material";
import {Group} from "@mui/icons-material";
import {NavLink} from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink.tsx";

function NavBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
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
                            {['activities', 'createActivity'].map((item) => (
                                <MenuItemLink key={item} to={`/${item}`}>
                                    {item}
                                </MenuItemLink>
                            ))}
                        </MenuList>
                        <Button size="large" variant="contained" color="warning" onClick={() => {
                        }}>User menu</Button>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    );
}

export default NavBar;