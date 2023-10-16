import { Link } from "@tanstack/react-router";
import { AuthOverlay } from "./components/AuthOverlay";
import { AuthCard } from "./components/AuthCard";
import { AuthForm } from "./components/AuthForm";

export function CreateAccount() {
  return (
    <AuthOverlay>
      <AuthCard>
        <AuthForm
          title="Create an account"
          description="Enter a username below to create your account"
          endpoint="/xrk4np/api/auth/create-account.php"
          submitText="Create"
        >
          <Link
            to="/xrk4np/app/login"
            className="mr-auto py-2 text-xs font-normal text-slate-600"
          >
            Already have an account?
            <br />
            <u>Login instead!</u>
          </Link>
        </AuthForm>
      </AuthCard>
    </AuthOverlay>
  );
}
