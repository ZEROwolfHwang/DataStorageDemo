import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
// 引用第三方框架
import TabNavigator from 'react-native-tab-navigator';

// 引用外部文件
import AsyncStorageVC from './AsyncStorageVC';
import RNStorageVC from './RNStorageVC';
import RealmVC from './RealmVC';
import Storage from '../storage/Storage';

export default class Main extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab:'asyncStorage'
        };
      }

    // 返回TabBar的Item
    renderTabBarItem(title, selectedTab, component) {
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                onPress={() => this.setState({ selectedTab: selectedTab })}>

                <Navigator
                    initialRoute={{
                        name:selectedTab,
                        component:component
                    }}

                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }}
                />
            </TabNavigator.Item>
        );
    }

    render() {
        return (
            <TabNavigator>
                {/* asyncStorage */}
                {this.renderTabBarItem("asyncStorage", 'asyncStorage', AsyncStorageVC)}
                {/* react-native-storage */}
                {this.renderTabBarItem("rnStorage", 'react-native-storage', RNStorageVC)}
                {/* realm */}
                {this.renderTabBarItem("realm", 'realm', RealmVC)}
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabbarIconStyle: {
        width:Platform.OS === 'ios' ? 30 : 25,
        height:Platform.OS === 'ios' ? 30 : 25,
    }
});
