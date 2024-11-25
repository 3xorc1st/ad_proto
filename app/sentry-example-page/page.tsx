"use client";

import Head from "next/head";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

interface StatusResponse {
  status: string;
  authResponse?: {
    userID: string;
    accessToken: string;
  };
}

interface FBError {
  error: {
    message: string;
    type: string;
    code: number;
    fbtrace_id: string;
  };
}

interface FBPostResponse {
  id: string;
}

export default function Page() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/facebook.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkLoginState = () => {
    FB.getLoginStatus(function(response: any) {
      statusChangeCallback(response);
    });
  };

  const statusChangeCallback = (response: any) => {
    if (response.status === 'connected') {
      console.log('Logged in.');
    } else {
      FB.login(function(response: any) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response: { name: string }) {
            console.log('Good to see you, ' + response.name + '.');
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
  };

  const createPost = (message: string) => {
    FB.api(
      '/me/feed',
      'post',
      { message: message },
      function(response: FBPostResponse | FBError) {
        if ('id' in response) {
          console.log('Post ID: ' + response.id);
        } else if ('error' in response) {
          console.error(response.error);
        }
      }
    );
  };

  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: "14px 0" }}>
          <svg
            style={{
              height: "1em",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 44"
          >
            <path
              fill="currentColor"
              d="M124.32,28.28,109.56,9.22h-3.68V34.77h3.73V15.19l15.18,19.58h3.26V9.22h-3.73ZM87.15,23.54h13.23V20.22H87.14V12.53h14.93V9.21H83.34V34.77h18.92V31.45H87.14ZM71.59,20.3h0C66.44,19.06,65[...]"
            ></path>
          </svg>
        </h1>

        <p>Get started by sending us a sample error:</p>
        <button
          type="button"
          style={{
            padding: "12px",
            cursor: "pointer",
            backgroundColor: "#AD6CAA",
            borderRadius: "4px",
            border: "none",
            color: "white",
            fontSize: "14px",
            margin: "18px",
          }}
          onClick={async () => {
            await Sentry.startSpan({
              name: 'Example Frontend Span',
              op: 'test'
            }, async () => {
              const res = await fetch("/api/sentry-example-api");
              if (!res.ok) {
                throw new Error("Sentry Example Frontend Error");
              }
            });
          }}
        >
          Throw error!
        </button>

        <p>
          Next, look for the error on the{" "}
          <a href="https://sentry.io/organizations/david-rivera-cadena/issues/?project=4507906307129344">Issues Page</a>.
        </p>
        <p style={{ marginTop: "24px" }}>
          For more information, see{" "}
          <a href="https://docs.sentry.io/platforms/javascript/guides/nextjs/">
            https://docs.sentry.io/platforms/javascript/guides/nextjs/
          </a>
        </p>

        <button onClick={checkLoginState}>Check Login Status</button>
        <button onClick={() => createPost('Hello, Facebook!')}>Create Post</button>
      </main>
    </div>
  );
}