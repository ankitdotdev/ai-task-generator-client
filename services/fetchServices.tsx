 type ResponseType = {
  code: number;
  // eslint-disable-next-line
  data: any;
};
    

interface FetchServicesProps {
  method: string;
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  auth?: boolean; // NEW
}

export const fetchService = async (
  props: FetchServicesProps
): Promise<ResponseType> => {
  try {
    const baseHeaders: Record<string, string> = {
      ...(props.headers || {}),
    };

    // ✅ Attach token if auth = true
    if (props.auth) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
          baseHeaders["Authorization"] = `Bearer ${token}`;
        }
      }
    }

    const fetchOptions: RequestInit = {
      method: props.method,
      headers: baseHeaders,
    };

    // ✅ Handle body
    if (props.data) {
      if (props.data instanceof FormData) {
        delete baseHeaders["Content-Type"];
        fetchOptions.body = props.data;
      } else {
        baseHeaders["Content-Type"] = "application/json";
        fetchOptions.body = JSON.stringify(props.data);
      }
    }

    const response = await fetch(
      `${process.env.SERVER_URL}${props.endpoint}`,
      fetchOptions
    );

    const data = await response.json();

    return {
      code: response.status,
      data,
    };
  } catch (error) {
    console.error("Fetch service error:", error);

    return {
      code: 500,
      data: {
        status: "FAILED",
        error: "Request Failed",
        details:
          error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
};
