import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Appbar, Divider} from 'react-native-paper';
import {Text, View} from 'react-native-ui-lib';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, CustomButton} from '../../components';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserProfile = () => {
  return (
    <ScrollView>
      <Container>
        <ImageBackground
          source={{
            uri:
              'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
          }}
          style={styles.image}
        />
        <View style={styles.firstBlock}>
          <Text color={Colors.white} style={styles.title}>
            やや
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
          <View>
            <Text color={Colors.white}>
              可愛い衣装を着たい！時給がいいところで働きたいです！ビジュアルに自信があります！
            </Text>
          </View>
          <View centerH>
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
    backgroundColor: Colors.white,
  },
});
export default UserProfile;
