exports.handler = async (event) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <!-- Bootstrap CSS -->
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />

        <title>URL Manager</title>
      </head>
      <body>
        <div class="container">
          <h1>URL Manager</h1>

          <div id="notification"></div>

          <div class="input-group mb-3">
            <span class="input-group-text">Base URL</span>
            <input
              id="base-url"
              type="text"
              class="form-control"
              aria-label="Base URL"
              value="https://jira.zumvie.com"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Redirect To</span>
            <input
              id="redirect"
              type="text"
              class="form-control"
              aria-label="Redirect To"
              value="https://www.google.com"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">No. Of URLs</span>
            <input
              id="amount"
              type="number"
              class="form-control"
              aria-label="No. Of URLs"
              min="1"
              value="1"
            />
          </div>

          <button type="button" class="btn btn-primary" onclick="generateUrls()">
            Submit
          </button>
        </div>

        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossorigin="anonymous"
        ></script>

        <script>
          window.generateUrls = async function () {
            const amount = document.getElementById("amount").value;
            const baseUrl = document.getElementById("base-url").value;
            const redirect = document.getElementById("redirect").value;

            console.log(amount, baseUrl);
            const API =
              "https://rusu7m608d.execute-api.us-east-2.amazonaws.com/staging/url-manager/generate-urls";
            const response = await fetch(API, {
              method: "POST",
              body: JSON.stringify({
                range: amount,
                prefix: baseUrl,
                redirect
              })
            });
          };
        </script>
      </body>
    </html>
  `;

  return html;
};
