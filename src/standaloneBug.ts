import { Elysia, t } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .guard({ schema: "standalone", body: t.Optional(t.Object({ token: t.Optional(t.String()) })) })
  .post(
    "/test",
    ({ body }) => {
      console.log("Received body:", body);
    },
    {
      body: t.Object({
        message: t.String(),
      }),
    }
  )

  .listen(3006);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
