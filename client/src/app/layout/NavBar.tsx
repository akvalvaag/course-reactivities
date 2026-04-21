import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Group} from "@mui/icons-material";

interface NavBarProps {
    openForm: () => void
}

function NavBar({openForm}: NavBarProps) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
            }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Group fontSize="large"/>
                            <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                                Reactivities
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex"}}>
                            {['Activities', 'About', 'Contact'].map((item) => (
                                <Typography key={item} sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    px: 2,
                                    '&:hover': {color: 'warning.main'}
                                }}>
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                        <Button size="large" variant="contained" color="warning" onClick={openForm}>Create Activity</Button>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    );
}

export default NavBar;