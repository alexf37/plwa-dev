import { Link } from "@tanstack/react-router";
import { AuthForm } from "./components/AuthForm";
import { AuthOverlay } from "./components/AuthOverlay";
import { AuthCard } from "./components/AuthCard";

export function Login() {
  return (
    <AuthOverlay>
      <AuthCard>
        <AuthForm
          title="Login"
          description="Enter your username below to login"
          endpoint="/xrk4np/api/auth/login.php"
          submitText="Login"
        >
          <Link
            to="/xrk4np/app/create-account"
            className="mr-auto py-2 text-xs font-normal text-slate-600"
          >
            Don't have an account?
            <br />
            <u>Create one!</u>
          </Link>
        </AuthForm>
      </AuthCard>
    </AuthOverlay>
  );
}
