import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { api } from './_generated/api';

const http = httpRouter();

http.route({
  path: '/vapid-public-key',
  method: 'GET',
  handler: httpAction(async (ctx) => {
    const key = await ctx.runAction(api.actions.vapidPublicKey);

    return new Response(JSON.stringify({ vapidPublicKey: key }), {
      status: 200,
      headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers':
          'Content-Type, application/json',
        'Access-Control-Max-Age': '86400',
      }),
    });
  }),
});

http.route({
  path: '/subscription',
  method: 'OPTIONS',
  handler: httpAction(async () => {
    const headers = new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });

    return new Response(null, {
      status: 200,
      headers,
    });
  }),
});

http.route({
  path: '/subscription',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const { endpoint } = await request.json();

    const headers = new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });

    if (!endpoint) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'endpoint is required',
        }),
        { status: 400, headers }
      );
    }

    const subscription = await ctx.runQuery(
      api.push_notification.subscription,
      { endpoint }
    );

    return new Response(
      JSON.stringify({ subscribed: !!subscription }),
      {
        status: 200,
        headers,
      }
    );
  }),
});

http.route({
  path: '/subscribe',
  method: 'OPTIONS',
  handler: httpAction(async () => {
    const headers = new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });

    return new Response(null, {
      status: 200,
      headers,
    });
  }),
});

http.route({
  path: '/subscribe',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const { subscription } = await request.json();

    const headers = new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });

    if (!subscription)
      return new Response(
        JSON.stringify({
          success: false,
          message: 'subscription is required',
        }),
        {
          status: 400,
          headers,
        }
      );

    const res = await ctx.runMutation(
      api.push_notification.subscribe,
      {
        subscription,
      }
    );

    return new Response(JSON.stringify(res), {
      status: 200,
      headers,
    });
  }),
});

http.route({
  path: '/unsubscribe',
  method: 'OPTIONS',
  handler: httpAction(async () => {
    const headers = new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });

    return new Response(null, {
      status: 200,
      headers,
    });
  }),
});

http.route({
  path: '/unsubscribe',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const { endpoint } = await request.json();

    const headers = new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });

    if (!endpoint)
      return new Response(
        JSON.stringify({
          success: false,
          message: 'endpoint is required',
        }),
        {
          status: 400,
          headers,
        }
      );

    const res = await ctx.runMutation(
      api.push_notification.unsubscribe,
      {
        endpoint,
      }
    );

    return new Response(JSON.stringify(res), {
      status: 200,
      headers,
    });
  }),
});

export default http;
