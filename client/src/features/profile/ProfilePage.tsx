import {Grid, Typography} from "@mui/material";
import ProfileHeader from "./ProfileHeader.tsx";
import ProfileContent from "./ProfileContent.tsx";
import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";

function ProfilePage() {
    const {id} = useParams();
    const {profile, loadingProfile} = useProfile(id);

    if (loadingProfile) return <Typography>Loading profile...</Typography>
    if (!profile) return <Typography>Profile not found</Typography>

    return (
<Grid container>
    <Grid size={12}>
        <ProfileHeader/>
        <ProfileContent/>
    </Grid>
</Grid>
    );
}

export default ProfilePage;