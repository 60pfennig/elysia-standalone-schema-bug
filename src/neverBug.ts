import { Elysia, Static, t } from "elysia";

const Schema = t.Object({
  literalArray: t.Array(t.Union((["a", "b", "c"] as const).map((x) => t.Literal(x)))),
});

type SchemaType = Static<typeof Schema>;

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post(
    "/test",
    ({ body }) => {
      console.log("Received body:", body);
      body.literalArray; // type never[] instead of SchemaType['literalArray']
    },
    {
      body: Schema,
      response: { 200: Schema },
    }
  )

  .listen(3006);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
