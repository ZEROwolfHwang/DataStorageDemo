/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
// export const CarSchema = {
//     name:'car',
//     properties:{
//         make:'string',
//         model:'string',
//         meal:{type:int,default:0},
//
//     }
// };
// export const PersonSchema = {
//     name: 'Person',
//     primaryKey: 'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
//     properties: {
//         id: 'int',
//         name: 'string',
//         tel_number: {type: 'string', default: '156xxxxxxxx'},   // 添加默认值的写法
//         city: 'string' // 直接赋值的方式设置类型
//     }
// };

// 新建表模型
class PersonSchema extends Realm.Object{}
PersonSchema.schema = {
    name: 'Person',
    // primaryKey: 'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
    properties: {
        id: 'int',
        name: 'string',
        tel_number: {type: 'string', default: '156xxxxxxxx'},   // 添加默认值的写法
        city: 'string' // 直接赋值的方式设置类型
    }
};
export default new Realm({schema: [PersonSchema]});
