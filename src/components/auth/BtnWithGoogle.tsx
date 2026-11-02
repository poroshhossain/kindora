import { Button } from "../ui/button"
import { GoogleIcon } from "./google-icon"

const BtnWithGoogle = () => {
    return (
        <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
        >
            <GoogleIcon/>
            Continue with Google
        </Button>
    )
}
export default BtnWithGoogle