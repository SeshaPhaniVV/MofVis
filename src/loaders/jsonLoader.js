<<<<<<< Updated upstream
class jsonLoader {
  load(path) {
    const customData = require(path);
    return customData;
  }
}

export { jsonLoader };
=======

function createData(name, void_fraction, surface_area_m2cm3, surface_area_m2g, pld, lcd) {
    return {
        name,
        void_fraction,
        surface_area_m2cm3,
        surface_area_m2g,
        pld,
        lcd,
    };
}

function createDataViolin(name, values) {
    return {
      name,
      values,
    };
  }
    
function getDataViolin(){
    const customData0 = require('./../json_data/hMOF-0.json');
    const customData1 = require('./../json_data/hMOF-1.json');
    const customData2 = require('./../json_data/hMOF-2.json');
    const customData3 = require('./../json_data/hMOF-3.json');
    const customData4 = require('./../json_data/hMOF-4.json');
    const customData5 = require('./../json_data/hMOF-5.json');
    const customData6 = require('./../json_data/hMOF-6.json');
    const customData7 = require('./../json_data/hMOF-7.json');
    const customData8 = require('./../json_data/hMOF-8.json');
    const customData9 = require('./../json_data/hMOF-9.json');
    const customData10 = require('./../json_data/hMOF-10.json');
    const customData11 = require('./../json_data/hMOF-11.json');
    const customData12 = require('./../json_data/hMOF-12.json');
    const customData13 = require('./../json_data/hMOF-13.json');
    const customData14 = require('./../json_data/hMOF-15.json');
    const customData15 = require('./../json_data/hMOF-25.json');
    const customData = [
        customData0,
        customData1,
        customData2,
        customData3,
        customData4,
        customData5,
        customData6,
        customData7,
        customData8,
        customData9,
        customData10,
        customData11,
        customData12,
        customData13,
        customData14,
        customData15,
      ];

    let data = [];

    for (const item of customData) {
    let pld = item.pld;
    let lcd = item.lcd;
    
    data.push(createDataViolin('pld', pld));
    data.push(createDataViolin('lcd', lcd));
    }

    return data;
}
function getData() {
    const customData0 = require('./../json_data/hMOF-0.json');
    const customData1 = require('./../json_data/hMOF-1.json');
    const customData2 = require('./../json_data/hMOF-2.json');
    const customData3 = require('./../json_data/hMOF-3.json');
    const customData4 = require('./../json_data/hMOF-4.json');
    const customData5 = require('./../json_data/hMOF-5.json');
    const customData6 = require('./../json_data/hMOF-6.json');
    const customData7 = require('./../json_data/hMOF-7.json');
    const customData8 = require('./../json_data/hMOF-8.json');
    const customData9 = require('./../json_data/hMOF-9.json');
    const customData10 = require('./../json_data/hMOF-10.json');
    const customData11 = require('./../json_data/hMOF-11.json');
    const customData12 = require('./../json_data/hMOF-12.json');
    const customData13 = require('./../json_data/hMOF-13.json');
    const customData14 = require('./../json_data/hMOF-15.json');
    const customData15 = require('./../json_data/hMOF-25.json');
    const customData = [
        customData0,
        customData1,
        customData2,
        customData3,
        customData4,
        customData5,
        customData6,
        customData7,
        customData8,
        customData9,
        customData10,
        customData11,
        customData12,
        customData13,
        customData14,
        customData15,
      ];
      
      const data = [];
      
      for (const item of customData) {
        data.push(createData(
          item.name,
          item.void_fraction,
          item.surface_area_m2cm3,
          item.surface_area_m2g,
          item.pld,
          item.lcd,
        ));
      }      
    
    return data;
    }

export default getData;
>>>>>>> Stashed changes
