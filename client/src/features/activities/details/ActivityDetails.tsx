import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    activity: Activity,
    cancelSelectedActivity: () => void,
    openForm: (id: string) => void
}

function ActivityDetails({activity, cancelSelectedActivity, openForm}: Props) {
    return (
        <Card>
            <CardMedia component='img' src={`/images/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" sx={{fontWeight: 'light'}}>{activity.date}</Typography>
                <Typography variant="h5">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" onClick={() => openForm(activity.id)}>Edit</Button>
                <Button color="inherit" onClick={cancelSelectedActivity}>Cancel</Button>
            </CardActions>
        </Card>
    );
}

export default ActivityDetails;