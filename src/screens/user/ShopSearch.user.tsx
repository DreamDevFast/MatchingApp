import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {View} from 'react-native-ui-lib';
import CustomTabnav from '../../components/CustomTabnav';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserShopSearch = ({navigation, route}: any) => {
  return (
    <CustomTabnav navigation={navigation} route={route}>
      <View>
        <ImageBackground
          source={{
            uri:
              'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
          }}
          style={styles.image}
        />
      </View>
    </CustomTabnav>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.back,
    height: height * 0.12,
    width,
  },
  image: {
    width: width,
    height: height * 0.88,
  },
});
export default UserShopSearch;
