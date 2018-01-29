/**
 * Created by yeshaojian on 2017/3/24.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class RNStorageVC extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:'请先添加数据哦哦哦',
            data1:'咿呀咿呀'
        };
      }

    // 增加
    createData() {
        // 使用key保存数据
        storage.save({
            key:'storageTest',    // 注意:请不要在key中使用_下划线符号!
            rawData: {
                name:'吉泽明步',
                city:'xx省xxx市'
            },

            // 设为null,则不过期,这里会覆盖初始化的时效
           expires: 1000 * 3600
        });

        // 更新data值
        this.setState({
            data: '保存成功!',
            data1:'哈哈'
        });
    }

    // 查询
    inquireData() {
        storage.load({
            key:'storageTest',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法

            // 更新data值
            this.setState({
                data: ret.name
            });

        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // 更新
                    this.setState({
                        data:'数据为空'
                    });

                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    // 更新
    upData() {
        // 重新存储即可
        storage.save({
            key:'storageTest',    // 注意:请不要在key中使用_下划线符号!
            rawData: {
                name:'苍井空',
                city:'xx省xxx市'
            },

            // 设为null,则不过期,这里会覆盖初始化的时效
            expires: 1000 * 3600
        });
        // 更新data值
        this.setState({
            data: '更新成功!'
        });
    }

    // 删除
    removeData() {
        // 删除单个数据
        storage.remove({
            key: 'storageTest'
        });

        // storage.remove({
        //     key: 'react-native-storage-test',
        //     name:'吉泽明步'
        // });

//         // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
//         storage.clearMap();
//
//         // 获取某个key下的所有id
//         storage.getIdsForKey('user').then(ids => {
//             console.log(ids);
//         });
//
//         // 获取某个key下的所有数据
//         storage.getAllDataForKey('user').then(users => {
//             console.log(users);
//         });
//
//         // !! 清除某个key下的所有数据
//         storage.clearMapForKey('user');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.showDataViewStyle}>
                    <Text>{this.state.data}</Text>
                </View>
                <View >
                    <Text>{this.state.data1}</Text>
                </View>

                <View style={styles.processingViewStyle}>
                    <TouchableOpacity
                        onPress={() => this.createData()}
                    >
                        <Text>增加数据</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.inquireData()}
                    >
                        <Text>查询数据</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.upData()}
                    >
                        <Text>更新数据</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.removeData()}
                    >
                        <Text>删除数据</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

    showDataViewStyle: {
        height:height * 0.6,
        width:width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    processingViewStyle: {

    }
});