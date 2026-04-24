import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import {Box, debounce, List, ListItemButton, TextField, type TextFieldProps, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import type {LocationIQSuggestion} from "../../../lib/types";
import axios from "axios";


type Props<T extends FieldValues> = {
} & UseControllerProps<T> & TextFieldProps;

function LocationInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props})

    const [loading, setLoading] = useState<boolean>(false)
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([])

    const token = 'pk.c7d1592660ac20fe741a30e355a8aa3d'
    const locationURL = `https://api.locationiq.com/v1/autocomplete?key=${token}&limit=5&dedupe=1&`

    const inputValue = useMemo(() => {
        if (field.value && typeof field.value === 'object') {
            return field.value.venue || '';
        }
        return field.value || '';
    }, [field.value]);

    const fetchSuggestions = useMemo(
        () =>
            debounce(async (query: string)=> {
                if(!query || query.length < 3) {
                    setSuggestions([])
                    return
                }

                setLoading(true)

                try {
                    const res = await axios.get<LocationIQSuggestion[]>(`${locationURL}q=${query}`);
                    setSuggestions(res.data);
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
        }, 500), [locationURL]
    )

    const handleChange = async (value : string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village;
        const venue = location.display_name;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);

        field.onChange({city, venue, latitude, longitude})
        setSuggestions([])
    }

    return (
        <Box>
            <TextField
                fullWidth
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                variant={'outlined'}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{boarder: 1}}>
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}>
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}

export default LocationInput;