import { gql, useQuery } from "@apollo/client";
import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import { withApollo } from "../../lib/withApollo";

function Home() {
  const user = useUser();
  // const { data } = useQuery(PRODUCTS_QUERY);

  console.log("user", user);

  return (
    <div>
      {/* <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre> */}
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
    props: {
      apolloState: {},
    },
  };
};

export default withApollo(Home);
