// 操作db文件的API, 不关心业务
const fs = require("fs");
const dbPath = "./demo.json"; // 获取案例数据
exports.find = function (callback) {
  // 读取数据
  // 第一种方法：data.toString()
  // 第二种方法：添加第二个参数为utf8
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      callback(err);
      return;
    }   
    callback(null, JSON.parse(data).demoList);
  });
};

/**
 * 添加案例
 * @param {*} demo
 * @param {*} callback
 */
exports.save = function (demo, callback) {
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    // 读取db数据，转成对象
    // 往对象里面添加新的数据
    // 再把对象转化成字符串，存入db
    const demoList = JSON.parse(data).demoList;
    if (demoList.length < 1) {
      demo.id = 1;
    } else {
      demo.id = parseInt(demoList[demoList.length - 1].id) + 1;
    }
    demoList.push(demo);
    const fileData = JSON.stringify({
      demoList,
    });
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

/**
 * 修改案例
 * @param {*} demo
 * @param {*} callback
 */
exports.update = function (demo, callback) {
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    // 读取db数据，转成对象
    // 往对象里面添加新的数据
    // 再把对象转化成字符串，存入db
    let demoList = JSON.parse(data).demoList;
    const updatedemoList = demoList.map((item) => {
      if (parseInt(item.id) === parseInt(demo.id)) {
        return demo;
      }
      return item;
    });
    const fileData = JSON.stringify({ demoList: updatedemoList });
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

/**
 * 删除案例
 * @param {*} id
 * @param {*} callback
 */
exports.delete = function (id, callback) {
  fs.readFile(dbPath, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    }
    let demoList = JSON.parse(data).demoList;
    demoList = demoList.filter((demo) => parseInt(demo.id) !== parseInt(id));
    const fileData = JSON.stringify({ demoList });
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
