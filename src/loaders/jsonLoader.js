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

function getDataViolin() {
  let data = [];
  const numberOfFiles = 16; // Adjust based on your file count
  for (let i = 0; i < numberOfFiles; i++) {
    const item = require(`./../json_data/hMOF-${i}.json`);
    data.push(createDataViolin('pld', item.pld));
    data.push(createDataViolin('lcd', item.lcd));
  }
  return data;
}

function getData() {
  const data = [];
  const numberOfFiles = 16; // Adjust based on your file count
  for (let i = 0; i < numberOfFiles; i++) {
    const item = require(`./../json_data/hMOF-${i}.json`);
    data.push(
      createData(item.name, item.void_fraction, item.surface_area_m2cm3, item.surface_area_m2g, item.pld, item.lcd),
    );
  }
  return data;
}

export default getData;
