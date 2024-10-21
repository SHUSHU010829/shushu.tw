import axios from "axios";

export async function getAllMsg() {
  const requestData = {};

  try {
    const response = await axios.get(
      "https://shustream.zeabur.app/messageBoard",
      {
        params: requestData,
      }
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error saving data: " + error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

export async function createMsg(content: string) {
  const requestData = {
    content,
  };

  try {
    const response = await axios.post(
      "https://shustream.zeabur.app/messageBoard",
      requestData
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error saving data: " + error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}
