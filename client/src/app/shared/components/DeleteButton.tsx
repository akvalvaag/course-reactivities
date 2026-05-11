import {Delete, DeleteOutlined } from "@mui/icons-material";
import {Box, Button} from "@mui/material";

function DeleteButton() {
    return (
        <Box>
            <Button
                sx={{
                    opacity: 0.8,
                    transition: 'opacity 0.3s',
                    position: 'relative',
                    cursor: 'pointer',
                }}>
                <DeleteOutlined
                    sx={{fontSize: 32,
                        color: 'white',
                        position: 'absolute'}}/>
                <Delete sx={{fontsize: 28,
                    color: 'red'}}/>

            </Button>
        </Box>
    );
}

export default DeleteButton;