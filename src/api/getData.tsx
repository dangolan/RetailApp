export async function getDataApi(
  token: string | null,
  since: string,
  until: string,
  timeUnit: string,
  storeID: number | null
) {
  try {
    const url = new URL(
      "https://retailin-demo.westeurope.cloudapp.azure.com/productivity/trends"
    );
    url.searchParams.append("since", since);
    url.searchParams.append("until", until);
    url.searchParams.append("by", timeUnit);

    if (storeID) {
      url.searchParams.append("stores[]", storeID.toString());
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adjust the content type if needed
      },
    });

    if (!response.ok) {
      // Handle non-successful responses here, e.g., throw an error
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
