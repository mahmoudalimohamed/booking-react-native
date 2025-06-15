import { Account, Avatars, Client } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6841e3e200044299d683");
//.setPlatform("bus.booking.appwrite");

export const account = new Account(client);
export const avatars = new Avatars(client);
