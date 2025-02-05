import eventEmitter from "../../app/eventEmitter";

const URL = "/api/player";

/**
 * Post a player to create it.
 * 
 * @param {string} baseUrl The base URL of the API
 * @param {string} id The ID of the new player
 */
export default function postPlayer(baseUrl: string, id: string): Promise<Response> {
  return fetch(baseUrl + URL, {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok){
      eventEmitter.emit("playerPosted", id);
    }
    return res;
  });
}