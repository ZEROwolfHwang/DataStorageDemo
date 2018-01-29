/**
 * Created by yeshaojian on 2017/3/24.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Realm from 'realm';
// import {PersonSchema} from './reallm';
import realm from './reallm';

const {height, width} = Dimensions.get('window');

// 新建表模型
// const PersonSchema = {
//     name: 'Person',
//     primaryKey: 'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
//     properties: {
//         id: 'int',
//         name: 'string',
//         tel_number: {type: 'string', default: '156xxxxxxxx'},   // 添加默认值的写法
//         city: 'string' // 直接赋值的方式设置类型
//     }
// };
//
//  let realm = new Realm({schema: [PersonSchema]});
// import realm from 'lite';
export default class RealmVC extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: '请先添加数据',
        };

       /* Realm.open({schema: [CarSchema, PersonSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Honda',
                        model: 'Civic',
                        miles: 1000,
                    });
                    myCar.miles += 20; // Update a property value
                });

                // Query Realm for all cars with a high mileage
                const cars = realm.objects('Car').filtered('miles > 1000');

                // Will return a Results object with our 1 car
                // cars.length // => 1

                // Add another car
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Ford',
                        model: 'Focus',
                        miles: 2000,
                    });
                });

                // Query results are updated in realtime
                // cars.length // => 2
            });*/
    }

    // 增加
    createData() {
       /* Realm.open({schema: [PersonSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                realm.write(() => {
                    realm.create('Person', {id: 0, name: '吉泽明步', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 1, name: '苍井空', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 2, name: '小泽玛利亚', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 3, name: '皮皮虾我们走', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 4, name: '波多野结衣', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                })
            });*/
        realm.write(() => {
                    realm.create('Person', {id: 0, name: '吉泽明步', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 1, name: '苍井空', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 2, name: '小泽玛利亚', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 3, name: '皮皮虾我们走', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});
                    realm.create('Person', {id: 4, name: '波多野结衣', tel_number: '137xxxxxxxx', city: 'xx省xx市xxxxxx'});

        })
    }

    // 查询
    inquireData() {
        let allData;

        // 获取Person对象
        let Persons = realm.objects('Person');

        // 遍历表中所有数据
        for (let i = 0; i < Persons.length; i++) {
            let tempData = '第' + i + '个' + Persons[i].name + '---'+ Persons[i].tel_number + Persons[i].city + '\n';
            allData += tempData
        }

        this.setState({
            data: allData
        })
    }

    // 根据条件查询
    filteredData() {
        let allData;

        // 获取Person对象
        let Persons = realm.objects('Person');
        // 设置筛选条件
        let person = Persons.filtered('id == 2');

        if (person) {
            // 遍历表中所有数据
            for (let i = 0; i < person.length; i++) {
                let tempData = '第' + (person[i].id + 1) + '个数据:' + person[i].name + person[i].tel_number + person[i].city + '\n';
                allData += tempData
            }
        }

        this.setState({
            data: '筛选到的数据:' + allData
        })
    }

    // 更新
    upData() {
        realm.write(() => {
            // 方式一
            //realm.create('Person', {id: 0, name: '皮皮虾,我们走', tel_number: '156xxxxxxxx', city: 'xx省xx市xxxxxx'}, true);

            // 方式二:如果表中没有主键,那么可以通过直接赋值更新对象
            // 获取Person对象
            let Persons = realm.objects('Person');
            // 设置筛选条件
            let person = Persons.filtered('id == 1');
            // 更新数据
            person.name = '黄鳝门'

        })
    }

    // 删除
    removeData() {
        realm.write(() => {
            // 获取Person对象
            let Persons = realm.objects('Person');
            // 删除
            realm.delete(Persons);
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
                        onPress={() => this.filteredData()}
                    >
                        <Text>根据条件查询数据</Text>
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
        backgroundColor: 'yellow',
    },

    showDataViewStyle: {
        height: height * 0.6,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    processingViewStyle: {}
});