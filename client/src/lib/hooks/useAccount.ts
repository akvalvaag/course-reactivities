import type {LoginSchema} from "../schemas/loginSchema.ts";
import agent from "../api/agent.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import type {RegisterSchema} from "../schemas/RegisterSchema.ts";
import {toast} from "react-toastify";

export const useAccount = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post(`/login?useCookies=true`, creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post(`/account/logout?useCookies=true`)
        },
        onSuccess: async () => {
            queryClient.removeQueries({
                queryKey: ['user']
            })
            queryClient.removeQueries({
                queryKey: ['activities']
            })
            navigate('/')
        }
    })

    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>(`/account/user-info`)
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    })

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post(`/account/register`, creds)
        },
        onSuccess: async () => {
            toast.success('Register successful - you can now log in');
            navigate('/login')
        }
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    };
}