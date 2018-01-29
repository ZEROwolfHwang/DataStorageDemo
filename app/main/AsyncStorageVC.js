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
    AsyncStorage,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class AsyncStorageVC extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:'请先添加数据',
        };
    }

    // 增加
    createData() {
        AsyncStorage.setItem('name', JSON.stringify('吉泽明步'), (error, result) => {
            if (!error) {
                this.setState({
                    data:'保存成功!'
                })
            }
        });
    }

    // 查询
    inquireData() {
        AsyncStorage.getItem('name')
            .then((value) => {
                let jsonValue = JSON.parse((value));

                this.setState({
                    data:jsonValue
                })
            })
    }

    // 更新
    upData() {
        AsyncStorage.setItem('name', JSON.stringify('苍井空'), (error, result) => {
            if (!error) {
                this.setState({
                    data:'更新成功!'
                })
            }
        });
    }

    // 删除
    removeData() {
        AsyncStorage.removeItem('name');

        this.setState({
            data:'删除完成!'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.showDataViewStyle}>
                    <Text>{this.state.data}</Text>
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
        backgroundColor: 'green',
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