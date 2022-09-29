import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

export default function Home() {
  const user = useUser();

  console.log("user", user);

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const accesToken = await getAccessToken(req, res);

  console.log("accesToken", accesToken);

  return {
    props: {},
  };
};
