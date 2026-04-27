import {useAccount} from "../../lib/hooks/useAccount.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Paper, Typography} from "@mui/material";
import {AppRegistration} from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import {Link} from "react-router";
import {registerSchema, type RegisterSchema} from "../../lib/schemas/RegisterSchema.ts";

function RegisterForm() {

    const {registerUser} = useAccount();
    const {control, handleSubmit, setError, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes('Email')) setError('email', {message: err});
                        else if (err.includes('Password')) setError('password', {message: err});
                    });
                }
            }
        });
    }

    return (
        <Paper component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: 3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3
        }}>
            <Box
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, color: 'secondary.main'}}>
                <AppRegistration fontSize={'large'}/>
                <Typography variant={'h4'}>Register</Typography>
            </Box>
            <TextInput label='Email' name={'email'} control={control}/>
            <TextInput label='Displayname' name={'displayName'} control={control}/>
            <TextInput label='Password' name={'password'} control={control} type="password"/>
            <Button type={'submit'} disabled={!isValid} loading={isSubmitting} variant={'contained'} size={'large'}>
                Register
            </Button>
            <Typography sx={{textAlign: 'center'}}>
                Already have an account?
                <Typography component={Link} to={'/login'} color={'primary'} sx={{ml: 2}}>
                    Log in
                </Typography>
            </Typography>
        </Paper>
    );
}

export default RegisterForm;