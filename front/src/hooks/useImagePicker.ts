import {getFormDataImages} from '@/utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import {useState} from 'react';
import {ImageUri} from '@/types';
import {Alert} from 'react-native';

interface UseImagePickerProps {
  initialImage: ImageUri[];
}

function useImagePicker({initialImage = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImage);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개 입니다.');
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperCancelText: '완료',
      cropperCancelColor: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);

        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 에러 메세지 표시
        }
      });
  };

  return {
    imageUris,
    handleChange,
  };
}

export default useImagePicker;
