
export default async function handler(req, res) {
  if (!process.env.YOUCAM_API_KEY) {
    return res.status(500).json({
      error: "YouCam API key is missing in Vercel."
    });
  }

  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({
      error: "Method not allowed."
    });
  }

  try {
    const baseUrl = "https://yce-api-01.makeupar.com/s2s/v2.0";

    let endpoint;
    let options = {
      method: req.method,
      headers: {
        Authorization: `Bearer ${process.env.YOUCAM_API_KEY}`,
        "Content-Type": "application/json"
      }
    };

    if (req.method === "POST") {
      const { src_file_url, ref_file_url, style = "random" } = req.body || {};

      const isValidUrl = (value) => {
        try {
          return new URL(value).protocol === "https:";
        } catch {
          return false;
        }
      };

      if (!isValidUrl(src_file_url) || !isValidUrl(ref_file_url)) {
        return res.status(400).json({
          error: "Please provide public HTTPS URLs for both images."
        });
      }

      const allowedStyles = [
        "random",
        "style_french_elegance",
        "style_light_luxury",
        "style_cottagecore",
        "style_modern_chic",
        "style_bohemian"
      ];

      if (!allowedStyles.includes(style)) {
        return res.status(400).json({ error: "Invalid style." });
      }

      endpoint = `${baseUrl}/task/scarf`;
      options.method = "POST";
      options.body = JSON.stringify({
        src_file_url,
        ref_file_url,
        gender: "female",
        style
      });
    } else {
      const taskId = req.query?.task_id;

      if (
        typeof taskId !== "string" ||
        !/^[A-Za-z0-9_-]+$/.test(taskId)
      ) {
        return res.status(400).json({
          error: "A valid task_id is required."
        });
      }

      endpoint = `${baseUrl}/task/scarf/${taskId}`;
    }

    const response = await fetch(endpoint, options);
    const data = await response.json();

    return res.status(response.ok ? 200 : response.status).json(data);
  } catch {
    return res.status(502).json({
      error: "Could not connect to YouCam API. Please try again."
    });
  }
}
