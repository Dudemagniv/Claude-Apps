const { getStore } = require("@netlify/blobs");

// Single-user key/value store backing this app's data (shifts + prefs).
// No auth: anyone with the site URL's function endpoint could read/write it,
// which is fine for a personal shift log but worth knowing.
exports.handler = async (event) => {
  const store = getStore("shift-calculator");

  try {
    if (event.httpMethod === "GET") {
      const key = event.queryStringParameters && event.queryStringParameters.key;
      if (!key) return { statusCode: 400, body: "Missing key" };
      const data = await store.get(key, { type: "json" });
      return {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data === undefined ? null : data)
      };
    }

    if (event.httpMethod === "PUT") {
      const { key, value } = JSON.parse(event.body || "{}");
      if (!key) return { statusCode: 400, body: "Missing key" };
      await store.setJSON(key, value);
      return {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: true })
      };
    }

    return { statusCode: 405, body: "Method not allowed" };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: String(e && e.message || e) })
    };
  }
};
