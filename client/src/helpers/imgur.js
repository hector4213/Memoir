import axios from "axios";

export const deleteFromImgur = async (embed) => {
  const fullEmbed = embed.split(" ");
  const hash = fullEmbed[1];

  await axios({
    method: "DELETE",
    url: `https://api.imgur.com/3/image/${hash}`,
    headers: {
      Authorization: `Client-ID 39612fe2e37daed`,
      "Content-Type": "image",
    },
  });
};

export const postToImgur = async (picture) => {
  const res = await axios({
    method: "post",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: `Client-ID 39612fe2e37daed`,
      "Content-Type": "image",
    },
    data: picture,
  });

  return res;
};
