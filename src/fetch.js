export default async (previewMode, apiToken, body) => {
  var url = previewMode
    ? `${process.env.REACT_APP_CDA_BASE_URL}/preview?apitoken=${apiToken}`
    : `${process.env.REACT_APP_CDA_BASE_URL}/?apitoken=${apiToken}`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiToken
    },
    body: JSON.stringify(body)
  });

  const responseBody = await response.text();

  try {
    return JSON.parse(responseBody);
  } catch (e) {
    return responseBody;
  }
};
