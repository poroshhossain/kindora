"use client"
import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation";

const LogOut = () => {
    const router = useRouter();
    const handleLogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
    }
    return (
        <button className="flex items-center gap-3 text-primary" onClick={handleLogOut}>
            <LogOutIcon />
            Sign Out
        </button>
    )
}
export default LogOut