import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import * as React from "react";

type ActivityFormProps = {
    closeForm: () => void,
    activity?: Activity,
    submitForm: (activity: Activity) => void
}

function ActivityForm({closeForm, activity, submitForm}: ActivityFormProps) {

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        if (activity) data.id = activity.id

        submitForm(data as unknown as Activity)
    }

    return (
        <Paper sx={{padding: 3}}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                <TextField name="title" label="Title" defaultValue={activity?.title}/>
                <TextField name="description" label="Description" defaultValue={activity?.description} multiline
                           rows={3}/>
                <TextField name="category" label="Category" defaultValue={activity?.category}/>
                <TextField name="date" type="date" defaultValue={activity?.date}/>
                <TextField name="city" label="City" defaultValue={activity?.city}/>
                <TextField name="venue" label="Venue" defaultValue={activity?.venue}/>
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button color='inherit' onClick={closeForm}>Cancel</Button>
                    <Button color='success' type="submit" variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default ActivityForm;