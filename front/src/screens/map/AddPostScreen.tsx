import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {colors, mapNavigations} from '@/constants';
import InputField from '@/components/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {TextInput} from 'react-native';
import {validateAddPost} from '@/utils';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
            // value={values.email}
            // onChangeText={text => handleChangeText('email', text)}
            // onBlur={() => handleBlur('email')}
          />
          {/* inputField에서 secureTextEntry -> input password 속성처럼 마스킹처리 */}
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline // 여러 줄
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
            // value={values.password}
            // onChangeText={text => handleChangeText('password', text)}
            // onBlur={() => handleBlur('password')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddPostScreen;

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
});
