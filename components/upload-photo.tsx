import AWS from "aws-sdk";
import dayjs from "dayjs";
import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { Home, RefreshCcw, UploadCloud } from "lucide-react-native";
import { default as React } from "react";
import { Image, Pressable, SafeAreaView, View } from "react-native";

AWS.config.update({
  accessKeyId: process.env.EXPO_S3_ACCESS_KEY,
  secretAccessKey: process.env.EXPO_S3_SECRET_KEY,
  region: "eu-west-1",
});

const s3 = new AWS.S3();

type UploadPhotoProps = {
  photo: CameraCapturedPicture;
  refresh: () => void;
  navigation: any;
};

export const UploadPhoto: React.FC<UploadPhotoProps> = ({
  photo,
  refresh,
  navigation,
}) => {
  ///// upload image ////

  const uploadPhotoToS3 = async () => {
    const imagePath = photo?.uri;

    const resp = await fetch(imagePath); //
    const imageBody = await resp.blob();

    const params = {
      Bucket: "invoice-upload-automation",
      Key: `invoice-${dayjs().format("YYYY-MM-DDTHH:mm:ss").replaceAll("-", "").replaceAll(":", "")}.jpg`,
      Body: imageBody,
    };

    s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
      console.log(err, data);
    });
  };

  const savePhoto = async () => {
    uploadPhotoToS3();
    MediaLibrary.saveToLibraryAsync(photo.uri);
  };

  const uploadPhoto = () => {
    savePhoto();
    navigation();
  };

  return (
    <SafeAreaView className="flex-1 bg-black relative w-full">
      <Image
        source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        className="items-stretch flex-1"
      />
      <View className="bg-black/60 h-[200px] z-10 justify-center items-center  mt-auto absolute w-full bottom-0 flex flex-row">
        <Pressable
          key={"goHomeButton"}
          className="bg-white/20 w-[15%] h-[30%] rounded-full flex justify-center items-center"
          onPress={() => router.navigate("/")}
        >
          <Home className="text-white" width={"90%"} height={"50%"} />
        </Pressable>
        <Pressable
          key={"uploadPhoto"}
          className="bg-white w-[20%] h-[40%] rounded-full flex justify-center items-center mx-10"
          onPress={() => uploadPhoto()}
        >
          <UploadCloud className="text-black" width={"90%"} height={"50%"} />
        </Pressable>
        <Pressable
          key={photo.uri}
          className="bg-white/20 w-[15%] h-[30%] rounded-full flex justify-center items-center"
          onPress={refresh}
        >
          <RefreshCcw className="text-white" width={"90%"} height={"50%"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
