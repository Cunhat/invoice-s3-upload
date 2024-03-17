import { Camera, CameraCapturedPicture } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { UploadPhoto } from "../../components/upload-photo";
import { router } from "expo-router";

export default function UploadFromPhoto() {
  const [photo, setPhoto] = React.useState<CameraCapturedPicture | undefined>(
    undefined
  );
  const [camera, setCamera] = useState<Camera | null>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const data = await camera?.takePictureAsync(options);
    setPhoto(data);
  };

  if (photo) {
    return (
      <UploadPhoto
        photo={photo}
        refresh={() => {
          setPhoto(undefined);
          setDisableButton(!disableButton);
        }}
        navigation={() => router.navigate("/")}
      />
    );
  }

  if (permission === null) {
    <Text className="text-white">Requesting permissions...</Text>;
  }

  if (!permission?.granted) {
    return (
      <>
        <Text className="text-white">Permission denied...</Text>
        <Text className="text-white text-center">
          In order to use the device camera you have to grant permission!
        </Text>
      </>
    );
  }

  return (
    <Camera className="flex-1 w-full" ref={(ref) => setCamera(ref)}>
      <View className="bg-black/60 h-[200px] z-10 justify-center items-center mt-auto">
        <CameraButton
          onPress={() => {
            setDisableButton(!disableButton);
            takePic();
          }}
          disabled={disableButton}
        />
      </View>
    </Camera>
  );
}

export interface ButtonProps extends PressableProps {}

const CameraButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <View className="border-white w-[20%] h-[40%] rounded-full p-[2px] border-4">
      <Pressable className="bg-white w-full h-full rounded-full" {...props} />
    </View>
  );
};
