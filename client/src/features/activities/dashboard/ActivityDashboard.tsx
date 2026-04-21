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
}

function ActivityDashboard({
                               activities,
                               cancelSelectActivity,
                               selectActivity,
                               selectedActivity,
                               openForm,
                               editMode,
                               closeForm
                           }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList activities={activities}
                              selectActivity={selectActivity}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        cancelSelectedActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} />
                }
            </Grid>
        </Grid>
    );
}

export default ActivityDashboard;