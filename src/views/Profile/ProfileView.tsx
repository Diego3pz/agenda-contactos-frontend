import ProfileForm from "../../components/Profile/ProfileForm"
import { useAuth } from "../../hooks/useAuth"


export default function ProfileView() {
  const { data, isLoading } = useAuth()

  if (isLoading) return <div className="text-center">Cargando...</div>
  if (data) return <ProfileForm data={data} />
}
