import client from "./geoCoderClient";

const ApiKey = "AIzaSyBiobRQ5LdmUHXfc3qakyUTezfhnZDk2WI";

const getCoordiatesFromAddress = (address) => {
  const formattedAddress = address.replace(/ /g, "+");
  return client.get("json?address=" + formattedAddress + "&key=" + ApiKey);
};
export default {
  getCoordiatesFromAddress,
};
