export async function getStoreListApi(
  token: string,
  filterCriteria: (store: any) => boolean
): Promise<any> {
  try {
    const response = await fetch(
      "https://retailin-demo.westeurope.cloudapp.azure.com/store/list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Handle non-successful responses here, e.g., throw an error
      throw new Error(`Request failed with status ${response.status}`);
    }

    const storeList = await response.json();

    // Apply the filter criteria to the store list
    const filteredStores = storeList.filter(filterCriteria);

    return filteredStores;
  } catch (error) {
    throw error;
  }
}
