import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '@/constants';
import Octicons from 'react-native-vector-icons/Octicons';
import useForm from '@/hooks/useForm';
import {TextInput} from 'react-native';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import {MarkerColor} from '@/types';
import useGetAddress from '@/hooks/useGetAddress';
import ScoreInput from '@/components/post/ScoreInput';
import DatePickerOptions from '@/components/post/DatePickerOptions';
import useModal from '@/hooks/useModal';
import ImageInput from '@/components/post/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import MarkerSelector from '@/components/post/MarkerSelector';
import PreviewImageList from '@/components/common/PreviewImageList';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import useDetailStore from '@/store/useDetailPostStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostForm({location, isEdit = false}: PostFormProps) {
  const navigation = useNavigation();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {detailPost} = useDetailStore();
  const isEditMode = isEdit && detailPost;
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false); // 날짜가 선택됐는지 알 수 있는 상태
  const dateOption = useModal();
  const imagePicker = useImagePicker({
    initialImage: isEditMode ? detailPost.images : [],
  });
  usePermission('PHOTO');

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }

    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: data => {
          console.log(data);
          navigation.goBack();
        },
        onError: error =>
          console.log('에러메세지', error.response?.data.message),
      },
    );
  };

  // 헤더부분 커스텀
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled // 편집 불가능 readonly
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked || isEdit
                ? getDateWithSeparator(date, '. ')
                : '날짜 선택'
            }
            onPress={dateOption.show}
          />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline // 여러 줄
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
              showOption
            />
          </View>
          <DatePickerOptions
            date={date}
            isVisible={dateOption.isVisible}
            onDateChange={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default PostForm;
