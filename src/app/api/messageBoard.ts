import axios from "axios";

function generateApiUrl(type: string): string {
  const baseUrl = "https://shustream.zeabur.app";
  return `${baseUrl}/${type}`;
}

export async function getAllMsg() {
  const type = "messageBoard";
  const url = generateApiUrl(type);

  const requestData = {};

  try {
    const response = await axios.get(url, {
      params: requestData,
    });

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
  const type = "messageBoard";
  const url = generateApiUrl(type);

  const requestData = {
    content,
  };

  try {
    const response = await axios.post(url, requestData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error saving data: " + error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}
