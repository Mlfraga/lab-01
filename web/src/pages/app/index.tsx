import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import { useMeQuery } from "../../graphql/generated/graphql";
import { ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const user = useUser();
  const { data: me } = useMeQuery({});

  console.log("me: ", me);

  return (
    <div className="text-violet-500">
      <pre>{/* <code>{JSON.stringify(data.products, null, 2)}</code> */}</pre>
      <h1>Home</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const accesToken = await getAccessToken(ctx.req, ctx.res);

  console.log("accesToken", accesToken);

  // return getServerPageGetProducts(null, ctx);

  return { props: {} };
};

export default withApollo(ssrGetProducts.withPage()(Home));
