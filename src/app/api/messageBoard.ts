import axios from "axios";

const MESSAGE_BOARD_URL =
  process.env.NEXT_PUBLIC_MESSAGE_BOARD_URL ??
  "https://shustream.zeabur.app/messageBoard";

export async function getAllMsg() {
  const requestData = {};

  try {
    const response = await axios.get(MESSAGE_BOARD_URL, {
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
  const requestData = {
    content,
  };

  try {
    const response = await axios.post(MESSAGE_BOARD_URL, requestData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Error saving data: " + error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}
