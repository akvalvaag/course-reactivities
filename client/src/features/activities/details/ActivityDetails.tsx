import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

type Props = {
    selectedActivity: Activity,
    cancelSelectedActivity: () => void,
    openForm: (id: string) => void
}

function ActivityDetails({selectedActivity, cancelSelectedActivity, openForm}: Props) {
    const {activities} = useActivities()
    const activity = activities?.find(e => e.id === selectedActivity.id)

    if (!activity) return <Typography>Loading...</Typography>

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