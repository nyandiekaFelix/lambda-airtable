# AWS Services

- Lambda
- API Gateway

# Assumptions

- The API Gateway is setup with a custom domain which will be the base URL for the "Link:" field. ie. if the custom domain for the API Gateway is `https://jira.zumvie.com` the unique id will be appended after the base url eg `https://jira.zumvie.com/hmlsytrvb`


# API Gateway Methods

- #### `GET` method linked to the `clickHandler` lambda function

  should pass a `uid` path parameter. ie `https://jira.zumvie.com/{uid}`

- #### `GET` method linked to `pageHandler` lambda function

  Returns a simple UI with a form for generating URLs. Should be set up to return html page as a response. `"Content-Type": "text/html"`

- #### `POST` method linked to `urlGenerator` lambda function

  ```json
  // Request body
  {
    "range": 10,
    "prefix": "https://jira.zumvie.com",
    "redirect": "https://google.com"
  }
  ```