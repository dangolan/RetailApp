export async function getDataApi(
    token: string | null,
    since: string,
    until: string,
    timeUnit: string,
    stores: any
  ): Promise<any> {
    try {
      const url = new URL("https://retailin-demo.westeurope.cloudapp.azure.com/productivity/trends");
      url.searchParams.append('since', since);
      url.searchParams.append('until', until);
      url.searchParams.append('by', timeUnit);
  
      if (stores) {
        for (const store of stores) {
          url.searchParams.append("stores[]", store.id);
        }
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
      console.error("Error during data fetch:", error);
      return null; // Return null or handle the error as needed
    }
  }
  