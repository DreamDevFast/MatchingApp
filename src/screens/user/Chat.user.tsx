import React from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import {List} from 'react-native-paper';
import {Text, View, Avatar} from 'react-native-ui-lib';
import CustomTabnav from '../../components/CustomTabnav';
import {Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

const UserChat = ({navigation, route}: any) => {
  return (
    <CustomTabnav navigation={navigation} route={route}>
      <ScrollView>
        <View marginT-50></View>
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
        <List.Item
          title="Pamela Ramirez"
          titleStyle={{color: Colors.white, top: -10}}
          description={() => {
            return (
              <View style={{top: -10}}>
                <Text style={{color: Colors.iconLabel}}>
                  diam accumsan ut. Ut imperdiet et leo in vulputate
                </Text>
                <Text style={{color: Colors.iconLabel, fontSize: 10}}>
                  5min ago
                </Text>
              </View>
            );
          }}
          left={() => {
            return (
              <View row>
                <Avatar
                  size={50}
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/happy-young-asian-male-feeling-happy-smiling-looking-front-while-relaxing-kitchen-home_7861-2875.jpg?t=st=1668417813~exp=1668418413~hmac=d2dc34cdd70a3f5db1e9d74ecd35e1115213b38a833cbd7d69b4fcc97fa13c05',
                  }}
                  label={'IMG'}
                />
              </View>
            );
          }}
          style={styles.list_item}
          onPress={() => {
            console.log('pressed');
          }}
        />
      </ScrollView>
    </CustomTabnav>
  );
};

const styles = StyleSheet.create({
  list_item: {
    width,
  },
});
export default UserChat;
