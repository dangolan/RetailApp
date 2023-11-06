// api.ts

export async function loginApi(email: string, password: string): Promise<string | null> {
  console.log(email, password);  
  try {
      
      const response = await fetch("https://retailin-demo.westeurope.cloudapp.azure.com/login/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        // Handle non-successful responses here, e.g., throw an error
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const content = await response.json();
      return content.accessToken;
    } catch (error) {
      console.error("Error during login:", error);
      return null; // Return null or handle the error as needed
    }
  }
  