import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { signinSchema, type SigninSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, redirect } from 'react-router-dom';
import { generateCodeChallenge, generateCodeVerifier } from '@/utils/pkce';
import customFetch from '@/utils/customFetch';

const Signin = () => {
  const {
    formState: { isSubmitting, errors },
    ...form
  } = useForm<SigninSchema>({
    defaultValues: { username: 'souvik@test.com', password: 'password' },
    mode: 'all',
    resolver: zodResolver(signinSchema),
  });

  const handleSubmit = async (data: SigninSchema) => {
    const verifier = generateCodeVerifier();
    localStorage.setItem('pkce_verifier', verifier);
    const code_challenge = await generateCodeChallenge(verifier);
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = 'http://localhost:5173/auth/callback';
    const scope = '*';

    data = {
      ...data,
      client_id,
      redirect_uri,
      scope,
      code_challenge,
    };
    try {
      const response = await customFetch.post(
        `/auth/validate-credentials`,
        data
      );

      if (response.status === 200) {
        if (code_challenge) {
          const params = new URLSearchParams({
            client_id,
            redirect_uri,
            scope,
            code_challenge,
            code_challenge_method: 'S256',
            username: data.username,
            password: data.password,
          });

          window.location.href = `http://127.0.0.1:8000/oauth/login?${params.toString()}`;
        }
      }
    } catch (error) {
      if ((error as any)?.response?.data?.errors) {
        Object.entries((error as any).response.data.errors).forEach(
          ([field, message]) => {
            form.setError(field as keyof SigninSchema, {
              message: message as string,
            });
          }
        );
      }
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset disabled={isSubmitting}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        {...form.register('username')}
                        placeholder="m@example.com"
                      />
                      <span className="text-destructive text-xs -mt-2">
                        {errors.username?.message}
                      </span>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          to="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        {...form.register('password')}
                      />
                      <span className="text-destructive text-xs -mt-2">
                        {errors.password?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        Login with Google
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link to="#" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </fieldset>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Signin;

// ---------------------------
export const loader = () => {
  const token = localStorage.getItem('token');
  if (token) return redirect('/admin/users');
};
