import React from "react";
import { Text, View } from "react-native";
import { Button } from "../components/ui/button";
import { Link } from "expo-router";

export default function Home() {
  // console.log(process.env.EXPO_PUBLIC_API_URL);

  return (
    <>
      <Text className="text-indigo-500 font-bold text-3xl pb-10">
        Invoice Upload
      </Text>
      <Text className="text-white">{process.env.EXPO_PUBLIC_API_URL}</Text>
      <Text className="text-white text-base text-center pb-8">
        Choose from where you want to upload your invoice
      </Text>
      <View className="w-full flex flex-col gap-4 justify-center items-center">
        <Link href="/UploadFromPhoto" asChild>
          <Button variant={"primary"} size={"full"} text="Take a photo" />
        </Link>

        <Button
          disabled
          variant={"secondary"}
          size={"full"}
          // onPress={() => navigation.navigate("UploadFromGallery")}
          text="Upload from gallery"
        />
      </View>
    </>
  );
}
