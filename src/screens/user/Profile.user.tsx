import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {Appbar, Divider} from 'react-native-paper';
import {Image, Text, View} from 'react-native-ui-lib';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {setTempUser, setLoading} from '../../redux/features/globalSlice';

import {Container, CustomButton} from '../../components';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserProfile = () => {
  const tempUser = useAppSelector((state: any) => state.global.tempUser);

  return (
    <ScrollView>
      <Container>
        <ImageBackground
          source={{
            uri: tempUser.avatar,
          }}
          style={styles.image}
        />
        <View style={styles.firstBlock}>
          <Text color={Colors.white} style={styles.title}>
            {tempUser.name}
          </Text>
          <View row marginB-10>
            <SimpleLineIcons
              name="location-pin"
              size={20}
              color={Colors.iconLabel}
            />
            <Text style={styles.label}>池袋</Text>
          </View>
          <View row marginB-10>
            <MaterialCommunityIcons
              name="piggy-bank-outline"
              size={20}
              color={Colors.iconLabel}
            />
            <Text style={styles.label}>1,500円〜</Text>
          </View>
          <Divider style={styles.divider} />
          <Text color={Colors.white}>
            可愛い衣装を着たい！時給がいいところで働きたいです！ビジュアルに自信があります！
          </Text>
          <Divider style={styles.divider} />
          <ScrollView horizontal={true}>
            <View row>
              <View paddingH-5 style={styles.thumb}>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
                <View marginB-10></View>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
              </View>
              <View paddingH-5 style={styles.thumb}>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
                <View marginB-10></View>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
              </View>
              <View paddingH-5 style={styles.thumb}>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
                <View marginB-10></View>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
              </View>
              <View paddingH-5 style={styles.thumb}>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
                <View marginB-10></View>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  style={styles.thumb_image}
                />
              </View>
            </View>
          </ScrollView>
          <Divider style={styles.divider} />
          <View centerH paddingV-50>
            <CustomButton label="戻る" />
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  image: {
    height: width * 1.2,
    width: '100%',
  },
  firstBlock: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    height: 50,
    fontSize: 30,
  },
  label: {
    color: Colors.iconLabel,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.iconLabel,
    marginVertical: 10,
  },
  thumb: {
    width: width * 0.3,
  },
  thumb_image: {
    height: width * 0.3,
  },
});
export default UserProfile;
