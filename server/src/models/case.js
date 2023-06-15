// 案例展示的案例
import fs from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../../public/db/case.json"); // 获取数据路径

export default {
  /**
   * 全部
   * @param {*} callback 
   */
  all: (callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      const list = JSON.parse(data).list;
      callback(null, list);
    });
  },
  /**
   * 列表
   * @param {*} callback
   */
  find: (id, callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      const list = JSON.parse(data).list;
      const caseList = list.filter(
        (item) => parseInt(item.type_id) === parseInt(id)
      );
      callback(null, caseList);
    });
  },

  /**
   * 详情
   * @param {*} id
   * @param {*} callback
   */
  detail: (id, callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      const obj = JSON.parse(data).list.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      callback(null, obj);
    });
  },

  /**
   * 添加
   * @param {*} obj
   * @param {*} callback
   */
  save: (obj, callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        return callback(err);
      }
      // 读取db数据，转成对象
      // 往对象里面添加新的数据
      // 再把对象转化成字符串，存入db
      const list = JSON.parse(data).list;
      if (list.length < 1) {
        obj.id = 1;
      } else {
        obj.id = parseInt(list[list.length - 1].id) + 1;
      }
      obj.type_id = parseInt(obj.type_id);
      list.push(obj);
      const fileData = JSON.stringify({
        list,
      }, null, '\t');
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, obj);
      });
    });
  },

  /**
   * 修改
   * @param {*} obj
   * @param {*} callback
   */
  update: (obj, callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        callback(err);
        return;
      }
      let list = JSON.parse(data).list;
      const updatelist = list.map((item) => {
        if (parseInt(obj.id) === parseInt(item.id)) {
          obj.id = parseInt(obj.id);
          obj.type_id = parseInt(obj.type_id);
          return obj;
        }
        return item;
      });
      const fileData = JSON.stringify({ list: updatelist }, null, '\t');
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, obj);
      });
    });
  },

  /**
   * 删除
   * @param {*} id
   * @param {*} callback
   */
  delete: (id, callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        return callback(err);
      }
      let list = JSON.parse(data).list;
      // 查无数据时
      if (list.findIndex((item) => parseInt(item.id) === parseInt(id)) === -1) {
        return callback(null, null);
      }
      list = list.filter((item) => parseInt(item.id) !== parseInt(id));
      const fileData = JSON.stringify({ list }, null, '\t');
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id });
      });
    });
  },
};
