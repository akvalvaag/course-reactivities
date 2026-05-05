import {Box, Button, Card, CardMedia, Chip, Typography} from "@mui/material";
import {Link} from "react-router";
import {formatDate} from "../../../lib/util/util.ts";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

interface ActivityDetailsHeaderProps {
    activity: Activity
}

export default function ActivityDetailsHeader({activity}: ActivityDetailsHeaderProps) {
    const isCancelled = activity.isCancelled;
    const isHost = activity.isHost;
    const isGoing = activity.isGoing;
    const {updateAttendance} = useActivities(activity.id)

    return (
        <Card sx={{position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden'}}>
            {isCancelled && (
                <Chip
                    sx={{position: 'absolute', left: 40, top: 20, zIndex: 1000, borderRadius: 1}}
                    color="error"
                    label="Cancelled"
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${activity.category}.jpg`}
                alt={`${activity.category} image`}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>{activity.title}</Typography>
                    <Typography variant="subtitle1">{formatDate(activity.date)}</Typography>
                    <Typography variant="subtitle2">
                        Hosted by <Link to={`/profiles/${activity.isHost}`}
                                        style={{color: 'white', fontWeight: 'bold'}}>{activity.hostDisplayName}</Link>
                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
                <Box sx={{display: 'flex', gap: 2}}>
                    {isHost ? (
                        <>
                            <Button
                                variant='contained'
                                color={isCancelled ? 'success' : 'error'}
                                onClick={() => updateAttendance.mutate(activity.id)}
                                loading={updateAttendance.isPending}
                            >
                                {isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${activity.id}`}
                                disabled={isCancelled}
                            >
                                Manage Event
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color={isGoing ? 'primary' : 'info'}
                            onClick={() => updateAttendance.mutate(activity.id)}
                            disabled={activity.isCancelled}
                            loading={updateAttendance.isPending}
                        >
                            {isGoing ? 'Cancel Attendance' : 'Join Activity'}
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    )
}
