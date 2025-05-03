import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../api/AuthAPI"

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
        retry: false,
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}