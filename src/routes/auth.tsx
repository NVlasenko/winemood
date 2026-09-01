import {
  createCookie,
  data,
  useLoaderData,
} from "react-router";

import { AuthPage } from "@/pages/AuthPage";

import { authApi } from "@/shared/api/authApi";

import {
  getSiteAssets,
} from "@/shared/api/assets/siteAssetsApi";

import type { LoginRequestDto } from "@/types/auth";

const accessTokenCookie =
  createCookie("accessToken", {
    httpOnly: true,

    path: "/",

    sameSite: "lax",

    secure:
      import.meta.env.PROD,

    maxAge:
      60 * 60 * 24 * 7,
  });

export async function loader() {
  const siteAssets =
    await getSiteAssets();

  return {
    authBackgroundUrl:
      siteAssets.auth.backgroundUrl,
  };
}

export async function action({
  request,
}: {
  request: Request;
}) {
  const formData =
    await request.formData();

  const intent =
    String(
      formData.get("intent") ?? "login",
    );

  if (intent === "logout") {
    return data(
      {
        success: true,
      },
      {
        headers: {
          "Set-Cookie":
            await accessTokenCookie.serialize(
              "",
              {
                maxAge: 0,
              },
            ),
        },
      },
    );
  }

  const email =
    String(
      formData.get("email") ?? "",
    ).trim();

  const password =
    String(
      formData.get("password") ?? "",
    );

  if (!email || !password) {
    return data(
      {
        success: false,
        message:
          "Email and password are required",
      },
      {
        status: 400,
      },
    );
  }

  const loginData: LoginRequestDto = {
    email,
    password,
  };

  try {
    const response =
      await authApi.login(
        loginData,
      );

    return data(
      {
        success: true,
      },
      {
        headers: {
          "Set-Cookie":
            await accessTokenCookie.serialize(
              response.accessToken,
            ),
        },
      },
    );
  } catch (error) {
    console.error(
      "Server login failed:",
      error,
    );

    return data(
      {
        success: false,
        message:
          "Invalid email or password",
      },
      {
        status: 401,
      },
    );
  }
}

export default function Auth() {
  const {
    authBackgroundUrl,
  } =
    useLoaderData<
      typeof loader
    >();

  return (
    <AuthPage
      authBackgroundUrl={
        authBackgroundUrl
      }
    />
  );
}