function createDataViolin(name, values) {
    return {
      name,
      values,
    };
  }
  
  function getDataViolin() {
    let data = [];
    const numberOfFiles = 16;
    for (let i = 0; i < numberOfFiles; i++) {
      const item = require(`./../json_data/hMOF-${i}.json`);
      data.push(createDataViolin('pld', item.pld));
      data.push(createDataViolin('lcd', item.lcd));
    }
    return data;
  }
export default getDataViolin;