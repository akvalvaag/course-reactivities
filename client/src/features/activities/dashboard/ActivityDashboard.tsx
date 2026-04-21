import {Grid} from "@mui/material";
import ActivityList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../form/ActivityForm.tsx";

type Props = {
    activities: Activity[],
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void,
    selectedActivity: Activity | undefined,
    editMode: boolean,
    openForm: (id: string) => void,
    closeForm: () => void,
    submitForm: (activity: Activity) => void
    deleteActivity: (id: string) => void
}

function ActivityDashboard({
                               activities,
                               cancelSelectActivity,
                               selectActivity,
                               selectedActivity,
                               openForm,
                               editMode,
                               closeForm,
                               submitForm,
                               deleteActivity
                           }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList activities={activities}
                              selectActivity={selectActivity}
                              deleteActivity={deleteActivity}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectedActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} submitForm={submitForm}/>
                }
            </Grid>
        </Grid>
    );
}

export default ActivityDashboard;