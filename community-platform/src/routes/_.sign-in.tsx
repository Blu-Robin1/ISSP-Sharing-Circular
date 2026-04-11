import { Button, FieldInput, TextNotification } from 'oa-components';
import { Field, Form } from 'react-final-form';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { Link, redirect, useActionData, useSubmit } from 'react-router';
import { PasswordField } from 'src/common/Form/PasswordField';
import Main from 'src/pages/common/Layout/Main';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { ProfileServiceServer } from 'src/services/profileService.server';
import { getReturnUrl } from 'src/utils/redirect.server';
import { generateTags, mergeMeta } from 'src/utils/seo.utils';
import { required } from 'src/utils/validators';
import { Card, Flex, Heading, Label, Text } from 'theme-ui';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { client } = createSupabaseServerClient(request);
  const claims = await client.auth.getClaims();

  if (claims.data?.claims) {
    return redirect(getReturnUrl(request));
  }

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error, data } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.code === 'email_not_confirmed') {
      // Do not call auth.resend() here: every failed login would trigger another email and
      // quickly hit Supabase rate limits. The user already received a link at sign-up.
      return Response.json(
        {
          error:
            'Please confirm your email before signing in. Check your inbox and spam for the confirmation link.',
        },
        { headers },
      );
    }
    if (
      error.message?.toLowerCase().includes('rate limit') ||
      (error as { status?: number }).status === 429
    ) {
      return Response.json(
        {
          error: 'Email rate limit exceeded. Please try again in an hour.',
        },
        { headers, status: 429 },
      );
    }

    if (error.code === 'invalid_credentials') {
      return Response.json({ error: 'Invalid email or password.' }, { headers, status: 400 });
    }

    console.error('[sign-in] auth error:', error.code, error.message);
    return Response.json(
      {
        error: 'Invalid email or password.',
      },
      { headers, status: 400 },
    );
  }

  const fallbackPath = data.user?.user_metadata.username
    ? `/u/${data.user?.user_metadata.username}`
    : '/';
  const requestedPath = getReturnUrl(request, fallbackPath);

  const { data: profileData } = await client
    .from('profiles')
    .select('roles')
    .eq('auth_id', data.user!.id)
    .limit(1);

  const roles = profileData?.at(0)?.roles ?? [];
  const isAdmin = roles.includes('admin');
  const path = isAdmin ? '/admin/initiatives' : requestedPath;

  try {
    await new ProfileServiceServer(client).ensureProfile(data.user);
  } catch (error) {
    console.error(error);
  }

  return redirect(path, { headers });
};

export const meta = mergeMeta<typeof loader>(() => {
  const title = `Login - ${import.meta.env.VITE_SITE_NAME}`;

  return generateTags(title);
});

export default function Index() {
  const submit = useSubmit();
  const actionResponse: any = useActionData<typeof action>();

  const handleSubmit = (values: Record<string, unknown>) => {
    const formData = new FormData();
    formData.append('email', String(values.email ?? ''));
    formData.append('password', String(values.password ?? ''));
    submit(formData, { method: 'post' });
  };

  return (
    <Main style={{ flex: 1 }}>
      <Form
        onSubmit={handleSubmit}
        render={({ submitting, invalid }) => {
          return (
            <form data-cy="login-form" method="post">
              <Flex
                sx={{
                  bg: 'inherit',
                  px: 2,
                  width: '100%',
                  maxWidth: '620px',
                  mx: 'auto',
                  mt: [15, 20],
                  mb: 3,
                }}
              >
                <Flex sx={{ flexDirection: 'column', width: '100%' }}>
                  <Card sx={{ borderRadius: 3 }}>
                    <Flex
                      sx={{
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        padding: 4,
                        gap: 4,
                        width: '100%',
                      }}
                    >
                      <Flex sx={{ gap: 2, flexDirection: 'column' }}>
                        <Heading>Log in</Heading>
                        <Text sx={{ fontSize: 1 }} color="grey">
                          <Link to="/sign-up" data-cy="no-account">
                            Don't have an account? Sign-up here
                          </Link>
                        </Text>
                      </Flex>

                      {actionResponse?.error && (
                        <TextNotification isVisible={true} variant={'failure'}>
                          <Text>{actionResponse?.error}</Text>
                        </TextNotification>
                      )}

                      <Flex sx={{ flexDirection: 'column' }}>
                        <Label htmlFor="title">Email</Label>
                        <Field
                          name="email"
                          type="email"
                          data-cy="email"
                          component={FieldInput}
                          validate={required}
                          sx={{
                            border: '1px solid rgba(0,0,0,0.25)',
                            borderRadius: '10px',
                            px: 3,
                          }}
                        />
                      </Flex>
                      <Flex sx={{ flexDirection: 'column' }}>
                        <Label htmlFor="title">Password</Label>
                        <PasswordField
                          name="password"
                          data-cy="password"
                          component={FieldInput}
                          validate={required}
                        />
                      </Flex>
                      <Flex sx={{ justifyContent: 'space-between' }}>
                        <Text sx={{ fontSize: 1 }} color={'grey'}>
                          <Link to="/reset-password" data-cy="lost-password">
                            Forgotten password?
                          </Link>
                        </Text>
                      </Flex>

                      <Flex>
                        <Button
                          large
                          data-cy="submit"
                          sx={{
                            width: '100%',
                            backgroundColor: '#3F6B66',
                            color: '#ffffff',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontFamily: '"Times New Roman", Times, serif',
                            justifyContent: 'center',
                            '&:hover': {
                              backgroundColor: '#355c58',
                            },
                          }}
                          variant="primary"
                          disabled={submitting || invalid}
                          type="submit"
                        >
                          Log in
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
              </Flex>
            </form>
          );
        }}
      />
    </Main>
  );
}
