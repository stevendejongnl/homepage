import credentialedProxyHandler from "utils/proxy/handlers/credentialed";

const widget = {
  api: "{url}/api/v1/stats/{endpoint}",
  proxyHandler: credentialedProxyHandler,

  mappings: {
    realtimeVisitors: {
      endpoint: "realtime/visitors?site_id=madebysteven.nl",
    },
    aggregate: {
      endpoint: "aggregate?site_id=madebysteven.nl&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration",
    }
  },
};

export default widget;

